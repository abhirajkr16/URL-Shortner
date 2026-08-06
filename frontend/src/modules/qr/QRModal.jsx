import { useRef, useState } from "react";

import QRCode from "react-qr-code";
import { toPng } from "html-to-image";

import Button from "../../components/ui/Button";
import TooltipPopup from "../../components/ui/TooltipPopup";

import { copyToClipboard } from "../../utils/clipboard";

import "./qr-modal.css";

function QRModal({

    isOpen,

    url,

    onClose,

}) {

    const qrRef = useRef(null);

    const [showCopyPopup, setShowCopyPopup] =
        useState(false);

    const [showDownloadPopup, setShowDownloadPopup] =
        useState(false);

    if (!isOpen || !url) {

        return null;

    }

    const shortUrl =
        `http://localhost:3000/api/v1/redirect/${url.short_code}`;

    async function handleCopy() {

        await copyToClipboard(shortUrl);

        setShowCopyPopup(true);

        setTimeout(() => {

            setShowCopyPopup(false);

        }, 1800);

    }

    async function handleDownload() {

        const dataUrl =
            await toPng(qrRef.current);

        const link =
            document.createElement("a");

        link.download =
            `${url.short_code}.png`;

        link.href =
            dataUrl;

        link.click();

        setShowDownloadPopup(true);

        setTimeout(() => {

            setShowDownloadPopup(false);

        }, 1800);

    }

    return (

        <div className="qr-modal-overlay">

            <div className="qr-modal">

                <button
                    className="qr-close"
                    onClick={onClose}
                >

                    <i className="fa-solid fa-xmark"></i>

                </button>

                <h2>

                    QR Code Generated

                </h2>

                <div className="url-box">

                    <span>

                        {shortUrl}

                    </span>

                    <Button
                        onClick={handleCopy}
                    >

                        Copy

                    </Button>

                </div>

                <div
                    className="qr-wrapper"
                    ref={qrRef}
                >

                    <QRCode
                        value={shortUrl}
                        size={220}
                    />

                </div>

                <div className="qr-buttons">

                    <Button
                        onClick={handleDownload}
                    >

                        Download PNG

                    </Button>

                    <Button
                        variant="secondary"
                        onClick={onClose}
                    >

                        Generate Another

                    </Button>

                </div>

                <TooltipPopup

                    show={showCopyPopup}

                    message="✓ Copied"

                    type="success"

                />

                <TooltipPopup

                    show={showDownloadPopup}

                    message="✓ Downloaded"

                    type="success"

                />

            </div>

        </div>

    );

}

export default QRModal;