import { Router } from "express";
import { userSignup,
    userLogin, 
    userLogOut, 
    getMe} from '../controllers/user.controller.js'
import auth from "../middleware/authorized.middleware.js";

const router = Router()

router.route("/register").post(userSignup)
router.route("/login").post(userLogin)
router.route("/logout").post(auth,userLogOut)
router.route("/me").get(auth, getMe)



export default router;