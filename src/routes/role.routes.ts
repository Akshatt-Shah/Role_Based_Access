import { Router } from "express";
import { Rolecontrolleres } from "../controlleres";
import { authMiddleware } from "../middlewares/verify.middleware";
import { rbacMiddleware } from "../middlewares/rbac.middleware";
const Rolecontrollere = new Rolecontrolleres();
const rolerouter = Router();

rolerouter.post("/role/create",authMiddleware,rbacMiddleware(["admin"],"write","role"), Rolecontrollere.createRole);

rolerouter.get(
  "/role/getallrole",
  authMiddleware,
  rbacMiddleware(["role", "admin"],  "read","role"),
  Rolecontrollere.getallRole
);
rolerouter.put(
  "/role/updaterole/:id",
  authMiddleware,
  rbacMiddleware(["admin"],  "write","role"),
  Rolecontrollere.updateRole
);
rolerouter.delete(
  "/role/deleterole/:id",
  authMiddleware,
  rbacMiddleware(["admin"], "write", "role"),
  Rolecontrollere.deleteanyRole
);

export { rolerouter };
