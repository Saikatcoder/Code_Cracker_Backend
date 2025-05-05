import express from "express"
import { check, login, logout, registerUser } from "../controller/auth.controller.js";

const authRotes = express.Router();

authRotes.post("/register",registerUser)

authRotes.post("/login",login)

authRotes.post("/logout",logout)

authRotes.get("/get",check)

export default authRotes;