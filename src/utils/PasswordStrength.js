import validator from "validator";

export const validatePassword = (password) => {
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minSymbols: 1,
      minNumbers: 1,
      minUppercase: 1,
    })
  ) {
    throw new Error("password is to weak");
  }
};
