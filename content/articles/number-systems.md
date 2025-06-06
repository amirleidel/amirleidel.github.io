Title: A Plethora of Number Systems
Date: 2024-05-14 12:01
Category: Math
Authors: Amir
Summary: What exactly are other number systems than decimal?

_Let us imagine we are trying to tackle the task of building a calculating machine, how would we go about that? Before we can come to that, we need to understand how numbers are encoded._

In digital computing, this is done by using two discrete values, which are called binary states. This is the simplest setup we can have, in contrast to decimal numbers, where every digit is made up of one of ten possible numerals. Decimal numbers work by encoding their numerical value by the position of their digits. As an example, the number $23'401$ means (I have boxed every digit, so the expressions are easier to read hopefully)
$$
	23'401 = \boxed{2} \cdot 10^4 + \boxed{3} \cdot 10^3 + \boxed{4} \cdot 10^2 + \boxed{0} \cdot 10^1 + \boxed{1} \cdot 10^0.
$$
And exponentiating ten by a number $n$ is the same as counting zeros: $10^0 = 1$, $10^1 = 1$, $10^2 = 2$ ..., so these are the units of one, ten, hundred ...

In contrast, the Chinese number system is not positional, so $23'401$ is written using dedicated symbols for the ones, tens, and hundreds (note how unfamiliar they look, but give them a try!)
$$
	23'401 = \text{二万三千四百一} = \boxed{\text{二}} \cdot \text{万} + \boxed{\text{三}} \cdot \text{千} + \boxed{\text{四}} \cdot \text{百} + \boxed{\text{一}}
$$
On the one hand, this means we need to invent new symbols for every new power of ten, but when denoting large numbers, for example one hundred million and one $100'000'001$, we can save space by writing 一億一 or 億一. If you are also curious, here is a table of Chinese numeral symbols.

| Name   |  Value    |Symbol| Name   |  Value    |Symbol| Name           |  Value  |Symbol|
|--------|:-------:  |:----:|--------|:-------:  |:----:|--------        |:-------:|:----:|
| zero   |    $0$    |   〇 | five   |    $5$    |   五 | ten            |  $10^1$ |   十 |
| one    |    $1$    |   一 | six    |    $6$    |   六 | hundred        |  $10^2$ |   百 |
| two    |    $2$    |   二 | seven  |    $7$    |   七 | thousand       |  $10^3$ |   千 |
| three  |    $3$    |   三 | eight  |    $8$    |   八 | ten thousand   |  $10^4$ |   万 |
| four   |    $4$    |   四 | nine   |    $9$    |   九 | hundred million|  $10^8$ |   億 |

You might have noticed a strange jump in the powers of ten, from ten thousand to a hundred million all of a sudden, so why is there no symbol for one million for example? The reason for that is another difference in our number system. Ours groups numbers by units of thousands, so after _one_ thousand $10^3$, we have _ten_ thousand $10^1 \cdot 10^3 = 10^4$, and _hundred_ thousand $10^2 \cdot 10^3 = 10^5$, before we continue with _one_ million $10^6$ &c, instead of using something like _thousand_ thousand $10^3 \cdot 10^3$. 

The Chinese number system does this grouping too, but by units of ten thousand, so one million is 百万 $10^2 \cdot 10^4 = 10^6$, meaning that it needs a new symbol for $10^8 = 10^4 \cdot 10^4$. Ancient Greek did use this system too, so if you want to use a name for the number ten thousand that does not refer to our customary grouping by thousands, just use the Greek-derived expression _myriad_. 

The point that unites both these systems, the Western and Chinese, is that both are ultimately based on the number ten, so we have $10$ numerals for zero to nine, after those we count _ten plus_ zero to _ten plus_ nine &c. But apart from the fact that we have ten fingers, there is no particular reason we should use ten as the base of this numbering system. 

Let us therefore introduce two new digits $\mathcal{X}$ and $\mathcal{E}$ with the numerical values of ten and eleven, so the base for this number system is twelve, also called _duodecimal_. Counting up from zero to $24$ would then look like (I will mark duodecimal numbers with the index $12$)

| Decimal notation  |  Duodecimal notation  |
|:-------:|:-------:|
| $0$ | $0_{12}$ |
| $1$ | $1_{12}$ |
| $2$ | $2_{12}$ |
| ... | ... |
| $9$ | $9_{12}$ |
| $10$ | $\mathcal{X}_{12}$ |
| $11$ | $\mathcal{E}_{12}$ |
| $12$ | $10_{12}$ |
| $13$ | $11_{12}$ |
| $14$ | $12_{12}$ |
| ... | ... |
| $19$ | $17_{12}$ |
| $20$ | $18_{12}$ |
| $21$ | $19_{12}$ |
| $22$ | $1\mathcal{X}_{12}$ |
| $23$ | $1\mathcal{E}_{12}$ |
| $24$ | $20_{12}$ |

So in this system, writing something like $8\mathcal{X}'401_{12}$ is the same as 
$$
	8\mathcal{X}401_{12} = \boxed{8} \cdot 12^4 + \boxed{10} \cdot 12^3 + \boxed{4} \cdot 12^2 + \boxed{0} \cdot 12^1 + \boxed{1} \cdot 12^0 = 183'745.
$$
Because the duodecimal base is larger than ten, this also means we can encode numbers more concisely, as $8\mathcal{X}401_{12}$ uses 5

 digits, but in decimal we would need 6 digits to write it as $183'745$; of course, this was made possible with the expense of defining the two extra digits $\mathcal{X}$ and $\mathcal{E}$. 

Let us go back to the beginning, we can use this idea the other way around and use as few digits or states as possible: just two. 

This is how the binary number system operates, we have two digits $0$ and $1$, so the base is $2$. This means that already after the number $1$, which acts like $9$ (the largest digit in decimal), we need to start incrementing the next digit by $+1$. So the number two is represented as $10_2$. In fact, every base $b$ number system is base $10_b$ if you think about it!

Counting up to $16$ in binary and its two cousins, octal (base $8 = 2^3$) and hexadecimal (base $16 = 2^4$), we would write:

| Decimal notation  |  Binary notation  |  Octal notation  |  Hexadecimal notation  |
|:-------:|:-------:|:-------:|:-------:|
| $0$ | $0_{2}$ | $0_{8}$ | $0_{16}$ |
| $1$ | $1_{2}$ | $1_{8}$ | $1_{16}$ |
| $2$ | $10_{2}$ | $2_{8}$ | $2_{16}$ |
| $3$ | $11_{2}$ | $3_{8}$ | $3_{16}$ |
| $4$ | $100_{2}$ | $4_{8}$ | $4_{16}$ |
| $5$ | $101_{2}$ | $5_{8}$ | $5_{16}$ |
| $6$ | $110_{2}$ | $6_{8}$ | $6_{16}$ |
| $7$ | $111_{2}$ | $7_{8}$ | $7_{16}$ |
| $8$ | $1000_{2}$ | $10_{8}$ | $8_{16}$ |
| $9$ | $1001_{2}$ | $11_{8}$ | $9_{16}$ |
| $10$| $1010_{2}$ | $12_{8}$ | $A_{16}$ |
| $11$| $1011_{2}$ | $13_{8}$ | $B_{16}$ |
| $12$| $1100_{2}$ | $14_{8}$ | $C_{16}$ |
| $13$| $1101_{2}$ | $15_{8}$ | $D_{16}$ |
| $14$| $1110_{2}$ | $16_{8}$ | $E_{16}$ |
| $15$| $1111_{2}$ | $17_{8}$ | $F_{16}$ |
| $16$|$10000_{2}$| $20_{8}$ | $10_{16}$|

The astute among you might have noticed the direct correspondence of octal and hexadecimal numbers to their binary representations. This fact is related to the grouping by thousands or myriads we have discussed before. Essentially, octal groups three binary digits or _bits_ and hexadecimal does this with every four bits. We can see how this works by looking at a large binary number, for example, the $12$-bit number 
$$
	100111110001_2 = 2^{11} + 2^8 + 2^7 + 2^6 + 2^5 + 2^4 + 2^0.
$$
The digits of $0$ and $1$ indicate whether we should include the power of two their position is describing, so I have omitted their factors.

Now, for clarity, we might regroup this binary number in two different ways, every three or every four bits, both these ways are
$$
	100'111'110'001_2 = 1001'1111'0001_2.
$$
But this approach we might also use algebraically and regroup every three powers of two in the expression
$$
	100'111'110'001_2 = \boxed{2^2} \cdot 2^9 + \boxed{2^2 + 2^1 + 2^0} \cdot 2^6 + \boxed{2^2 + 2^1} \cdot 2^3 + \boxed{2^0} \cdot 2^0
$$
and because $2^3 = 8$ we replace powers of two by powers of eight, the terms inside the boxes are at most $4 + 2 + 1 = 7$, so we can conveniently combine them into one octal digit each
$$
	100'111'110'001_2 = \boxed{4} \cdot 8^3 + \boxed{7} \cdot 8^2 + \boxed{6} \cdot 8^1 + \boxed{1} \cdot 8^0 = 4'7'6'1_8.
$$
By this, we have converted this binary number into octal in a glance, which utilizes the regrouping property of the terms by virtue of $2^3 = 8$.

In the same way, we can repeat this to obtain the hexadecimal representation of a binary number

$$
	1001'1111'0001_2 = \boxed{2^3 + 2^0} \cdot 2^8 + \boxed{2^3 + 2^2 + 2^1 + 2^0} \cdot 2^4 + \boxed{2^0} \cdot 2^0.
$$

Where, in the next step, the powers of two are replaced by powers of $16$ and we calculate out the boxed expressions, thus giving

$$
	1001'1111'0001_2 = \boxed{9} \cdot 16^2 + \boxed{15} \cdot 16^1 + \boxed{1} \cdot 16^0 = 9'F'1_{16},
$$

using $F$ as the hexadecimal digit standing for the value $15$.

Converting between different number systems is therefore very simple if the bases are related as in the case between $2$, $8$, and $16$ which are all powers of two. But how would we go about converting a binary number into decimal for example?

For this task we use the principle of successive approximation. But first, we need to prepare the binary representation of powers of ten, we get those from our table above:

$$
	1 = 1_2 \\
	10 = 1010_2
$$

And for higher powers of ten, we can calculate them ourselves by simply taking the product of the binary representation

$$
	100 = 10 \cdot 10 = 1010_2 \cdot 1010_2 = 110'0100_2.
$$

How to take products of binary numbers is analogous to the decimal

 method, but I will leave this for another time. By the way, notice how the number one ends with $1_2$ in binary, ten with $...10_2$ and hundred with $...100_2$. In fact, every power of ten ends with itself (itself in decimal) in the corresponding binary representation, do you see why this could be the case?

Finally, the number one thousand denoted in binary is calculated by taking 

$$
	1000 = 100 \cdot 10 = 110'0100_2 \cdot 1010_2 = 11'1110'1000_2.
$$

We are now ready to convert binary numbers with decimal value up to $9999$ into decimal, by successively approximating them. This means, we start by picking the largest power of ten that fits them and subtract that as often as we can. Take for example $N = 1001'1111'0001_2$. I will conjecture that $10^3$ or $11'1110'1000_2$ is going to be the largest power of ten that fits into $N$, because the next power of ten, which is a myriad must have at least three bits more, which would give 13 bits, but $N$ only has 12 bits.

Next off, we start by subtracting $10^3$ in binary as often as we can from $R_3 := N$.
```
R_3 = 1001'1111'0001_2 
	    - 11'1110'1000_2 
	    ================
       110'0000'1001_2 -> 110'0000'1001_2
    				             - 11'1110'1000_2 
                         ================
                           10'0010'0001_2 =: R_2
``` 
And so after subtracting $11'1110'1000_2$ two times, this algorithm gave us a number less than $1000$ because it starts with $10..._2$ instead of $11..._2$. Therefore we now know

$$
	N = 1001'1111'0001_2 = \boxed{2} \cdot 10^3 + R_2,
$$
where $R_2 = 10'0010'0001_2$ is some remainder that's strictly less than $10^3$ (or less than or equal to $999$). This algorithm will always terminate after a maximum of $9$ steps if we choose our largest power $10^p$ suitably because if it needs more than $9$ steps, a power of ten that fits $N$ would be $10^{p + 1}$, meaning we did not choose $p$ properly. 

Now, repeating this algorithm for the hundreds, continuing with $R_2$ as the starting value we get
$$
	N = \boxed{2} \cdot 10^3 + (\boxed{5} \cdot 10^2 + R_1).
$$
And finally, the tens step using $R_1$ gives
$$
	N = \boxed{2} \cdot 10^3 + (\boxed{5} \cdot 10^2 + (\boxed{4} \cdot 10^1 + R_0)),
$$
where $R_0 = 101_2$, which we know is $5$ from our lookup table. So we have finally figured out how to write $N$ in decimal! The result is $N = 2545$, and the method we used was approximating the number more accurately, step by step, by figuring out how many powers of ten fit into it, starting from the largest at first, until only the least significant rightmost digit remains.

In the end, let us do a more crazy example and use as a base the golden ratio, which is given by $\varphi = \frac{\sqrt{5}+1}{2}$. In decimal, this is roughly $1.618...$ -- an irrational number -- so let us look into how we can use it as a base. 

The next power of $\varphi$ is given by taking $\varphi^2 = 2.618...$, since that is smaller than $2 \cdot \varphi = 3.236...$, we can, therefore, express it using $\boxed{1} \cdot \varphi + R$ with the remainder $R$ being less than $\varphi$, and so the largest digit we will ever need is, in fact, the numeral 1! Using base-$\varphi$ is, therefore, similar to binary, in that there are only two digits. 

Let us now look into how to write some number in base-$\varphi$, for example, the decimal number $2.5 =: R_1$, we start by subtracting the largest power of $\varphi$, which is $\varphi^1$:
$$
	R_1 - \varphi^1 = 0.881966... = R_0
$$
This produces the remainder $R_0$, we now continue trying to subtract powers of $\varphi$ that fit into the remainder, for example, in the next step we would get
$$
	R_0 - \varphi^{0} = -0.118034...
$$
and so $\varphi^{0} = 1$ does not fit into $R_0$, making us conclude the ones digit is zero. We, therefore, continue with $R_{-1} = R_0$ without change and next try
$$
	R_{-1} - \varphi^{-1} = 0.263932... = R_{-2}
$$
So the next digit on the $\varphi^{-1}$ place is one again. Successively subtracting powers of $\varphi$ also leads to the remainder decreasing $0.881966 \to 0.263932 \to ...$, so with every digit, we can represent it more accurately. Continuing this algorithm, we find out that we can write $2.5$ as 
$$
	2.5 = \varphi^1 + \varphi^{-1} + \varphi^{-3} + \varphi^{-8} + \varphi^{-13} ...
$$ 
and the first digits of $2.5$ in base $\varphi$ are, therefore,
$$
	2.5 = 10.10100001001..._\varphi.
$$

Interestingly, the golden ratio has the property that its square $\varphi^2 = 2.618...$ is exactly $\varphi + 1$, so we have

$$
	\varphi^2 = \varphi^1 + \varphi^0
$$

which results in two equivalent representations in base-$\varphi$ of
$$
	\varphi^2 = 100_\varphi = 11_\varphi.
$$

So, in a positional number system, two different representations can denote the same numerical value, which is not just a quirk of base-$\varphi$, but even occurs in decimal as well! Take, for example,

$$
	9.999... = \boxed{9} \cdot 10^{0} + \boxed{9} \cdot 10^{-1} + \boxed{9} \cdot 10^{-2} + \boxed{9} \cdot 10^{-3} ...
$$ 

We can show that its numerical value is exactly equal to $10$ by rewriting it as a geometric series

$$
	9.999... = \sum_{i = 0}^\infty 9 \left( \frac{1}{10} \right)^i
$$

which is equal to

$$
	9.999... = 9 \frac{1}{1-\frac{1}{10}} = 10.
$$

By subtracting $9$ from both sides we also get the much more infamous expression $0.999... = 1$, with both sides being valid representations of the numerical value of one in decimal.

_So, now that we have looked at some very different number systems, you can go and impress your friends with your knowledge about the intricacies of base-$10$, the Chinese number system, the powers of $2$, or the exotic properties of $\varphi$._