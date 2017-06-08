# terible #

A terrible library for iterators.

## Usage ##

```javascript

const t = require('terible');

function *someGenerator() {
  for(let i = 0; i < 10; ++i) {
    yield i;
  }
}

t(someGenerator())
  .select(x=> x > 1)
  .reject(x=> x > 8)
  .map(x=> x * x)
  .forEach(x=> console.log(x));

```
