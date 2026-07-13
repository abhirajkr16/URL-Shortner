import ValidationError from "../errors/ValidationError.js";

export const validateRegisterData = ({ username, email, password }) => {
  if (!username || username.trim().length < 3) {
    throw new ValidationError("Username must be at least 3 characters long");
  }

  if (username.length > 50) {
    throw new ValidationError("Username cannot exceed 50 characters");
  }

  if (!email) {
    throw new ValidationError("Email is required");
  }

  if (!email.includes("@") || !email.includes(".")) {
    throw new ValidationError("Please provide a valid email address");
  }

  if (!password) {
    throw new ValidationError("Password is required");
  }

  if (password.length < 8) {
    throw new ValidationError("Password must be at least 8 characters long");
  }

  if (!/[A-Z]/.test(password)) {
    throw new ValidationError(
      "Password must contain at least one uppercase letter",
    );
  }

  if (!/[a-z]/.test(password)) {
    throw new ValidationError(
      "Password must contain at least one lowercase letter",
    );
  }

  if (!/[0-9]/.test(password)) {
    throw new ValidationError("Password must contain at least one number");
  }
  // if (password !== confirmPassword) {
  //   throw new ValidationError("Passwords do not match");
  // }
  // if (!/[!"#$%^&*()-+=[]{}|;:,.<>?`~]/.test(password)) {
  //   throw new ValidationError("Password must contain at least one special character");
  // }
};
