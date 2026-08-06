import "./help.css";

function HelpPage() {

    return (

        <div className="help-page">

            <div className="help-header">

                <h1>
                    Help & Support
                </h1>

                <p>
                    Find answers to common questions and ways to get support while using Shortify.
                </p>

            </div>

            <section className="help-card">

                <h2>
                    Frequently Asked Questions
                </h2>

                <div className="faq-item">

                    <h3>
                        How do I shorten a URL?
                    </h3>

                    <p>
                        Go to the Dashboard, paste your original URL into the form, optionally add a custom alias or expiration date, and click <strong>Create Short URL</strong>.
                    </p>

                </div>

                <div className="faq-item">

                    <h3>
                        Why is my short URL not redirecting?
                    </h3>

                    <p>
                        The URL may have expired or been deleted. Make sure the short URL still exists in your account.
                    </p>

                </div>

                <div className="faq-item">

                    <h3>
                        Can I edit a shortened URL?
                    </h3>

                    <p>
                        Yes. Open the <strong>My URLs</strong> page, click the Edit button, and update the original URL or expiration date.
                    </p>

                </div>

                <div className="faq-item">

                    <h3>
                        How do analytics work?
                    </h3>

                    <p>
                        Every successful redirect records a click. You can view total clicks and recent activity from the Analytics section.
                    </p>

                </div>

            </section>

            <section className="help-card">

                <h2>
                    Contact Support
                </h2>

                <p>

                    If your issue isn't answered above, you can contact us using the information below.

                </p>

                <div className="contact-info">

                    <div>

                        <strong>Email</strong>

                        <p>
                            support@shortify.dev
                        </p>

                    </div>

                    <div>

                        <strong>GitHub</strong>

                        <p>
                            github.com/abhirajkr16
                        </p>

                    </div>

                </div>

            </section>

        </div>

    );

}

export default HelpPage;