import { useEffect, useState } from "react";

// import ConfirmationModal from "../../components/ui/Modal";

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

    useEffect(() => {
        // console.log(url);
        if (!url) {
            return;
        }

        setForm({
            originalUrl: url.original_url || "",
            expiresAt: url.expires_at
                ? url.expires_at.split("T")[0]
                : "",
        });

    }, [url]);

    function handleChange(event) {

        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

    }

    async function handleSubmit(event) {

        event.preventDefault();

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