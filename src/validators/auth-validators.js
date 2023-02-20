const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const authValidators = {};

authValidators.fullName = value => {
  return typeof value !== 'string' || value.length < 3 || value.length > 40 ?
    'The full name must have between 3 and 40 characters.' : '';
};

authValidators.email = value => {
  return typeof value !== 'string' || !emailRegex.test(value) ?
    'Invalid email.' : '';
};

authValidators.password = value => {
  return typeof value !== 'string' || value.length < 8 || value.length > 50 ?
    'The password must have between 8 and 50 characters.' : '';
};

authValidators.validateForm = formValue => {
  const errors = {};

  Object.keys(formValue)
    .forEach(formField => {
      const validator = authValidators[formField];
      const fieldValue = formValue[formField];
      errors[formField] = validator(fieldValue);
    });

  return errors;
}

export default authValidators;