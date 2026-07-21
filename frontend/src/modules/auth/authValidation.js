export function validateRegisterForm(form) {

    const errors = {};

    if (!form.fullName.trim()) {
        errors.fullName = "Full name is required.";
    }
    else if (form.fullName.trim().length < 3) {
        errors.fullName =
            "Full name must be at least 3 characters.";
    }

    if (!form.email.trim()) {
        errors.email = "Email is required.";
    }
    else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
        errors.email =
            "Please enter a valid email address.";
    }

    if (!form.password) {
        errors.password = "Password is required.";
    }
    else {

        if (form.password.length < 8) {
            errors.password =
                "Password must be at least 8 characters.";
        }
        else if (!/[A-Z]/.test(form.password)) {
            errors.password =
                "Password must contain at least one uppercase letter.";
        }
        else if (!/[a-z]/.test(form.password)) {
            errors.password =
                "Password must contain at least one lowercase letter.";
        }
        else if (!/[0-9]/.test(form.password)) {
            errors.password =
                "Password must contain at least one number.";
        }
        else if (!/[!@#$%^&*(),.?":{}|<>]/.test(form.password)) {
            errors.password =
                "Password must contain at least one special character.";
        }

    }

    if (!form.confirmPassword) {
        errors.confirmPassword =
            "Please confirm your password.";
    }
    else if (form.password !== form.confirmPassword) {
        errors.confirmPassword =
            "Passwords do not match.";
    }

    if (!form.agreeTerms) {
        errors.agreeTerms =
            "You must accept the Terms and Privacy Policy.";
    }

    return errors;
}

export function validateLoginForm(form) {

    const errors = {};

    if (!form.email.trim()) {
        errors.email = "Email is required.";
    }
    else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
        errors.email = "Please enter a valid email.";
    }

    if (!form.password) {
        errors.password = "Password is required.";
    }

    return errors;

}