Title: Vector form of Reflection and Refraction
Date: 2025-08-07 22:00
Category: Graphics
Authors: Amir J. G. Leidel 
Summary: Deriving the vector form of Reflection and Refraction, which is important for implementing them for ray-tracing.
Status: hidden

# Reflection

We know from the law of reflection that the incident angle is equal to the reflected angle. We also have to keep in mind to flip the final ray such that it points away from the surface.

Define the surface normal vector $n$, which satisfies $n^2 = 1$, the incident light ray $a$ and the exiting ray $b$.

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

In the refractive setting we need to apply Snells law, which states

I am **testing** the format options.

---

*This* should be italic

> blockquote

test test

```
i am a code block
```

