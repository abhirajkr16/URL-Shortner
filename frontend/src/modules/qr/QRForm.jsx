import { useState } from "react";

import { createShortUrl } from "../urls/urlService";
import Button from "../../components/ui/Button";

function QRForm({

    onGenerate,

}) {

    const [form, setForm] = useState({

        originalUrl: "",

        customAlias: "",

        expiresAt: "",

    });

    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            setLoading(true);

            const response =
                await createShortUrl(form);

            onGenerate(response.data);

        }

        catch (error) {

            console.error(

                error.response?.data ||

                error.message

            );

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
                disabled={loading}
            >

                {

                    loading

                        ? "Generating..."

                        : "Generate QR"

                }

            </Button>

        </form>

    );

}

export default QRForm;