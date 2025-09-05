Title: Higher Order Approximation of the Oscillation Period of a Pendulum
Date: 2025-09-05 22:00
Category: Math
Summary: Or how to calculate the oscillation period of a pendulum more accurately using the complete elliptic integral of the first kind.

# Net Energy in the System

Looking at a solic/physical pendulum, its kinetic energy term $E_K$ is given by
$$
    E_K(\omega) = \frac{1}{2} I \omega^2,
$$
where $I$ is the moment of inertia and $\omega = \dot{\phi} = \frac{d\phi}{dt}$, which is the angular speed of its swing. 
The potential energy $E_P$ can be calculated using the height $h$ of its center of mass as 
$$
    E_P(\phi) = M h(\phi) g.
$$
With its total mass $M$ and the surface gravity $g$. For a pendulum in motion this height $h$ is given by its angle $\phi$ using
$$
    h(\phi) = - \cos{\phi} R_{CM},
$$
and $R_{CM}$ is the distance of the center of mass from the pendulum axis, for a solid pendulum, this is not equal to the length of the pendulum. 

Now during the swing, the total energy $E$ is equal to
$$
    E = E_K(\dot{\phi}) + E_P(\phi).
$$

Assuming no friction from the rotation axis or surrounding air, this total energy $E$ stays constant during the whole swing. Therefore we have that its equal to the energy at the turning points, which are those angles $\phi_{max}$ where the pendulum reverses its motion and stands still for a brief moment. This means we also have that
$$
    E = E_K(0) + E_P(\phi_{max}) = - M R_{CM} g \cos{\phi_{max}}.    
$$ 

# Calculating the time Period $T$

Equating the net energies at two different points in time, we get
$$
    \dot{\phi}^2 = \frac{2 M R_{CM} g}{I} \left( \cos{\phi} - \cos{\phi_{max}} \right).
$$
This first order nonlinear differential equation essentially governs the movement of the whole system. In order to solve it for the oscillation period $T$, we want to be able to integrate it. For that, we need to substitute the trigonometric half angle identity
$$
    1 - \cos{\phi} = 2 \sin^2{\frac{\phi}{2}}.
$$
Which turns the differential equation into 
$$
    \dot{\phi}^2 = \frac{2 M R_{CM} g}{I} \sqrt{2 \left( \sin^2{\frac{\phi_{max}}{2}} - \sin^2{\frac{\phi}{2}} \right) }.
$$
Defining the constant $k = \sin{\frac{\phi_{max}}{2}}$. Using separation of variables, this turns into the integral equation 
$$
    \int_{-\phi_{max}}^{\phi_{max}} \frac{d \phi}{k \sqrt{1- \frac{1}{k^2} \sin^2 \frac{\phi}{2}}} = \int_{0}^{T/2} \sqrt{\frac{M R_{CM} g}{I}} dt.
$$
The bounds are taken from one maximum angle to the next, which is exactly half an oscillation period $\frac{T}{2}$. The problem is now, left hand integral needs cleaning up inside the square root, wherefore we need to substitute a new angular variable $\alpha$. 

Define 
$$
    k \sin{\alpha} = \sin \frac{\phi}{2},
$$
which we can differentiate with respect to $\alpha$, turning it into 
$$
    k \cos{\alpha} = \frac{1}{2} \underbrace{\cos \frac{\phi}{2}}_{\sqrt{1 - k^2 \sin{\alpha}^2}} \frac{d\phi}{d\alpha}.
$$
Taking the substitution $d \alpha \frac{d\phi}{d\alpha} = d\phi$ inside the integral, we obtain
$$
    \int_{-\pi/2}^{\pi/2} \frac{2 k \cos \alpha d \alpha}{2 k \underbrace{\sqrt{1 - \sin^2 \alpha}}_{\cos \alpha} \sqrt{1 - k^2 \sin^2 \alpha} } \\
    = 2 \int_{0}^{\pi/2} \frac{d \alpha}{\sqrt{1 - k^2 \sin^2 \alpha}}.
$$
With the integral bounds being able to be altered because of the symmetry of the integrand. This integral is not solvable using algebraic functions. In fact, it has its own name as the elliptic integral of the first kind $F(\pi/2,k)$, or, specifically because of the bounds being a quarter circulation, its the complete elliptic integral of the first kind $K(k)$. Therefore this gives us
$$
    2 K(k) = \sqrt{\frac{M R_{CM} g}{I}} \frac{T}{2}.
$$
Which we wanted to solve for the oscillation period $T$, giving us the exact solution
$$
    T = 4 K(k) \sqrt{\frac{I}{M R_{CM} g}}.
$$
In order to calculate this expression, we can use the Taylor expansion or the complete elliptic integral of the first kind, which is 
$$
    K(k) = \frac{\pi}{2} \left( 1 + \frac{1}{4} k^2 + \frac{9}{64} k^4 + \frac{25}{256} k^6 + ... \right).
$$
The prefactors can be calculated using the double factorial function $n!!$, which is the even/odd factorial ($2\cdot 4\cdot 6\cdot 8 ...$ or $1\cdot 3\cdot 5\cdot 7 ...$). The factors are given by $\left( \dfrac{(2n - 1)!!}{(2n)!!} \right)^2$.

For checking the result, we test it for the simplest case. This is the case of the pendulum consisting of only a weight of mass $m$ at distance $\ell$, the moment of inertia is given by $I = m \ell^2$ and $R_{CM} = \ell$. So the first order approximation for small $\phi_{max} \approx 0$ yields us
$$
    T \approx 2 \pi \sqrt{\frac{m \ell^2}{m \ell g}} = 2\pi \sqrt{\frac{ \ell}{ g}}.
$$
This formula is the standard result for the time period of a pendulum. So, a pendulum of length $\ell = 1\mathrm{m}$ (also called second pendulum) has an oscillation period of approximately $T_0 \approx 2.0065 \mathrm{s}$.

But using the higher order terms for calculating $T$, we can improve this by adding our correction terms, which are given by
$$
T = 2 \pi \sqrt{\frac{I}{M R_{CM} g}} \left( 1 + \frac{1}{4} \sin^2{\frac{\phi_{max}}{2}} + \frac{9}{64} \sin^4{\frac{\phi_{max}}{2}} + \frac{25}{256} \sin^6{\frac{\phi_{max}}{2}} ...\right) .
$$

For the simple pendulum with a swing of $15^\circ$ the first three correction terms correct the period to $T_{corr} = 2.0150 \mathrm{s}$. This amounts to a correction of more than $+0.4\%$, by which the pendulum is actually slower. This does not sound like much, but $0.4\%$ of a day is around $6\mathrm{min}$, which a clock using the standard equation would lose every day. Of course, these correction terms have been ignoring air resistance and friction between parts, it would be interest to consider the error introduced by these factors in the future as well.