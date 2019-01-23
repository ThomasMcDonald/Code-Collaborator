# Code Therapy web version


### Room Generation
- Letters in alphabet: 26
- Add Capitals: 26
- Add numerics: 10 [0-9]

In total you get 26 + 26 + 10 = 62 characters.

10 possible string places, Gives you 62^10 possible combinations.
That is 8.3929937*10^17 ~ 839,299,370,000,000,000 combinations == 839 quadrillion 299 trillion 370 billion combinations .

This test python script I found [here](https://stackoverflow.com/a/7591126) will print out when it finds a collision, I originally had the string length set at 6 but on average found a collision around 30k strings.

```python
import random
codes = set()
while 1:
        code=''.join(random.choice('1234567890qwertyuiopasdfghjklzxcvbnmABCDEFGHIJKLMNOPQRSTUVWXYZ')for x in range(10))
        if code in codes: break
        codes.add(code)
print(len(codes))

```
