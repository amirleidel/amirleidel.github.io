Title: Multidimensional Autodifferentiation 
Date: 2025-05-24 15:30
Category: Math
Summary: How to use autodiff on vector valued functions using a Clifford algebra.
Author: Amir

# Regular autodiff

Automatic differentiation, or in short autodiff, is a nice trick to differentiate functions thats neither completely numeric nor algebraic. What it does, is, it comes down to implementing arithmetic using dual numbers instead of real numbers. 

Dual numbers are similar to complex numbers, in that they have two components, a real component as well as an "imaginary" component. But instead of being based around the imaginary unit, that squares to negative one $i^2=-1$ as complex numbers are, the dual numbers have a nilpotent unit $\varepsilon^2 = 0$. 

Addition of two dual numbers is just component wise
$$
	(a + a' \varepsilon) + (b + b' \varepsilon) = (a+b) + (a'+b') \varepsilon.
$$
And multiplication of dual numbers results in  
$$	
	(a + a' \varepsilon) (b + b' \varepsilon) = ab + (ab' + a'b) \varepsilon.
$$

Ive already written the imaginary component with a prime, because now we can see one very interesting thing: The imaginary part of the product is exactly the same as the Leibnitz rule for taking the derivative. So, lets say, $a$ and $b$ would not just be real valued components but also functions in $x$, then
$$
	(a b)' = ab' + a'b
$$
where the prime is now the derivative with respect to $x$.

Therefore 
$$
	(a + a' \varepsilon) (b + b' \varepsilon) = ab + (ab)' \varepsilon
$$
and of course the same also holds for the sum, because the derivative is linear.

The point is now, that if we know $a$ and $b$ and their derivatives $a'$ and $b'$, we can take various calculations using sums and products and calculate some result, which will be contained in the real part, but the imaginary part will have calculated the derivative on the way, without any extra algebra, hence autodiff.

## Example 

Lets say we are given the function 
$$
f(x,y) = 5x^2 + 2xy + y^2.
$$
The task is to calculate the value $f(1,1)$ and the value of the derivate $\frac{\partial f}{\partial x} \Bigr|_{(x,y)=(1,1)}$. We therefore start with the known derivatives of our two variables $x,y$. Using the prime for the $x$ derivate these are simply $x'=1$ and $y'=0$. And so their dual number forms $X,Y$ are
$$
	X = 1 + \varepsilon \\
	Y = 1.
$$
Remember, the real parts represent the point $(1,1)$, where we will evaluate the functions $f$ and $f'$ and the imaginary components are their derivatives, with respect to $x$ in this example.

Taking $f(X,Y)$, we get the following calculation
$$
	f(1+\varepsilon,1) = 5 (1+\varepsilon)^2 + 2 (1+\varepsilon) + 1 \\
	= 5 (1+ 2 \varepsilon) + 2(1+\varepsilon) + 1 \\
	= 8 + 12 \varepsilon.
$$
Our results are therefore $f(1,1) = 8$ and $\frac{\partial f}{\partial x} \Bigr|_{(x,y)=(1,1)} = 12$.

Just to check the last result, differentiation by hand wouldve given us that
$$
	f'(x,y) = 10 x + 2y
$$
and we see that $f'(1,1) = 10 + 2 = 12$, which we just calculated before, but without even thinking about taking the derivative by hand! 

Of course this method would have worked on any large calculation just as well. And because many analytic functions like the exponential, sine, cosine &c. are evaluated by computers using Taylor expansions internally, which are also just composed of additions and multiplications, we can use autodiff to calculate their derivatives just as well!

# What to do with multidimensional functions

Well the approach before is pretty standard, but only works with scalar functions and we are also only calculating the derivative with respect to one variable at once. Applying this algorithm to multidimensional functions with derivatives with respect to multiple variables, would necessitate us repeating autodiff for every component of a function and every variable.

_Wouldnt it be nice to algebraically handle vector valued functions with vector inputs?_

To do this, the following method can be used. In a three dimensional context for example, we take the Clifford algebra $\mathrm{Cl}(6,0,1)$, so every spatial dimension with unit vector $e_i$ is supplemented with an extra dimension $e_\bar{i}$. Lastly we also add one nilpotent symbol $e_0^2 = 0$.

The derivative operator is introduced as
$$
\bar{D} = e_\bar{i} \frac{\partial}{\partial x_{i}}.
$$

If we are given a three dimensional vector valued function $\mathbf{f}(\mathbf{x})$, which we can write out completely as
$$
	\mathbf{f}(\mathbf{x}) = f^1(x_1,x_2,x_3) e_1 + f^2(x_1,x_2,x_3) e_2 + f^3(x_1,x_2,x_3) e_3,
$$
we define its multidimensional dual form as
$$
	F = \mathbf{f} + e_0 \bar{D} \mathbf{f}.
$$

In the simple example of the identity function $\mathbf{f}(\mathbf{x})= \mathbf{x}$, this is the dual form of $\mathbf{x}$, which we can denote as $X$, which is given by
$$
	X = \mathbf{x} + e_0 \wedge \left( e_\bar{1} \wedge e_1 + e_\bar{2} \wedge e_2 + e_\bar{3} \wedge e_3 \right). \\
	= \mathbf{x} + e_{0\bar{i}i} 
$$

In order to check the sum and product rules of this method, lets say we have the two functions $\mathbf{f}$ and $\mathbf{g}$. The sum rule is pretty trivial since the geometric product distributes over addition, but the product rule is not. So, we take the geometric product between the dual forms of the functions $F$ and $G$,
$$
	F G = (\mathbf{f} + e_0 \bar{D} \mathbf{f}) (\mathbf{g} + e_0 \bar{D} \mathbf{g}) \\
	= \mathbf{fg} + e_0 \dot{\bar{D}} \dot{\mathbf{f}} \mathbf{g} + \mathbf{f} e_0 \dot{\bar{D}} \dot{\mathbf{g}} 
$$
In the last expression $e_0 \bar{D} = e_{0\bar{i}}\partial^i$ commutes with the spatial function $\mathbf{f} = f^i e_i$. Therefore we have
$$
	FG = \mathbf{fg} + e_0 \dot{\bar{D}}\dot{\mathbf{f}} \mathbf{g} +  e_0 \dot{\bar{D}} \mathbf{f} \dot{\mathbf{g}} \\
	= \mathbf{fg} + e_0 \bar{D}(\mathbf{fg})
$$
with the little detail in the first line that the derivate $\bar{D}$ was pushed to the left side, which was simplified using the product rule.

And so, just as in the scalar case, we have that the product of our dual forms $F,G$ contains the product of their original functions $\mathbf{f},\mathbf{g}$ and the derivate of their product.

