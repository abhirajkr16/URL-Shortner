import { Router } from "express";
import { authenticate } from "../../../middleware/auth.middleware.js";
import { getOverview, getAnalytics } from "../../../controllers/analytics.controller.js";

const router = Router();

router.use(authenticate);

router.get("/overview", getOverview);
router.get("/", getOverview);
router.get("/:urlId", getAnalytics);

export default router;