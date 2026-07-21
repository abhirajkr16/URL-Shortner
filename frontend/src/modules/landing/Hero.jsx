import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="hero">
            <div className="container hero__container">

                <div className="hero__left">

                    <span className="hero__badge">
                        Fast • Secure • Analytics
                    </span>

                    <h1 className="hero__title">
                        Shorten URLs
                        <br />
                        with Confidence.
                    </h1>

                    <p className="hero__description">
                        Create, manage and track every shortened URL
                        from one fast, secure and reliable platform.
                    </p>

                    <div className="hero__buttons">

                        <Link
                            to="/register"
                            className="hero__primary-btn"
                        >
                            Get Started
                        </Link>

                        <a
                            href="#"
                            className="hero__secondary-btn"
                        >
                            GitHub
                        </a>

                    </div>

                </div>

                <div className="hero__right">

                    <div className="dashboard-preview">

                        <div className="dashboard-preview__header">
                            Dashboard
                        </div>

                        <div className="dashboard-preview__body">

                            <div className="dashboard-item">
                                <span>Total URLs</span>
                                <strong>248</strong>
                            </div>

                            <div className="dashboard-item">
                                <span>Total Clicks</span>
                                <strong>18,524</strong>
                            </div>

                            <div className="dashboard-item">
                                <span>Active Links</span>
                                <strong>232</strong>
                            </div>

                            <div className="dashboard-item">
                                <span>QR Codes</span>
                                <strong>91</strong>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}

export default Hero;

// function Hero() {
//     return (
//         <div
//             style={{
//                 color: "white",
//                 fontSize: "40px",
//                 padding: "50px",
//             }}
//         >
//             Hero Component Working
//         </div>
//     );
// }

// export default Hero;