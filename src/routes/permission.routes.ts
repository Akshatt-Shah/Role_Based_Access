import { Router } from "express";
import { Permissioncontrolleres } from "../controlleres";
import { authMiddleware } from "../middlewares/verify.middleware";
import { rbacMiddleware } from "../middlewares/rbac.middleware";
const Permissioncontrollere = new Permissioncontrolleres();
const Permissionrouter = Router();

Permissionrouter.post("/Permission/create",authMiddleware, Permissioncontrollere.createPermission);

Permissionrouter.get(
  "/permission/getallpermission",
  authMiddleware,
  rbacMiddleware(["user", "admin"],  "read","Permission"),
  Permissioncontrollere.getallPermission
);
Permissionrouter.put(
  "/permission/updatePermission/:id",
  authMiddleware,
  rbacMiddleware(["admin","user"], "write", "Permission"),
  Permissioncontrollere.updatePermission
);
Permissionrouter.delete(
  "/permission/deletePermission/:id",
  authMiddleware,
  rbacMiddleware(["admin"],  "write","Permission"),
  Permissioncontrollere.deleteanyPermission
);

export { Permissionrouter };
