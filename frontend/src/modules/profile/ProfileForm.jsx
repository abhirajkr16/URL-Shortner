import { useEffect, useState } from "react";

import Button from "../../components/ui/Button";

function ProfileForm({

    profile,

    onSave,

}) {

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({

        fullName: "",

        username: "",

        email: "",

        password: "",

    });

    useEffect(() => {

        if (profile) {

            setFormData({

                fullName: profile.full_name,

                username: profile.username,

                email: profile.email,

                password: "",

            });

        }

    }, [profile]);

    function handleChange(event) {

        const {

            name,

            value,

        } = event.target;

        setFormData((previous) => ({

            ...previous,

            [name]: value,

        }));

    }

    async function handleSubmit(event) {

        event.preventDefault();

        await onSave(formData);

        setIsEditing(false);

    }

    return (

        <form
            className="profile-form"
            onSubmit={handleSubmit}
        >

            <div className="form-group">

                <label>

                    Full Name

                </label>

                <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={!isEditing}
                />

            </div>

            <div className="form-group">

                <label>

                    Username

                </label>

                <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={!isEditing}
                />

            </div>

            <div className="form-group">

                <label>

                    Email

                </label>

                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                />

            </div>

            <div className="form-group">

                <label>

                    New Password

                </label>

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Leave blank to keep current password"
                    onChange={handleChange}
                    disabled={!isEditing}
                />

            </div>

            <div className="profile-actions">

                {

                    isEditing

                        ? (

                            <>

                                <Button
                                    key="save"
                                    type="submit"
                                >

                                    Save Changes

                                </Button>

                                <Button
                                    key="cancel"
                                    type="button"
                                    variant="secondary"
                                    onClick={() => setIsEditing(false)}
                                >

                                    Cancel

                                </Button>

                            </>

                        )

                        : (

                            <Button
                                key="edit"
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsEditing(true);
                                }}
                            >

                                Edit Profile

                            </Button>

                        )

                }

            </div>

        </form>

    );

}

export default ProfileForm;