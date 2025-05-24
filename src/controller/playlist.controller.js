import { db } from "../libs/db.js";
export const createPlaylist = async (req, res) => {
    try {
        const { name, description } = req.body;
        const userId = req.user.id;

        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "Name and description are required."
            });
        }

        const existing = await db.playlist.findFirst({
            where: { name, userId }
        });

        if (existing) {
            return res.status(409).json({
                success: false,
                message: "Playlist already exists."
            });
        }

        const playlists = await db.playlist.create({
            data: {
                name: name.trim(),
                description: description.trim(),
                userId
            }
        });

        res.status(201).json({
            success: true,
            message: "Playlist created successfully",
           playlists
        });
    } catch (error) {
        console.error("Playlist creation error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


export const getAlllistDetails = async (req, res)=>{
    try {
        const playlists = await db.playlist.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                problems: {
                    include: {
                        problem: true
                    }
                }
            }
        });

        if (!playlists || playlists.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No playlists found.",
                playlists: []
            });
        }

        res.status(200).json({
            success: true,
            message: "Playlists fetched successfully",
            playlists
        });

    } catch (error) {
        console.error("Playlist fetch error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const getPlayListDetails = async (req, res) => {
    const playlistId = parseInt(req.params.playlistId);
    if (isNaN(playlistId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid playlist ID"
        });
    }

    try {
        const playlist = await db.playlist.findUnique({
            where: {
                id: playlistId,
                userId: req.user.id
            },
            include: {
                problems: {
                    include: {
                        problem: true
                    }
                }
            }
        });

        if (!playlist) {
            return res.status(404).json({
                success: false,
                message: "Playlist not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Playlist fetched successfully",
            playlist
        });

    } catch (error) {
        console.error("Error fetching playlist details:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const addProblemToPlaylist = async (req, res) => {
    const playlistId = parseInt(req.params.playlistId);
    const { problemIds } = req.body;

    // Validation
    if (isNaN(playlistId)) {
        return res.status(400).json({ success: false, message: "Invalid playlist ID" });
    }

    if (!Array.isArray(problemIds) || problemIds.length === 0) {
        return res.status(400).json({ success: false, message: "Invalid or missing problem IDs" });
    }

    try {
        // Optional: Check if playlist exists and belongs to user
        const playlist = await db.playlist.findUnique({
            where: { id: playlistId },
        });

        if (!playlist || playlist.userId !== req.user.id) {
            return res.status(404).json({ success: false, message: "Playlist not found or access denied" });
        }

        const problemsInPlaylist = await db.problemInPlaylist.createMany({
            data: problemIds.map((problemId) => ({
                playlistId,
                problemId
            })),
        });

        res.status(201).json({
            success: true,
            message: "Problems added to playlist successfully",
            problemsInPlaylist
        });

    } catch (error) {
        console.error("Error adding problems to playlist:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const deletePlaylist = async (req, res) => {
    const playlistId = parseInt(req.params.playlistId);

    if (isNaN(playlistId)) {
        return res.status(400).json({ success: false, message: "Invalid playlist ID" });
    }

    try {
        // Optional: Check ownership
        const existing = await db.playlist.findUnique({
            where: { id: playlistId }
        });

        if (!existing || existing.userId !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Playlist not found or access denied"
            });
        }

        const deletedPlaylist = await db.playlist.delete({
            where: { id: playlistId }
        });

        res.status(200).json({
            success: true,
            message: "Playlist deleted successfully",
            deletedPlaylist
        });

    } catch (error) {
        console.error("Error deleting playlist:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


export const removeProblemFromPlaylist = async (req, res) => {
    const playlistId = parseInt(req.params.playlistId);
    const { problemIds } = req.body;

    // Validate playlistId
    if (isNaN(playlistId)) {
        return res.status(400).json({ success: false, message: "Invalid playlist ID" });
    }

    // Validate problemIds
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
        return res.status(400).json({ success: false, message: "Invalid or missing problem IDs" });
    }

    try {
        const deletedProblems = await db.problemInPlaylist.deleteMany({
            where: {
                playlistId,
                problemId: {
                    in: problemIds
                }
            }
        });

        res.status(200).json({
            success: true,
            message: "Problems removed from playlist successfully",
            deletedCount: deletedProblems.count
        });
    } catch (error) {
        console.error("Error removing problems:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
