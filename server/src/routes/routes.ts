import express from "express";
import { editUser, login, register } from "../controllers/auth";
import { authMiddleware } from "../middlewares/auth";
import { addVideo, getVideoFeed, getVideosByUserId } from "../controllers/video";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/editUser", authMiddleware, editUser);
router.post("/uploadVideo", authMiddleware, addVideo);
router.get("/videoFeed", getVideoFeed);
router.get("/videos", getVideosByUserId);
export default router;
