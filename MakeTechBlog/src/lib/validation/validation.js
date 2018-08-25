// 길이 검증

isString = str => {
  return typeof str === 'string';
};

arrayElementIsString = strArray => {
  for (value of strArray) {
    if (typeof value !== 'string') {
      return false;
    }
  }

  return true;
};

isLength = (val, min, max = Number.MAX_SAFE_INTEGER) => {
  const valLen = val.length;
  if (min > max) {
    [min, max] = [max, min];
  }
  return valLen > min && valLen < max;
};

module.exports = {
  isString,
  arrayElementIsString,
  isLength,
};
