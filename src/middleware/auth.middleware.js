import { verifyAccessToken } from "../utils/jwt.js";

import UnauthorizedError from "../errors/UnauthorizedError.js";

import { findUserById } from "../repositories/user.repository.js";

export const authenticate = async (req, res, next) => {
    try {

        // authHeader = "Bearer eyJhbGciOiJIUzI1NiIs..."
        //                ↑       ↑
        //              scheme   token

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedError(
                "Authentication token is missing"
            );
        }

        const [scheme, token] = authHeader.split(" ");

        if (scheme !== "Bearer" || !token) {
            throw new UnauthorizedError(
                "Invalid authorization header format"
            );
        }

        const payload = verifyAccessToken(token);

        const user = await findUserById(payload.userId);

        if (!user) {
            throw new UnauthorizedError(
                "User no longer exists"
            );
        }

        req.user = user;

        next();

    } catch (error) {
        next(error);
    }
};