Title: Snowflakes
Date: 2024-12-26 23:52
Category: Python
Tags: cellular automaton, convolution
Authors: Amir J. G. Leidel
Summary: Some computer-generated snowflakes

# Some computer-generated snowflakes for Christmas.

![Snowflake](./images/snowflake4_4_2_1_1_1_4_0_0.jpg '4,4,2,1,1,1,4,0,0')

I was experimenting with an idea regarding procedural generation of maps and cityscapes. And one way of going about this is by using cellular automata. So, for example, you can create whole maze-like structures, which you can see at [https://conwaylife.com/wiki/OCA:Maze](https://conwaylife.com/wiki/OCA:Maze). 

One consequence of being able to create very intricate patterns from simple rules, which is what cellular automata are about, is that you can make them follow basic geometric symmetries. It turns out that using hexagonal symmetry and discrete convoluton is all that you need to create beautiful snowflake like structures.

## Convolution kernel

Cellular automata decide on the next state of a pixel $O$ based around the states of the pixels in their neighborhood. Generally, two types of neighborhood are mostly used, these are the Von Neumann neighborhood
$$
\begin{bmatrix}
0 & 1 & 0 \\
1 & O & 1 \\
0 & 1 & 0 \\
\end{bmatrix}
$$
and the Moore neighborhood
$$
\begin{bmatrix}
1 & 1 & 1 \\
1 & O & 1 \\
1 & 1 & 1 \\
\end{bmatrix}.
$$
Both of these have the symmetries of a square.

For generating hexagonal structures the matrix kernel has to be hexagonally symmetric as well. In a standard rectangular coordinate system we can induce this symmetry from the following neighborhood around a pixel $O$
$$
\begin{bmatrix}
1 & 1 & 0 \\
1 & O & 1 \\
0 & 1 & 1 \\
\end{bmatrix}.
$$
Based on this I used the following convolution kernel
$$ 
\begin{bmatrix}
a & e & h & e & a & 0 & 0 & 0 & 0 \\
e & b & f & f & b & e & 0 & 0 & 0 \\
h & f & c & g & c & f & h & 0 & 0 \\
e & f & g & d & d & g & f & e & 0 \\
a & b & c & d & O & d & c & b & a \\
0 & e & f & g & d & d & g & f & e \\
0 & 0 & h & f & c & g & c & f & h \\
0 & 0 & 0 & e & b & f & f & b & e \\
0 & 0 & 0 & 0 & a & e & h & e & a \\
\end{bmatrix}
$$
where $O,a,b,c,d,e,f,g,h$ are integers modulo 5. Iterating this operation on a field made of only a single pixel thats one in the center yields beautiful patterns that grow outward. On the upper left you can see an up-scaled representation of the kernel that I used. Also, hovering over the images should yield you the specific values of $O,a,b,c,d,e,f,g,h$.

![Snowflake](./images/snowflake0_4_4_4_2_1_0_1_0.jpg '0,4,4,4,2,1,0,1,0')
![Snowflake](./images/snowflake1_3_4_4_0_1_1_1_0.jpg '1,3,4,4,0,1,1,1,0')
![Snowflake](./images/snowflake2_0_4_4_4_0_1_1_1.jpg '2,0,4,4,4,0,1,1,1')
![Snowflake](./images/snowflake3_4_4_1_4_0_0_0_1.jpg '3,4,4,1,4,0,0,0,1')
![Snowflake](./images/snowflake4_1_0_0_4_1_1_0_1.jpg '4,1,0,0,4,1,1,0,1')
![Snowflake](./images/snowflake4_2_2_3_1_1_1_1_1.jpg '4,2,2,3,1,1,1,1,1')
![Snowflake](./images/snowflake4_4_1_1_2_1_1_1_1.jpg '4,4,1,1,2,1,1,1,1')

Every one of these needed just $i = 31$ iterations, it seems like $i$ has to be near a multiple of 5 (since I used this modulus) in order for the images to have interesting structure. At multiples of 5 they collapse in on themselves and only a field of disconnected pixels remains and at more than one iteration away from a multiple the ice crystals look rather noisy and chaotic.

In the end, the images had to be transformed such that they have hexagonal geometry, for this, a skew transformation 
$$
A = \begin{bmatrix}
1 & \frac{1}{2} \\
0 & \frac{\sqrt{3}}{2} \\
\end{bmatrix}
$$
has to be applied to the image, which yielded the result. In the upscaled kernel you can see that how this made the pixels rhombic, but at the large scale the pixels are hexagonally arranged.
