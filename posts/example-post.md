# Example Proof: Sum of First $n$ Integers

We want to show that:
$$1 + 2 + \dots + n = \frac{n(n+1)}{2}.$$

**Proof.**  
We proceed by induction on $n$.

Base case ($n=1$) is trivial.  
Assume true for $n=k$:  
$$1 + 2 + \dots + k = \frac{k(k+1)}{2}.$$

Then for $n=k+1$:  
$$
1 + 2 + \dots + (k+1)
= \frac{k(k+1)}{2} + (k+1)
= \frac{(k+1)(k+2)}{2}.
$$

✅ Hence the formula holds for all $n$.
