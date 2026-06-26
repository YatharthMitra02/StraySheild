import {Router} from 'express'
import {getAllReels, UploadReel} from from "../controllers/reel.controller.js";
import auth from "../middleware/authorized.middleware.js";
import roleGuard from "../middleware/roleGuard.middleware.js"

const router = Router();
router.route("/")
.get(getAllReels);
.post(auth, roleGuard("NG0"), UploadReel);

const export router;