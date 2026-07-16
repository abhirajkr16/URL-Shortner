import bcrypt from "bcrypt";

import ConflictError from "../errors/ConflictError.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";
import NotFoundError from "../errors/NotFoundError.js";

import { validateRegisterData } from "../validators/auth.validator.js";
import { generateAccessToken } from "../utils/jwt.js";
import { validateLoginData } from "../validators/auth.validator.js";

import {
    findUserByEmail,
    findUserByUsername,
    createUser,
    findUserById,
} from "../repositories/user.repository.js";

export const registerUser = async ({
    username,
    email,
    password,
}) => {
    validateRegisterData({ username, email, password });

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

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create the user
    const userId = await creatteUser({
        username,
        email,
        passwordHash,
    });

    // Fetch and return the created user
    return findUserById(userId);
};

export const loginUser = async ({ email, password }) => {
    validateLoginData({ email, password });
    const user = await findUserByEmail(email);
    if (!user) {
        throw new UnauthorizedError("Invalid credentials");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordCorrect) {
        throw new UnauthorizedError("Invalid credentials");
    }
    const token = generateAccessToken({ userId: user.id, email: user.email });
    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        },
    };



}
