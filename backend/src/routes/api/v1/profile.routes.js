import { Router } from "express";

import {
    getUserProfile,
    updateUser,
} from "../../../controllers/profile.controller.js";

import { authenticate } from "../../../middleware/auth.middleware.js";

const router = Router();

router.get(
    "/",
    authenticate,
    getUserProfile
);

router.put(
    "/",
    authenticate,
    updateUser
);

export default router;