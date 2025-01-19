Title: Sieve of Eratosthenes
Date: 2025-01-17 20:00
Category: Math
Authors: Amir
Summary: How to generate lists of primes by using a sieve.

# How to generate lists of primes by using a sieve.

# The straightforward way: Trial division

Primes are whole numbers larger than $1$ that are only divisible by $1$ and themselves. So, the most straight forward way to check if a number is primes is trial division. 

This means, given a number $n$, you check if it is divisible by any whole number $k$ thats in the interval $2 \leq k \leq \sqrt{n}$. The square root term $\sqrt{n}$ is the upper bound. This is because in case $n$ would have a divisor $l > \sqrt{n}$, we have that
$$
    n/l < \sqrt{n}^2/\sqrt{n} = \sqrt{n}
$$
and so there exists a divisor $k = n/l < \sqrt{n}$ which is already covered by searching the interval $2 \leq k \leq \sqrt{n}$.

Unfortunately, even though we only have to do around $\mathcal{O}(\sqrt{n})$ operations, this algorithm is inefficient. Especially if we want to generate a list of primes that are less than a number $n$, since in this case we would have to perform _$\mathcal{O}(n^{1.5})$_ operations.

# The efficient way: The Sieve of Eratosthenes

This algorithm is ingenious, because it is directly suited to generate lists of primes very fast, by making use of a list of numbers that is loaded in memory. The point being, that we _do not perform trial division_ on any one of these numbers, but directly cross out every $p$-th entry in the list. This is basically like operating on the indices of an array.

To see how this works, lets try to apply the algorithm to find all primes that are below $n = 32$. So, we start by generating a list of numbers from $2$ to $n -1 = 31$. 
```
|  2 |  3 |  4 |  5 |  6 |
|  7 |  8 |  9 | 10 | 11 |
| 12 | 13 | 14 | 15 | 16 |
| 17 | 18 | 19 | 20 | 21 |
| 22 | 23 | 24 | 25 | 26 |
| 27 | 28 | 29 | 30 | 31 |
```
In my example Ive rendered this list as a 5x6 table, but this is just to keep everything tidy visually, you could just as well do this on a 1x30 list.

The algorithm now consists of doing the following:

> * Read the smallest entry $p$ of the list thats not crossed out.
> * If $p \geq \sqrt{n}$, we are finished.
> * Else, _cross out every multiple of $p$_ of the form $k\cdot p$ with $k>1$.

Therefore we start with $p=2 \leq \sqrt{32} = 5.66..$ and cross out every multiple of $2$:
```
|  2 |  3 | -- |  5 | -- |
|  7 | -- |  9 | -- | 11 |
| -- | 13 | -- | 15 | -- |
| 17 | -- | 19 | -- | 21 |
| -- | 23 | -- | 25 | -- |
| 27 | -- | 29 | -- | 31 |
```
Next, we read $p = 3$ and cross out the multiples of $3$:
```
|  2 |  3 | -- |  5 | -- |
|  7 | -- | -- | -- | 11 |
| -- | 13 | -- | -- | -- |
| 17 | -- | 19 | -- | -- |
| -- | 23 | -- | 25 | -- |
| -- | -- | 29 | -- | 31 |
```
And lastly, the same for $p=5$:
```
|  2 |  3 | -- |  5 | -- |
|  7 | -- | -- | -- | 11 |
| -- | 13 | -- | -- | -- |
| 17 | -- | 19 | -- | -- |
| -- | 23 | -- | -- | -- |
| -- | -- | 29 | -- | 31 |
```
We dont have to consider multiples of $p=7$, since $7>\sqrt{31}=5.66..$ and so this is a complete list of primes numbers. 

This method can be implemented in a program without using any trial division, because _the multiples $k\cdot p$ of a prime $p$ are at equally spaced intervals_, therefore we know exactly beforehand what entries to cross out. 

A simple, very pythonic implementation of this is given below. I was able to generate primes up to $n = 10^8$ in around $25\, \mathrm{s}$.

    #!python
    
    from math import isqrt
    
    def prime_sieve(n):
        '''
        Implementing the Sieve of Eratosthenes:
        calculate all primes below n,
        with n > 2
        '''
        sieve = list(range(2,n))
        
        i = 0
        p = sieve[i]
        
        while p <= isqrt(n):
            if p:
                # set all multiples of a prime to 0
                sieve[i+p::p] = [0]*((n-1)//p - 1)
            i += 1
            p = sieve[i]
            
        # list every nonzero entry in the sieve
        primes = [p for p in sieve if p]
        return primes

Looking at how many operations this needs, we need to count how many elements this program crosses out. Note, how some elements are even crossed out multiple times, like for example $15$, because it is both a multiple of $3$ and $5$. For the number of operations we sum up:
$$
    \frac{n}{2} + \frac{n}{3} + \frac{n}{5}.. \\
    = n \left( \frac{1}{2} + \frac{1}{3} + \frac{1}{5}.. \right) \\
    = n \sum_{p \; \text{prime} \\ \leq \sqrt{n}} \frac{1}{p}
$$
This is because, we iterate over all multiples of $2$ that are less than $n$, after which we go through all multiples of the other prime numbers, until we reach $\sqrt{n}$. 

The [sum of the reciprocals of the primes grows like $\log\log(n)$](https://en.wikipedia.org/wiki/Divergence_of_the_sum_of_the_reciprocals_of_the_primes). In fact, the difference between the sum and $\log\log(n)$ has a limit, which is the Meissel-Mertens constant
$$
    M = \lim_{n\to \infty} \left[ \sum_{p \;\text{prime} \\ \leq n} \frac{1}{p} - \log \log (n) \right] = 0.2614..
$$
As a consequence, the Sieve of Eratosthenes needs just around $n \log \log(\sqrt{n}) = n \log \frac{\log(n)}{2} = n \log \log (n) - n \log 2$ operations for generating all primes up to $n$. This means a growth rate of _$\mathcal{O}(n \log \log (n))$_.

Since the iterated logarithm grows extremely slowly, this algorithm is for most purposes almost linear. Unfortunately, in this implementation it makes up for this by using $\mathcal{O}(n)$ amounts of memory. There are methods however to effectively limit the memory growth with a page segmented sieve.
