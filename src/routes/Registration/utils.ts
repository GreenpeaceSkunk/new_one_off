export const validateField = (value = ''): boolean => {
  return (value !== '');
};

export const validateAmount = (monto = '', otherAmount = ''): boolean => {
  return !(monto === 'otherAmount' && otherAmount === '');
}

export const validateFirstName = (value = ''): boolean => {
  if(validateField(value)) {
    return value.length >= 2;
  }
  return false;
}

export const validateLastName = (value = ''): boolean => {
  if(validateField(value)) {
    return value.length >= 2;
  }
  return false;
}

export const validateAreaCode = (value = ''): boolean => {
  if(validateField(value)) {
    return value.length >= 2;
  }
  return false;
}

export const validatePhoneNumber = (value = ''): boolean => {
  if(validateField(value)) {
    return value.length >= 6;
  }
  return false;
}

export const validateCitizenId = (value = ''): boolean => {
  if(validateField(value)) {
    return value.length === 8;
  }
  return false;
}

export const validateCreditCard = (value = ''): boolean => {
  if(validateField(value)) {
    return value.length === 16;
  }
  return false;
}

export const validateEmail = (value = ''): boolean => {
  if(validateField(value)) {
    return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value));
  }
  return false;
}

