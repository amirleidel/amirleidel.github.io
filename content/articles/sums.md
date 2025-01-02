Title: Finite Difference Calculus
Date: 2025-01-02 12:00
Category: Math
Authors: Amir J. G. Leidel
Summary: Using the Calculus of Finite Differences as an elegant solution of Faulhaber sums.

# Sums of Integers

![A flat pyramid made of squares](../images/pyramid-white.svg 'A flat pyramid made of squares')

If we ask how many squares are needed, to build a staircase or flat pyramid of width $n$, we just have to sum up successive integers, lets call this function $S_1$.

It is well known that there is a shortcut to calculating the sum of the first $n$ integers, that is
$$
	S_1(n) = \sum^n_{k = 1} k = \frac{1}{2} n (n+1).
$$
So, instead of adding together up to $n$ numbers, which makes an ever increasing $n-1$ calculation steps. You can calculate the expression on the right hand side, which has a constant number of just a few steps. 

Visually, we can quickly justify this formula, by describing each square as having $1$ unit of area. Therefore,  by dividing the pyramid into a large triangle of area $\frac{1}{2} n^2$ units and $n$ smaller triangles, each with area of $\frac{1}{2}$ unit, we can count the area of the whole pyramid.

![A flat pyramid made of squares](../images/pyramid-decomposed-white.svg 'A flat pyramid made of squares')

And so the final area is the sum of these components
$$
	\frac{1}{2} n^2 + \frac{1}{2} n = \frac{1}{2} n (n + 1),
$$
which corresponds to the amount of squares that we want to count, since every square had an area of $1$ unit.

Of course, this thing was just a flat pyramid, so what about a pyramid that has depth as well? In this case we will have to sum up squares.

![A 3D pyramid made of squares](../images/pyramid-3d-white.svg 'A 3D pyramid made of squares')

And therefore this sum formula is defined by
$$
	S_2(n) = \sum^n_{k = 1} k^2.
$$
Well now, how can we get a shortcut equation of this expression? One way could be to look at it geometrically again, this is possible, but it will be very time consuming and after all, not generalizable to higher powers since we will run out of dimensions.

So, lets pose this problem very generally. Faulhabers sum formula asks for the solution of the sum of $p$-th powers of the first $n$ integers, which is written as 
$$
	S_p(n) = \sum^n_{k = 1} k^p.
$$

# Using the Calculus of Finite Differences as an elegant solution of Faulhaber sums.

Let the difference operator of a function $f: x \mapsto f(x)$ be given as
$$
	\Delta f = f(x) - f(x-1),
$$
this is also called the backwards difference, it evaluates the function at $x$ and one step backwards at $x-1$. It turns out, that this operator has very similar properties to the derivative, but in contrast to the derivative it is not defined by a limit, so the difference is always finite. Just as the derivative, it is also linear, which means for two functions $f$ and $g$ we have
$$
	\Delta (f + g) = \Delta f + \Delta g.
$$
Applying the finite difference operator $\Delta$ onto some polynomials gives
$$
	\Delta 1 = 1 - 1 = 0 \\
	\Delta x = x - (x - 1) = 1.
$$
Both of these are actually the same as the derivative of the polynomial, but starting at $x^2$ the finite difference will start to differ from the derivate
$$
	\Delta x^2 = x^2 - (x - 1)^2 = x^2 - x^2 + 2 x - 1 = 2x - 1 \\
	\Delta x^3 = x^3 - (x - 1)^3 = 3x^2 - 3x + 1 \\
	...
$$
This is because the product rule of finite differences is not the Leibniz product rule but has an extra term, that is
$$
	\Delta (f g) = \Delta f g + f \Delta g - \Delta f \Delta g.
$$
With these parallels to differentiation, we can now ask for the inverse of the difference operator.
This turns out to be the sum operator $\Delta^{-1}$ and its defining relation will be 
$$
	\Delta^{-1} \Delta = 1 = \Delta \Delta^{-1}.
$$ 
It is also written as $\Sigma$ and called the finite integral, but for now I will stick to $\Delta^{-1}$.

The naming makes sense, since in case that we have a relation $\Delta^{-1} f = F(x)$, we can find the value of $F$ at integer $x$ by taking 
$$
	F(x) = \sum_{k = 1}^{x} f(k),
$$
because
$$
	\Delta F = F(x) - F(x-1) = \sum_{k = 1}^{x} f(k) - \sum_{k = 1}^{x-1} f(k) = f(x).
$$
Finally, lets use this knowledge of the sum operator for finding the sum of squares function $S_2(n)$. 

We have that
$$
	S_2(n) = \Delta^{-1} n^2, 
$$
because 
$$
	\Delta S_2(n) = S_2(n) - S_2(n-1) = n^2.
$$

So, we only have to calculate the expression $\Delta^{-1} n^2$. For this, lets look at the difference equation $\Delta x^3 = 3x^2 - 3x + 1$. Taking the sum operator of both sides gives
$$
	x^3 = \Delta^{-1} (3x^2 - 3x + 1) = 3 \boxed{ \Delta^{-1} x^2 } - 3 \boxed{ \Delta^{-1} x} + \boxed{ \Delta^{-1} 1 }.
$$
This means, if we want to find $\Delta^{-1} x^2$ we need to know only $\Delta^{-1} x$ and $\Delta^{-1} 1$. These, we can find by looking at the expressions for $\Delta x^2$ and $\Delta x$. They give
$$
	x^2 = 2 \boxed{ \Delta^{-1} x } - \boxed{ \Delta^{-1} 1 }
$$
and
$$
	x = \boxed{ \Delta^{-1} 1 }.
$$
Now, plugging back into the respective equations above we find
$$
	\Delta^{-1} x = \frac{1}{2} x (x+1),
$$
which is just the same as $S_1(x)$, as suspected, and
$$
	\Delta^{-1} x^2 = \frac{1}{3} \left( x^3 + 3 \Delta^{-1} x - \Delta^{-1} 1 \right) = \frac{1}{3} x^3 + \frac{1}{2} x^2 + \frac{1}{6} x.
$$

Therefore, we have found the solution to 
$$
	S_2(n) = \sum^n_{k = 1} k^2 = \frac{1}{3} n^3 + \frac{1}{2} n^2 + \frac{1}{6} n,
$$
by just inverting the difference relations up to $\Delta x^{3}$. 

# A general method.

_Essentially what we did before was solving a linear system of equations and it turns out, that using matrices, we can also write it down as a general method for calculating $S_p(n)$._

Now lets look at how we can use this for finding $\Delta^{-1} x^p$ for some arbitrary integer power $p$ with an example of $p = 4$. Using the binomial theorem and matrix notation we can calculate the difference equation 
$$
\Delta 
\begin{bmatrix}
	x \\
	x^2 \\
	x^3 \\
	x^4 \\
	x^5
\end{bmatrix} = 
\begin{bmatrix}
1 &  &   &   & \\
-1 & 2 &  &   & \\
1 & -3 & 3 &  & \\
-1 & 4 & -6 & 4 &   \\
1 & -5 & 10 & -10 & 5 
\end{bmatrix}
\begin{bmatrix}
	1 \\
	x \\
	x^2 \\
	x^3 \\
	x^4
\end{bmatrix} .
$$
We then invert this equation by multiplying by the inverse matrix and assuming that $\Delta$ just commutes with it, since the matrix does not contain a factor of $x$. So this yields the expression
$$
\Delta^{-1}
\begin{bmatrix}
	1 \\
	x \\
	x^2 \\
	x^3 \\
	x^4
\end{bmatrix}
=
\begin{bmatrix}
1 &  &   &   & \\
\frac{1}{2} & \frac{1}{2} &  &   & \\
\frac{1}{6} & \frac{1}{2} & \frac{1}{3} &  & \\
0 & \frac{1}{4} & \frac{1}{2} & \frac{1}{4} &   \\
-\frac{1}{30} & 0 & \frac{1}{3} & \frac{1}{2} & \frac{1}{5} 
\end{bmatrix}
\begin{bmatrix}
	x \\
	x^2 \\
	x^3 \\
	x^4 \\
	x^5
\end{bmatrix},
$$
which gives us the equations for $S_p(x)$ up to $p=4$. So, we have thus calculated the sum of third powers
$$
	S_3(n) = \sum_{k=1}^{n} k^3 = \frac{1}{4} n^4 + \frac{1}{2} n^3 + \frac{1}{4} n^2
$$
and the sum of fourth powers that we wanted to obtain
$$
	S_4(n) = \sum_{k=1}^{n} k^5 = \frac{1}{5} n^5 + \frac{1}{2} n^4 + \frac{1}{3} n^3 - \frac{1}{30} n.
$$

# Concluding remarks.

_Now that we have looked at sums of powers, it seems like easy questions sometimes pose difficult problems and in the end, some clever insight has to be found such as the difference operator $\Delta$ that makes the answer equally as easy. The coefficients of the Faulhaber sums can also be calculated directly using Bernoulli numbers and we just saw that these are kind of the inverses of the Binomial coefficients._

_Using positive powers $p$ this problem is a very nice challenge to solve, but if you want a real challenge, then you should probably study the negative powers $S_{-p}(\infty)$. This function continues to plage mathematics up to this day under its more common name $\zeta(x)$._
