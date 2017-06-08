
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
    return this.pipe(function *(source) {
      for(let item of source) {
        if(f(item)) {
          yield item;
        }
      }
    })
  }

  reject(f) {
    return this.pipe(function *(source) {
      for(let item of source) {
        if(!f(item)) {
          yield item;
        }
      }
    });
  }

  map(f) {
    return this.pipe(function *(source) {
      for(let item of source) {
        yield f(item);
      }
    })
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

  tap(f) {
    return this.pipe(function*(source) {
      for(let item of source) {
        f(item);
        yield item;
      }
    });
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
