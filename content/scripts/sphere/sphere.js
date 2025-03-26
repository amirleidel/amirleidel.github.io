const canvas = document.getElementById("glcanvas");
const gl = canvas.getContext("webgl");

if (!gl) {
    alert("WebGL not supported!");
}

async function load_vector_json(url) {
    const response = await fetch(url);
    return response.json();
}
async function main() {
    // Load first wireframe (magenta)
    const vertexData = await load_vector_json("../scripts/sphere/vertices.json");
    const indexData  = await load_vector_json("../scripts/sphere/indices.json");

    const vertices = new Float32Array(vertexData.vertices);
    const indices = new Uint16Array(indexData.indices);
    
    // Load second wireframe (coastline - green)
    const coastlineVertexData = await load_vector_json("../scripts/sphere/coastline_vertices.json");
    const coastlineIndexData = await load_vector_json("../scripts/sphere/coastline_indices.json");

    const coastlineVertices = new Float32Array(coastlineVertexData.vertices);
    const coastlineIndices = new Uint16Array(coastlineIndexData.indices);
    
    // Create buffers for first wireframe
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    
    // Create buffers for second wireframe
    const coastlineVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, coastlineVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, coastlineVertices, gl.STATIC_DRAW);

    const coastlineIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, coastlineIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, coastlineIndices, gl.STATIC_DRAW);
    
    // common Vertex Shader Source with visibility param
    const vertexShaderSource = `
        precision mediump float; // Ensure proper float precision
        
        attribute vec3 position;
        uniform float angle;
        varying float visibility; // Pass to fragment shader
        
        void main() {
            // first apply azimuth tilting
            float az_angle = 0.35;
            float azc = cos(az_angle);
            float azs = sin(az_angle);
            mat3 az_rotation = mat3(
                1, 0, 0,
                0, azc,-azs,
                0, azs, azc
            );
            // rotate along y axis (vertical)
            float c = cos(angle);
            float s = sin(angle);
            mat3 rotation = mat3(
                c, 0, s,
                0, 1, 0,
               -s, 0, c
            );
            
            // Compute final position
            vec3 transformedPosition = az_rotation * rotation * position;
            gl_Position = vec4(transformedPosition, 1.0);
            
            // Compute visibility: Assume view direction is (0,0,1) in camera space
            vec3 viewDir = normalize(vec3(0.0, 0.0, -1.0));
            visibility = dot(normalize(transformedPosition), viewDir);
            
        }
    `;

    // Fragment Shader for wireframe (magenta)
    const fragmentShaderMagentaSource = `
        precision mediump float; // Ensure proper float precision
    
        varying float visibility; // Received from vertex shader

        void main() {
            vec3 color = vec3(1.0, 0.0, 1.0); // Magenta
            
            // Reduce intensity if on the back side
            float intensity = 0.5 + 0.5 * max(visibility, 0.0); // Dim occluded edges
            gl_FragColor = vec4(color * intensity, 1.0);
        }
    `;
    
    // Fragment Shader for coastline (green)
    const fragmentShaderGreenSource = `
        precision mediump float; // Ensure proper float precision
    
        varying float visibility; // Received from vertex shader

        void main() {
            vec3 color = vec3(0.0, 1.0, 0.0); // Green
            
            // Reduce intensity if on the back side
            float intensity = 0.5 + 0.5 * max(visibility, 0.0); // Dim occluded edges
            gl_FragColor = vec4(color * intensity, 1.0);
        }
    `;

    function compileShader(source, type) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("Shader compile error:", gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
    
    function createShaderProgram(vertexSource, fragmentSource) {
        const vertexShader = compileShader(vertexSource, gl.VERTEX_SHADER);
        const fragmentShader = compileShader(fragmentSource, gl.FRAGMENT_SHADER);

        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            console.error("Shader program link error:", gl.getProgramInfoLog(shaderProgram));
        }

        return shaderProgram;
    }
    
    // Create shader programs
    const magentaProgram = createShaderProgram(vertexShaderSource, fragmentShaderMagentaSource);
    const greenProgram = createShaderProgram(vertexShaderSource, fragmentShaderGreenSource);

    // Get locations for magenta wireframe
    const positionLocationMagenta = gl.getAttribLocation(magentaProgram, "position");
    const angleLocationMagenta = gl.getUniformLocation(magentaProgram, "angle");

    // Get locations for green wireframe
    const positionLocationGreen = gl.getAttribLocation(greenProgram, "position");
    const angleLocationGreen = gl.getUniformLocation(greenProgram, "angle");
    
    function render(time) {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        const angle = time * 0.0002 - 2.0; 
        
        // Render first wireframe (magenta)
        gl.useProgram(magentaProgram);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.vertexAttribPointer(positionLocationMagenta, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionLocationMagenta);
        gl.uniform1f(angleLocationMagenta, angle);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.drawElements(gl.LINES, indices.length, gl.UNSIGNED_SHORT, 0);
        
        // Render second wireframe (green)
        gl.useProgram(greenProgram);
        gl.bindBuffer(gl.ARRAY_BUFFER, coastlineVertexBuffer);
        gl.vertexAttribPointer(positionLocationGreen, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionLocationGreen);
        gl.uniform1f(angleLocationGreen, angle);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, coastlineIndexBuffer);
        gl.drawElements(gl.LINES, coastlineIndices.length, gl.UNSIGNED_SHORT, 0);
        
        requestAnimationFrame(render);
        }

    gl.clearColor(0, 0, 0, 1);
    gl.enable(gl.DEPTH_TEST);
    render(0);
}

main();