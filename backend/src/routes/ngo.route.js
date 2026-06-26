import { Router } from "express";
import { getAllNgos, createNgo } from "../controllers/ngo.controller.js";
import auth from "../middleware/authorized.middleware.js";
import roleGuard from "../middleware/roleGuard.middleware.js";


const router = Router()

router.route("/")
.get(getAllNgos)
.post(auth, roleGuard("NGO"), createNgo)

export default router;

