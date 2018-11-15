
const {
  select, reject, map, tap, limit,
  slicesOfSize, flatten,
} = require('./processors');

const {withIndex} = require('./generators');

class Terible {
  constructor(source) {
    this.source = source;
  }

  *iter() {
    for(let item of this.source) {
      yield item;
    }
  }

  pipe(processor) {
    return new Terible(processor(this.source));
  }

  select(f) {
    return this.pipe(select(f));
  }

  reject(f) {
    return this.pipe(reject(f));
  }

  map(f) {
    return this.pipe(map(f));
  }

  tap(f) {
    return this.pipe(tap(f));
  }

  withIndex() {
    return this.pipe(withIndex);
  }

  limit(n) {
    return this.pipe(limit(n));
  }

  reduce(f, initialValue) {
    const iter = this.iter();

    let result = (arguments.length > 1) ? initialValue : iter.next().value;
    for(let item of iter) {
      result = f(result, item);
    }

    return result;
  }

  each(f) {
    for(let item of this) {
      f(item);
    }
  }

  slicesOfSize(n) {
    return this.pipe(slicesOfSize(n));
  }

  flatten() {
    return this.pipe(flatten);
  }


  toArray() {
    return Array.from(this);
  }
}


// Define some method aliases
const p = Terible.prototype;
Object.assign(p, {
  [Symbol.iterator]: p.iter,
  filter: p.select,
  forEach: p.each,
});


function terible(source) {
  return new Terible(source);
}

module.exports = exports = terible;
