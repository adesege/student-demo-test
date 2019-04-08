export const transformValidationError = (errors) => {
  const newErrors = [];
  errors.forEach((error) => {
    const errorConstraints = error.constraints;
    Object.keys(errorConstraints).map(constraint => newErrors.push(errorConstraints[constraint]));
  });
  return newErrors;
};

export default { transformValidationError };
