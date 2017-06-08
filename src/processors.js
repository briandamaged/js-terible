
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


exports.select = select;
exports.reject = reject;
exports.map = map;
exports.tap = tap;
