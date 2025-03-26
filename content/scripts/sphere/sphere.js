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
    const vertexData = await load_vector_json("../scripts/sphere/vertices.json");
    const indexData  = await load_vector_json("../scripts/sphere/indices.json");

    const vertices = new Float32Array(vertexData.vertices);
    const indices = new Uint16Array(indexData.indices);
    

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    const vertexShaderSource = `
        attribute vec3 position;
        uniform float angle;
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
            gl_Position = vec4(az_rotation * rotation * position, 1.0);
        }
    `;

    const fragmentShaderSource = `
        void main() {
            gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
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

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error("Shader program link error:", gl.getProgramInfoLog(shaderProgram));
    }

    gl.useProgram(shaderProgram);

    const positionLocation = gl.getAttribLocation(shaderProgram, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

    const angleLocation = gl.getUniformLocation(shaderProgram, "angle");

    function render(time) {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.uniform1f(angleLocation, time * 0.0002);
        gl.drawElements(gl.LINES, indices.length, gl.UNSIGNED_SHORT, 0);
        requestAnimationFrame(render);
    }

    gl.clearColor(0, 0, 0, 1);
    gl.enable(gl.DEPTH_TEST);
    render(0);
}

main();