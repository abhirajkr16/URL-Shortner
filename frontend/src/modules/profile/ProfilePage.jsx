import { getUser } from "../../utils/token";

import "./profile.css";

function ProfilePage() {

    const user = getUser();

    return (

        <div className="profile-page">

            <div className="profile-header">

                <h1>

                    My Profile

                </h1>

                <p>

                    View your account information.

                </p>

            </div>

            <div className="profile-card">

                <div className="profile-avatar">

                    {

                        user?.fullName
                            ?.charAt(0)
                            .toUpperCase()

                    }

                </div>

                <div className="profile-info">

                    <div className="profile-item">

                        <label>

                            Full Name

                        </label>

                        <p>

                            {user?.fullName}

                        </p>

                    </div>

                    <div className="profile-item">

                        <label>

                            Username

                        </label>

                        <p>

                            {user?.username}

                        </p>

                    </div>

                    <div className="profile-item">

                        <label>

                            Email

                        </label>

                        <p>

                            {user?.email}

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ProfilePage;                                                                                                                                                                                                                                                                                                                                                                                                                                                                         