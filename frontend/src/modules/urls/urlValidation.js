export function validateUrlForm(form) {

    const errors = {};

    if (!form.originalUrl.trim()) {
        errors.originalUrl = "Long URL is required";
    }
    else {
        try {
            new URL(form.originalUrl);
        }
        catch {
            errors.originalUrl = "Please enter a valid URL";
        }
    }

    if (form.customAlias?.length > 50) {
        errors.customAlias = "Alias cannot exceed 50 characters";
    }

    return errors;
}