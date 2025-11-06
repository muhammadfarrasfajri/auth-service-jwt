import validator from "validator";
export const validatedUser = (dataUser, isUpdate = false) => {
  const { name, email, password, role } = dataUser;

  if (!isUpdate) {
    if (!name || !email || !password || !role) {
      throw new Error("name, email, passoword and role are required");
    }
  }

  if (isUpdate && !name && !email && !password && !role) {
    throw new Error("no data to update");
  }

  if (email && !validator.isEmail(email)) {
    throw new Error("invalid email format");
  }

  if (name && name.length < 3) {
    throw new Error("name must be at least 3 characters long");
  }
  return dataUser;
};
