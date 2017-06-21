

function *withIndex(source) {
  let i = 0;
  for(let item of source) {
    yield {
      index: i,
      value: item,
    };
    ++i;
  }
}

exports.withIndex = withIndex;
