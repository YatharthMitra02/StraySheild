import { Router } from "express";
import { loginNgo, logoutNgo, registerNgo } from "../controllers/ngo.controller";


const router = Router()

router.route("/register").post(registerNgo)
router.route("/login").post(loginNgo)
router.route("logout").post(logoutNgo)