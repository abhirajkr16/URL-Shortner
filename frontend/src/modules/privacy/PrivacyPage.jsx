import "./privacy.css";

function PrivacyPage() {

    return (

        <div className="privacy-page">

            <div className="privacy-header">

                <h1>Privacy Policy</h1>

                <p>
                    Last Updated: August 2026
                </p>

            </div>

            <section className="privacy-card">

                <h2>Information We Collect</h2>

                <p>
                    Shortify stores only the information necessary to provide
                    URL shortening services, including your account details,
                    shortened URLs, analytics, and usage data.
                </p>

            </section>

            <section className="privacy-card">

                <h2>How We Use Your Data</h2>

                <p>
                    We use your information to create shortened URLs,
                    authenticate your account, display analytics,
                    and improve the overall user experience.
                </p>

            </section>

            <section className="privacy-card">

                <h2>Data Security</h2>

                <p>
                    We use industry-standard security practices to protect your
                    information. Passwords are securely hashed, and authentication
                    is handled using JWT.
                </p>

            </section>

            <section className="privacy-card">

                <h2>Your Rights</h2>

                <p>
                    You may update or delete your URLs at any time. You also have
                    the right to request removal of your account data.
                </p>

            </section>

        </div>

    );

}

export default PrivacyPage;