import express from "express";

import indexRoutes from "./routes/api/v1/index.routes.js";
import authRoutes from "./routes/api/v1/auth.routes.js";
import urlRoutes from "./routes/api/v1/url.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import redirectRoutes from "./routes/api/v1/redirect.routes.js";

const app = express();
app.use(express.json());

app.use("/api/v1", indexRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/urls", urlRoutes);
app.use("/api/v1/redirect", redirectRoutes);

app.use(errorMiddleware);

export default app;
