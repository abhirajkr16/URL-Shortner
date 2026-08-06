import { useState } from "react";

import { validateUrlForm } from "../urls/urlValidation";
import { createShortUrl } from "../urls/urlService";

function CreateUrlCard({ onUrlCreated }) {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const [form, setForm] = useState({
        originalUrl: "",
        customAlias: "",
        expiresAt: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [serverError, setServerError] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setSuccessMessage("");
        setServerError("");

        const validationErrors = validateUrlForm(form);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setLoading(true);

        try {
            const response = await createShortUrl(form);

            console.log(response);

            setSuccessMessage("Short URL created successfully.");

            setForm({
                originalUrl: "",
                customAlias: "",
                expiresAt: "",
            });

            setShowAdvanced(false);

            if (onUrlCreated) {
                onUrlCreated();
            }
        } catch (error) {
            setServerError(
                error.response?.data?.message ||
                "Failed to create short URL."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="create-url-card">
            <h2>Create Short URL</h2>

            {successMessage && (
                <p className="success-text">
                    {successMessage}
                </p>
            )}

            {serverError && (
                <p className="error-text">
                    {serverError}
                </p>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="originalUrl">
                        Long URL <span>*</span>
                    </label>

                    <input
                        id="originalUrl"
                        type="url"
                        name="originalUrl"
                        placeholder="https://example.com"
                        value={form.originalUrl}
                        onChange={handleChange}
                        required
                    />

                    {errors.originalUrl && (
                        <p className="error-text">
                            {errors.originalUrl}
                        </p>
                    )}
                </div>

                <button
                    type="button"
                    className="toggle-button"
                    onClick={() => setShowAdvanced((previous) => !previous)}
                >
                    {showAdvanced
                        ? "Hide Advanced Options"
                        : "Show Advanced Options"}
                </button>

                {showAdvanced && (
                    <>
                        <div className="form-group">
                            <label htmlFor="customAlias">
                                Custom Alias
                            </label>

                            <input
                                id="customAlias"
                                type="text"
                                name="customAlias"
                                placeholder="my-link"
                                value={form.customAlias}
                                onChange={handleChange}
                            />

                            {errors.customAlias && (
                                <p className="error-text">
                                    {errors.customAlias}
                                </p>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="expiresAt">
                                Expiration Date
                            </label>

                            <input
                                id="expiresAt"
                                type="date"
                                name="expiresAt"
                                value={form.expiresAt}
                                onChange={handleChange}
                            />
                        </div>
                    </>
                )}
                <button
                    type="submit"
                    className="create-button"
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Short URL"}
                </button>
            </form>
        </section>
    );
}

export default CreateUrlCard;