import express from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js';
import { addProblemToPlaylist, createPlaylist, deletePlaylist, getAlllistDetails, getPlayListDetails, removeProblemFromPlaylist } from '../controller/playlist.controller.js';

const playlistRoutes = express.Router()

playlistRoutes.get("/", authMiddleware,getAlllistDetails);
playlistRoutes.get("/:playlistId",authMiddleware,getPlayListDetails);
playlistRoutes.post("/create-playlist",authMiddleware ,createPlaylist);
playlistRoutes.post("/:playlistId/add-problem",authMiddleware, addProblemToPlaylist);
playlistRoutes.delete("/:playlistId",authMiddleware,deletePlaylist)
playlistRoutes.delete("/:playlistId/remove-problem",authMiddleware,removeProblemFromPlaylist);

export default playlistRoutes;