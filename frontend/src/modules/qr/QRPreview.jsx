// import { useRef } from "react";

// import QRCode from "react-qr-code";

// import { toPng } from "html-to-image";

// import { copyToClipboard } from "../../utils/clipboard";

// function QRPreview({

//     url,

//     onReset,

// }) {
//     const [showCopyPopup, setShowCopyPopup] =
//         useState(false);

//     async function handleCopy() {

//         await copyToClipboard(shortUrl);

//         setShowCopyPopup(true);

//         setTimeout(() => {

//             setShowCopyPopup(false);

//         }, 1800);

//     }
//     <TooltipPopup

//         show={showCopyPopup}

//         message="✓ Copied"

//         type="success"

//     />

//     const qrRef = useRef(null);

//     if (!url) {

//         return null;

//     }

//     const shortUrl =
//         `http://localhost:3000/api/v1/redirect/${url.short_code}`;

//     async function handleDownload() {

//         const dataUrl =
//             await toPng(qrRef.current);

//         const link =
//             document.createElement("a");

//         link.download =
//             `${url.short_code}.png`;

//         link.href = dataUrl;

//         link.click();

//     }

//     async function handleCopy() {

//         await copyToClipboard(shortUrl);

//     }

//     return (

//         <div className="qr-preview">

//             <h2>

//                 QR Code Generated

//             </h2>

//             <div className="url-preview">

//                 <label>

//                     Short URL

//                 </label>

//                 <div className="url-box">

//                     <span>

//                         {shortUrl}

//                     </span>

//                     <button
//                         onClick={handleCopy}
//                     >

//                         Copy

//                     </button>

//                 </div>

//             </div>

//             <div
//                 className="qr-box"
//                 ref={qrRef}
//             >

//                 <QRCode

//                     value={shortUrl}

//                     size={220}

//                 />

//             </div>

//             <div className="qr-actions">

//                 <button
//                     className="download-button"
//                     onClick={handleDownload}
//                 >

//                     Download PNG

//                 </button>

//                 <button
//                     className="new-button"
//                     onClick={onReset}
//                 >

//                     Generate Another

//                 </button>

//             </div>

//         </div>

//     );

// }

// export default QRPreview;