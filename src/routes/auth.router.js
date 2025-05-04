import express from "express"
import { registerUser } from "../controller/auth.controller.js";

const authRoter = express.Router();

authRoter.post("/register",registerUser)

export default authRoter;