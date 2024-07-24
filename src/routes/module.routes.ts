import { Router } from "express";
import { Modulecontrolleres } from "../controlleres";
import { authMiddleware } from "../middlewares/verify.middleware";
import { rbacMiddleware } from "../middlewares/rbac.middleware";
const modulecontrollere = new Modulecontrolleres();
const modulerouter = Router();

modulerouter.post("/module/create",authMiddleware, modulecontrollere.createModule);

modulerouter.get(
  "/module/getallmodule",
  authMiddleware,
  rbacMiddleware(["module", "admin"], "read","module"),
  modulecontrollere.getallModule
);
modulerouter.put(
  "/module/updatemodule/:id",
  authMiddleware,
  rbacMiddleware(["admin"],  "write","module"),
  modulecontrollere.updateModule
);
modulerouter.delete(
  "/module/deletemodule/:id",
  authMiddleware,
  rbacMiddleware(["admin"], "write","module"),
  modulecontrollere.deleteanyModule
);

export { modulerouter };
