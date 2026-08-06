import { useEffect, useState } from "react";

import ProfileForm from "./ProfileForm";

import {
    getProfile,
    updateProfile,
} from "./profileService";

import { saveUser } from "../../utils/token";

import "./profile.css";

function ProfilePage() {

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    const [showSuccess, setShowSuccess] =
        useState(false);

    useEffect(() => {

        loadProfile();

    }, []);

    async function loadProfile() {

        try {

            const response =
                await getProfile();

            setProfile(response.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    async function handleSave(data) {

        try {

            const response =
                await updateProfile(data);

            const updatedUser = response.data;

            saveUser({
                id: updatedUser.id,
                fullName: updatedUser.full_name,
                username: updatedUser.username,
                email: updatedUser.email
            });

            setProfile(updatedUser);

            window.dispatchEvent(new Event("user-updated"));

            setShowSuccess(true);

            setTimeout(() => {

                setShowSuccess(false);

            }, 2000);

        }

        catch (error) {

            console.error(error);

        }

    }

    if (loading) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="profile-page">

            <div className="profile-card">

                <h1>

                    My Profile

                </h1>

                <p>

                    Update your account information.

                </p>

                <ProfileForm

                    profile={profile}

                    onSave={handleSave}

                />

                {showSuccess && (

                    <div className="profile-success-popup">

                        Profile updated successfully

                    </div>

                )}

            </div>

        </div>

    );

}

export default ProfilePage;