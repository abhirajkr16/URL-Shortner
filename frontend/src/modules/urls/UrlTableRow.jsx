import { useState } from "react";

import TooltipPopup from "../../components/ui/TooltipPopup";
import ConfirmationModal from "../../components/ui/ConfirmationModal";

import { copyToClipboard } from "../../utils/clipboard";

import { useNavigate } from "react-router-dom";
function UrlTableRow({
    url,
    onDelete,
    onEdit,
}) {

    const [showCopyPopup, setShowCopyPopup] = useState(false);

    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    async function handleCopy() {

        const shortUrl =
            `http://localhost:3000/${url.short_code}`;

        const success =
            await copyToClipboard(shortUrl);

        if (!success) {
            return;
        }

        setShowCopyPopup(true);

        setTimeout(() => {

            setShowCopyPopup(false);

        }, 1800);

    }

    async function handleDelete() {

        setShowConfirmation(false);
        const success = await onDelete(url.id);

        if (!success) {
            return;
        }

        setShowDeletePopup(true);

        setTimeout(() => {

            setShowDeletePopup(false);

        }, 1800);

    }

    return (

        <>

            <tr>

                <td>
                    {url.original_url}
                </td>

                <td>
                    {url.short_code}
                </td>

                <td>
                    {new Date(url.created_at).toLocaleDateString()}
                </td>

                <td>

                    {

                        url.expires_at

                            ? new Date(
                                url.expires_at
                            ).toLocaleDateString()

                            : "Never"

                    }

                </td>

                <td className="action-buttons">

                    <div className="button-wrapper">

                        <TooltipPopup
                            show={showCopyPopup}
                            message="✓ Copied"
                            type="success"
                        />

                        <button
                            className="copy-button"
                            onClick={handleCopy}
                        >
                            Copy
                        </button>

                    </div>

                    <button
                        className="edit-button"
                        onClick={() => onEdit(url)}
                    >
                        Edit
                    </button>

                    <button
                        className="analytics-button"
                        onClick={() => {
                            navigate(
                                `/dashboard/analytics/${url.id}`
                            );
                        }}
                    >
                        Analytics
                    </button>


                    <div className="button-wrapper">

                        <TooltipPopup
                            show={showDeletePopup}
                            message="✓ Deleted"
                            type="error"
                        />

                        <button
                            className="delete-button"
                            onClick={() =>
                                setShowConfirmation(true)
                            }
                        >
                            Delete
                        </button>

                    </div>

                </td>

            </tr>

            <ConfirmationModal

                isOpen={showConfirmation}

                title="Delete URL?"

                message="This action cannot be undone."

                confirmText="Delete"

                cancelText="Cancel"

                confirmType="danger"

                onConfirm={handleDelete}

                onCancel={() =>
                    setShowConfirmation(false)
                }

            />

        </>

    );

}

export default UrlTableRow;