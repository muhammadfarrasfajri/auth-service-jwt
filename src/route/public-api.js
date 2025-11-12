import express from "express";
import Auth from "../controller/auth-controller.js";

const publicUser = express.Router();
publicUser.post("/api/auth/register", Auth.register);
publicUser.post("/api/auth/login", Auth.login);

export { publicUser };
