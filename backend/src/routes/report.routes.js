import {Router} from "express"
import { createReport,getAllReports,getMyReports } from "../controllers/report.controller.js"
import auth from  "../middleware/authorized.middleware.js";

const router = Router()
router.route("/").get(getAllReports);

router.route("/").post(auth , createReport);

router.route("/mine").get(auth , getMyReports)

export default router;