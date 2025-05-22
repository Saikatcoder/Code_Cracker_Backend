import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js";
import { executeCode } from "../controller/executeCode.controller.js";

const excutionRoute = express.Router();


excutionRoute.post("/", authMiddleware, executeCode)

export default excutionRoute;


