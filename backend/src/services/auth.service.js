import bcrypt from "bcrypt";

import ConflictError from "../errors/ConflictError.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";

import {
    validateRegisterData,
    validateLoginData,
} from "../validators/auth.validator.js";

import { generateAccessToken } from "../utils/jwt.js";

import {
    findUserByEmail,
    findUserByUsername,
    createUser,
    findUserById,
} from "../repositories/user.repository.js";

export const registerUser = async ({
    fullName,
    username,
    email,
    password,
}) => {

    // Validate user data
    validateRegisterData({
        fullName,
        username,
        email,
        password,
    });

    // Check if email already exists
    const existingEmail = await findUserByEmail(email);

    if (existingEmail) {
        throw new ConflictError("Email already registered");
    }

    // Check if username already exists
    const existingUsername = await findUserByUsername(username);

    if (existingUsername) {
        throw new ConflictError("Username already taken");
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const userId = await createUser({
        fullName,
        username,
        email,
        passwordHash,
    });

    // Return created user
    return await findUserById(userId);
};

export const loginUser = async ({
    email,
    password,
}) => {

    validateLoginData({
        email,
        password,
    });

    const user = await findUserByEmail(email);

    if (!user) {
        throw new UnauthorizedError("Invalid credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!isPasswordCorrect) {
        throw new UnauthorizedError("Invalid credentials");
    }

    const token = generateAccessToken({
        userId: user.id,
        email: user.email,
    });

    return {
        token,
        user: {
            id: user.id,
            fullName: user.full_name,
            username: user.username,
            email: user.email,
        },
    };
};