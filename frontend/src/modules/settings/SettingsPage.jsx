import "./settings.css";

function SettingsPage() {

    return (

        <div className="settings-page">

            <div className="settings-card">

                <h1>

                    Settings

                </h1>

                <p>

                    Customize your Shortify experience.

                </p>

                <div className="settings-section">

                    <h2>

                        Appearance

                    </h2>

                    <p>

                        Theme settings will be available here.

                    </p>

                </div>

                <div className="settings-section">

                    <h2>

                        Application

                    </h2>

                    <p>

                        Configure default application preferences.

                    </p>

                </div>

            </div>

        </div>

    );

}

export default SettingsPage;