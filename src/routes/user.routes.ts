import { Router } from "express";
import { usercontrolleres } from "../controlleres";
import { authMiddleware } from "../middlewares/verify.middleware";
import { rbacMiddleware } from "../middlewares/rbac.middleware";
const usercontroller = new usercontrolleres();
const router = Router();

router.post("/user/create", usercontroller.createuser);

router.post("/user/loginuser", usercontroller.loginuser);

router.post("/token/refreshtoken", usercontroller.refreshToken);

router.get(
  "/user/getuser",
  authMiddleware,
  rbacMiddleware(["user", "admin"], "read", "user"),
  usercontroller.getuser
);

router.get(
  "/user/getalluser",
  authMiddleware,
  rbacMiddleware(["admin"], "read", "user"),
  usercontroller.getalluser
);

router.delete(
  "/user/deleteuser/:id",
  authMiddleware,
  rbacMiddleware(["admin"], "write", "user"),
  usercontroller.deleteanyuser
);

export { router };
