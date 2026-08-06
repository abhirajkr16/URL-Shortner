import bcrypt from "bcrypt";

import ConflictError from "../errors/ConflictError.js";
import NotFoundError from "../errors/NotFoundError.js";

import {
    getUserProfileById,
    updateUserProfile,
    findUserByEmailExceptId,
    findUserByUsernameExceptId,
} from "../repositories/user.repository.js";

import {
    validateProfileUpdateData,
} from "../validators/profile.validator.js";

export const getProfile = async (userId) => {

    const user = await getUserProfileById(userId);

    if (!user) {
        throw new NotFoundError("User not found");
    }

    return user;

};

export const updateProfile = async (
    userId,
    {
        fullName,
        username,
        email,
        password,
    }
) => {

    validateProfileUpdateData({
        fullName,
        username,
        email,
        password,
    });

    const existingUser = await getUserProfileById(userId);

    if (!existingUser) {
        throw new NotFoundError("User not found");
    }

    const emailExists =
        await findUserByEmailExceptId(
            email,
            userId
        );

    if (emailExists) {
        throw new ConflictError(
            "Email already in use"
        );
    }

    const usernameExists =
        await findUserByUsernameExceptId(
            username,
            userId
        );

    if (usernameExists) {
        throw new ConflictError(
            "Username already taken"
        );
    }

    let passwordHash = null;

    if (password) {

        passwordHash =
            await bcrypt.hash(password, 10);

    }

    await updateUserProfile({

        id: userId,

        fullName,

        username,

        email,

        passwordHash,

    });

    return await getUserProfileById(userId);

};