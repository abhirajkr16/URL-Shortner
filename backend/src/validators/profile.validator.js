import ValidationError from "../errors/ValidationError.js";

export const validateProfileUpdateData = ({
    fullName,
    username,
    email,
    password,
}) => {

    if (!fullName?.trim()) {
        throw new ValidationError(
            "Full name is required"
        );
    }

    if (!username?.trim()) {
        throw new ValidationError(
            "Username is required"
        );
    }

    if (!email?.trim()) {
        throw new ValidationError(
            "Email is required"
        );
    }

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        throw new ValidationError(
            "Invalid email format"
        );
    }

    if (
        password &&
        password.length < 6
    ) {
        throw new ValidationError(
            "Password must be at least 6 characters"
        );
    }

};