function validateMaxLength(value, fieldName, maxLength) {
  if (value && typeof value === 'string' && value.length > maxLength) {
    return `${fieldName} must be ${maxLength} characters or less.`;
  }
  return null;
}

function validateEnum(value, fieldName, allowedValues) {
  if (value && !allowedValues.includes(value)) {
    return `${fieldName} must be one of: ${allowedValues.join(', ')}`;
  }
  return null;
}

module.exports = { validateMaxLength, validateEnum };
