import express from "express";

import indexRoutes from "./routes/api/v1/index.routes.js";

const app = express();
app.use("/api/v1", indexRoutes);

export default app;
