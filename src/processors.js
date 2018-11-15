
const {withIndex} = require('./generators');
const {isPlural} = require('./predicates');

function select(f) {
  return function *(source) {
    for(let item of source) {
      if(f(item)) {
        yield item;
      }
    }
  }
}

function reject(f) {
  return function*(source) {
    for(let item of source) {
      if(!f(item)) {
        yield item;
      }
    }
  }
}

function map(f) {
  return function*(source) {
    for(let item of source) {
      yield f(item);
    }
  }
}

function tap(f) {
  return function*(source) {
    for(let item of source) {
      f(item);
      yield item;
    }
  }
}


function limit(n) {
  return function*(source) {
    for(let {index, value} of withIndex(source)) {
      if(index < n) {
        yield value;
      } else {
        break;
      }
    }
  }
}


function slicesOfSize(n) {
  return function*(source) {
    const iter = source[Symbol.iterator]();

    while(true) {
      const buffer = [];
      for(let i = 0; i < n; ++i) {
        const n = iter.next();
        if(n.done) {
          if(buffer.length > 0) {
            yield buffer;
          }
          return;
        } else {
          buffer.push(n.value);
        }

      }

      yield buffer;
    }
  }
}



function* flatten(source) {
  for(const item of source) {
    if(isPlural(item)) {
      yield* flatten(item);
    } else {
      yield item;
    }
  }
}


exports.select = select;
exports.reject = reject;
exports.map = map;
exports.tap = tap;
exports.slicesOfSize = slicesOfSize;
exports.flatten = flatten;

exports.limit = limit;
