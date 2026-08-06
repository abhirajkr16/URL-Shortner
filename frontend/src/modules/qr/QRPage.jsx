import { useState } from "react";

import QRForm from "./QRForm";
import QRModal from "./QRModal";

import "./qr.css";

function QRPage() {

    const [generatedUrl, setGeneratedUrl] = useState(null);

    const [showQRModal, setShowQRModal] = useState(false);

    return (

        <div className="qr-page">

            <div className="qr-header">

                <h1>

                    QR Code Generator

                </h1>

                <p>

                    Create a shortened URL and instantly generate a downloadable QR code.

                </p>

            </div>

            <div className="qr-card">

                <QRForm

                    onGenerate={(url) => {

                        setGeneratedUrl(url);

                        setShowQRModal(true);

                    }}

                />

            </div>

            <QRModal

                isOpen={showQRModal}

                url={generatedUrl}

                onClose={() => {

                    setGeneratedUrl(null);

                    setShowQRModal(false);

                }}

            />

        </div>

    );

}

export default QRPage;