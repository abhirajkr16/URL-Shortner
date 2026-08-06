import { useEffect, useState } from "react";
import { validateUrlForm } from "./urlValidation";

function EditUrlModal({
    isOpen,
    url,
    onClose,
    onSave,
}) {

    const [form, setForm] = useState({
        originalUrl: "",
        expiresAt: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!url) {
            return;
        }

        setForm({
            originalUrl: url.original_url || "",
            expiresAt: url.expires_at
                ? url.expires_at.split("T")[0]
                : "",
        });

        setErrors({});

    }, [url, isOpen]);

    function handleChange(event) {

        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setErrors((previousErrors) => ({
            ...previousErrors,
            [name]: "",
        }));

    }

    async function handleSubmit(event) {

        event.preventDefault();

        const validationErrors = validateUrlForm(form);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        await onSave({
            id: url.id,
            ...form,
        });

    }

    if (!isOpen) {
        return null;
    }

    return (

        <div className="modal-overlay">

            <div className="confirmation-modal">

                <h2>Edit URL</h2>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>
                            Original URL
                        </label>

                        <input
                            type="url"
                            name="originalUrl"
                            value={form.originalUrl}
                            onChange={handleChange}
                            required
                        />

                        {errors.originalUrl && (
                            <p className="input__error">
                                {errors.originalUrl}
                            </p>
                        )}

                    </div>

                    <div className="form-group">

                        <label>
                            Expiration Date
                        </label>

                        <input
                            type="date"
                            name="expiresAt"
                            value={form.expiresAt}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="modal-actions">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="confirm-button"
                        >
                            Save Changes
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditUrlModal;