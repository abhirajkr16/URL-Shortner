import { useEffect, useRef, useState } from "react";

import { createShortUrl } from "../urls/urlService";
import Button from "../../components/ui/Button";
import TooltipPopup from "../../components/ui/TooltipPopup";

function QRForm({

    onGenerate,

}) {

    const [form, setForm] = useState({

        originalUrl: "",

        customAlias: "",

        expiresAt: "",

    });

    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const errorTimeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
        };
    }, []);

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            setLoading(true);

            const response =
                await createShortUrl(form);

            onGenerate(response.data);

        }

        catch (error) {

            console.error(error);

            setErrorMsg(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
            setShowError(true);

            if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
            errorTimeoutRef.current = setTimeout(() => {
                setShowError(false);
            }, 3000);

        }

        finally {

            setLoading(false);

        }

    }

    function handleChange(event) {

        const {

            name,

            value,

        } = event.target;

        setForm((previous) => ({

            ...previous,

            [name]: value,

        }));

    }

    return (

        <form
            className="qr-form"
            onSubmit={handleSubmit}
            style={{ position: "relative" }}
        >

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

                    Custom Alias

                </label>

                <input

                    type="text"

                    name="customAlias"

                    value={form.customAlias}

                    onChange={handleChange}

                    placeholder="Optional"

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

            <Button
                type="submit"
                fullWidth
                loading={loading}
            >
                Generate QR
            </Button>

            <TooltipPopup
                show={showError}
                message={errorMsg}
                type="error"
            />

        </form>

    );

}

export default QRForm;