import express from "express"
import { getMyPublishedSessions, getMySessionById, getMySessions, getPublicSessions, getUserSessionStats, publishSession, saveDraftSession } from "../controllers/sessionController.js";
import auth from "../middlewares/auth.js";

const sessionRouter = express.Router();

sessionRouter.get("/sessions", getPublicSessions);
sessionRouter.get("/my-sessions",auth, getMySessions);
sessionRouter.get("/my-sessions/:id",auth, getMySessionById);
sessionRouter.post("/my-sessions/save-draft",auth, saveDraftSession);
sessionRouter.post("/my-sessions/publish",auth, publishSession);
sessionRouter.get("/sessions/stats",auth, getUserSessionStats);
sessionRouter.get("/sessions/published",auth, getMyPublishedSessions);

export default sessionRouter;