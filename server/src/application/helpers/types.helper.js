function isNullish(value) {
  return [null, undefined].includes(value);
}

function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

function isEnum(enumeration, value) {
  return Object.values(enumeration).includes(value);
}

function isObject(value) {
  return typeof value === 'object';
}

function isValidValue(value) {
  return !isNullish(value);
}

function isNotEmptyString(value) {
  return isValidValue(value) && isString(value) && value.length > 0;
}

function isNonEmptyObject(value) {
  return isValidValue(value) && isObject(value) && Object.keys(value).length > 0;
}

function isJSONString(value) {
  try {
    JSON.parse(value);

    return true;
  } catch (error) {
    return false;
  }
}

function isNullishOrEmpty(value) {
  return (
    isNullish(value) ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.length === 0)
  );
}

module.exports = {
  isNullish,
  isString,
  isEnum,
  isValidValue,
  isNotEmptyString,
  isJSONString,
  isNonEmptyObject,
  isNullishOrEmpty,
};
