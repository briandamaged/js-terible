
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


function withIndex() {
  return function*(source) {
    let i = 0;
    for(let item of source) {
      yield {
        index: i,
        value: item,
      };
      ++i;
    }
  }
}

exports.select = select;
exports.reject = reject;
exports.map = map;
exports.withIndex = withIndex;
exports.tap = tap;
