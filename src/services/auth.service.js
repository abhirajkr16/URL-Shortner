import bcrypt from "bcrypt";

import ConflictError from "../errors/ConflictError.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";
import NotFoundError from "../errors/NotFoundError.js";

import { validateRegisterData } from "../validators/auth.validator.js";

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
    const userId = await createUser({
        username,
        email,
        passwordHash,
    });

    // Fetch and return the created user
    return findUserById(userId);
};