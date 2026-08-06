import { useEffect, useRef, useState } from "react";

import { validateUrlForm } from "../urls/urlValidation";
import { createShortUrl } from "../urls/urlService";
import Button from "../../components/ui/Button";
import TooltipPopup from "../../components/ui/TooltipPopup";

function CreateUrlCard({ onUrlCreated }) {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const [form, setForm] = useState({
        originalUrl: "",
        customAlias: "",
        expiresAt: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const successTimeoutRef = useRef(null);
    const errorTimeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
            if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
        };
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setShowSuccess(false);
        setShowError(false);

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

            setSuccessMsg(
                response.data?.message ||
                "Short URL created successfully."
            );
            setShowSuccess(true);

            if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
            successTimeoutRef.current = setTimeout(() => {
                setShowSuccess(false);
            }, 3000);

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
            setErrorMsg(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
            setShowError(true);

            if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
            errorTimeoutRef.current = setTimeout(() => {
                setShowError(false);
            }, 3000);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="create-url-card">
            <h2>Create Short URL</h2>

            <form onSubmit={handleSubmit} style={{ position: "relative" }}>
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
                        disabled={loading}
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
                    disabled={loading}
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
                                disabled={loading}
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
                                disabled={loading}
                            />
                        </div>
                    </>
                )}
                
                <Button
                    type="submit"
                    className="create-button"
                    loading={loading}
                >
                    Create Short URL
                </Button>

                <TooltipPopup
                    show={showSuccess}
                    message={successMsg}
                    type="success"
                />

                <TooltipPopup
                    show={showError}
                    message={errorMsg}
                    type="error"
                />
            </form>
        </section>
    );
}

export default CreateUrlCard;