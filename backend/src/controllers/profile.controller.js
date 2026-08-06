import {
    getProfile,
    updateProfile,
} from "../services/profile.service.js";

export const getUserProfile = async (
    req,
    res,
    next,
) => {

    try {

        const profile =
            await getProfile(req.user.id);

        return res.status(200).json({

            success: true,

            data: profile,

        });

    } catch (error) {

        next(error);

    }

};

export const updateUser = async (
    req,
    res,
    next,
) => {

    try {

        const profile =
            await updateProfile(
                req.user.id,
                req.body,
            );

        return res.status(200).json({

            success: true,

            message:
                "Profile updated successfully",

            data: profile,

        });

    } catch (error) {

        next(error);

    }

};