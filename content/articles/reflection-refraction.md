Title: Vector form of Reflection and Refraction
Date: 2025-08-07 22:00
Category: Graphics
Authors: Amir J. G. Leidel 
Summary: Deriving the vector form of Reflection and Refraction, which is important for implementing them for ray-tracing.
Cover: ../images/reflection.svg, ../images/refraction.svg

# Reflection

We know from the law of reflection that the incident angle is equal to the reflected angle. We also have to keep in mind to flip the final ray such that it points away from the surface.

Define the surface normal vector $n$, which satisfies $n^2 = 1$, the incident light ray $a$ and the exiting ray $b$.

<img src="../images/reflection.svg" alt="vector diagram of the reflective case" style="width: 60%;">

From the diagram we then have that
$$
    d = -n(n \cdot a) \\
    c = a + d \\
    b = 2c - a
$$
Therefore
$$
    b = 2(a - n (n \cdot a)) - a
$$
which simplifies to
$$
    b = a - 2n (n \cdot a).
$$
This is the most commonly used expression for the reflected vector. But using properties of the geometric product, _we can further simplify this to one expression_ by seeing that its equal to
$$
    n^2 a - 2n (n \cdot a),
$$
which enables pulling out the factor of $n$ and splitting the geometric product $na = n \cdot a + n \wedge a$:
$$
    b = n (n a - 2 n \cdot a) = n ( n \wedge a - n \cdot a).
$$
The first term anti-commutes with $n$ since $n$ is parallel to the subspace spanned by $n \wedge a$, but the second term commutes because it is a scalar. Therefore,
$$
    b = ( - n \wedge a - n \cdot a) n.
$$
The reflected vector is thus simply
$$
    \boxed{b = - n a n}
$$

# Refraction

In the refractive setting we need to apply Snells law, which states that the relation between the incident angle $\alpha$ and the angle inside the medium $\beta$ is given using the refractive indices of the outside $n_0$ and inside media $n_1$ respectively.
$$
    n_0 \sin \alpha = n_1 \sin \beta
$$

We want that the length of the ray vector $a$ does not change inside the new medium, therefore
$$
    |a| = |b|.
$$

<img src="../images/refraction.svg" alt="vector diagram inside and outside the medium of the refraction case" style="width: 60%;">

Introducing the new vectors inside the medium $c'$ and $d'$, we can derive them via the relationship between the angles $\alpha$ and $\beta$. We notice that inside the diagram we have that
$$
    |c| = |a| \sin \alpha \\
    |c'| = |b| \sin \beta = |a| \sin \beta.
$$
By demanding that $c$ and $c'$ are collinear we can thus say
$$
    c' = c \frac{|c'|}{|c|} = c \frac{\sin \beta}{\sin \alpha}.
$$
The same goes for $d$ and $d'$, using the cosine
$$
    |d| = |a| \cos \alpha \\
    |d'| = |b| \cos \beta = |a| \cos \beta.
$$
and thus
$$
    d' = d \frac{|d'|}{|d|} = d \frac{\cos \beta}{\cos \alpha}.
$$
The refracted ray vector is then just given by
$$
    b = c' - d'
$$
which is
$$
    c \frac{\sin \beta}{\sin \alpha} - d \frac{\cos \beta}{\cos \alpha}.
$$
Plugging in $c$ and $d$ from the reflection part, we get 
$$
    a \frac{\sin \beta}{\sin \alpha} - n (n \cdot a )\left(\frac{\sin \beta}{\sin \alpha} - \frac{\cos \beta}{\cos \alpha} \right).
$$
Because we want to deal with vectors alone we can start eliminating all angles by using
$$
    \frac{n_0}{n_1} = \frac{\sin \beta}{\sin \alpha}
$$
and
$$
    |a| \cos \alpha = - n \cdot a.
$$
Which gives
$$
    \frac{n_0}{n_1} a - n \left(\frac{n_0}{n_1}(n \cdot a) + |a| \cos \beta \right).
$$
Lastly, we can resolve $\cos \beta$ by using
$$
    \cos^2 \beta = 1 - \sin^2 \beta = 1 - \frac{n_0^2}{n_1^2} \sin^2 \alpha = 1 - \frac{n_0^2}{n_1^2} \left( 1 - \cos ^2 \alpha \right).
$$
Plugging in and substituting for $\cos \alpha = - \frac{n \cdot a}{|a|}$ again, we get that
$$
    b = \frac{n_0}{n_1} a - n \left(\frac{n_0}{n_1}(n \cdot a) + |a| \sqrt{1 - \frac{n_0^2}{n_1^2} \left( 1 - \frac{(n \cdot a)^2}{|a|^2} \right)} \right)
$$
which we can slightly alter to give the vector form of the refracted vector $b$ that is also given [here](https://en.wikipedia.org/wiki/Snell%27s_law#Vector_form)
$$
    b = \frac{n_0}{n_1} a - n \left(\frac{n_0}{n_1}(n \cdot a) + \sqrt{a^2 - \frac{n_0^2}{n_1^2} \left( a^2 - (n \cdot a)^2 \right)} \right).
$$
Simplifying this further using the geometric product, we again have that
$$
    a - n ( n \cdot a) = n ( n \wedge a)
$$
and also 
$$
    a^2 = naan = (n \cdot a + n \wedge a)(n \cdot a - n \wedge a) = (n \cdot a)^2 - (n \wedge a)^2.
$$
Plugging these in, we get the final form of
$$
    \boxed{b = \frac{n_0}{n_1} n ( n \wedge a) - n \sqrt{a^2 + \frac{n_0^2}{n_1^2} (n \wedge a)^2} }.
$$
Looking at this expression, we can substitute for $a^2$ again, which gets us
$$
    b =  \frac{n_0}{n_1} n ( n \wedge a) - n \sqrt{(n \cdot a)^2 + (n \wedge a)^2 \left(\frac{n_0^2}{n_1^2} -1 \right) }.
$$
This form is actually a little bit longer than the one before it, but it has a nice property, it shows how the factor $\frac{n_0^2}{n_1^2}$ prevents this whole equation to be simplified. 

Because, in the case that $n_1 \to n_0$, so the refractive indexes of both media are equal, we have that this factor is $\frac{n_0^2}{n_1^2} \to 1$. Therefore 
$$
    b =  n ( n \wedge a) - n |n \cdot a|,
$$
and in the last term we have that $- |n \cdot a| = n \cdot a$, because the incident vector $a$ points in the direction into the surface, so the dot product is negative. Which means now, we can get rid of the absolute value to yield
$$
    b =  n ( n \wedge a) + n (n \cdot a) = nn a = a.
$$
And as would be expected, if the refractive indexes of both media are equal, the light rays will not get bent, which is a nice sanity check for such a long formula.
