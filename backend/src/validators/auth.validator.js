import ValidationError from "../errors/ValidationError.js";

export const validateRegisterData = ({
  fullName,
  username,
  email,
  password,
}) => {

  if (!fullName || fullName.trim().length < 3) {
    throw new ValidationError(
      "Full name must be at least 3 characters long"
    );
  }

  if (fullName.length > 100) {
    throw new ValidationError(
      "Full name cannot exceed 100 characters"
    );
  }
  if (!username || username.trim().length < 3) {
    throw new ValidationError(
      "Username must be at least 3 characters long"
    );
  }

  if (username.length > 50) {
    throw new ValidationError(
      "Username cannot exceed 50 characters"
    );
  }

  // Optional: Only letters, numbers and underscore
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    throw new ValidationError(
      "Username can only contain letters, numbers and underscores"
    );
  }


  if (!email) {
    throw new ValidationError("Email is required");
  }

  if (!email.includes("@") || !email.includes(".")) {
    throw new ValidationError(
      "Please provide a valid email address"
    );
  }


  if (!password) {
    throw new ValidationError("Password is required");
  }

  if (password.length < 8) {
    throw new ValidationError(
      "Password must be at least 8 characters long"
    );
  }

  if (!/[A-Z]/.test(password)) {
    throw new ValidationError(
      "Password must contain at least one uppercase letter"
    );
  }

  if (!/[a-z]/.test(password)) {
    throw new ValidationError(
      "Password must contain at least one lowercase letter"
    );
  }

  if (!/[0-9]/.test(password)) {
    throw new ValidationError(
      "Password must contain at least one number"
    );
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    throw new ValidationError(
      "Password must contain at least one special character"
    );
  }
};

export const validateLoginData = ({
  email,
  password,
}) => {

  if (!email) {
    throw new ValidationError("Email is required");
  }

  if (!password) {
    throw new ValidationError("Password is required");
  }

};