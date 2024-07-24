import { Router } from "express";
import { router } from "./user.routes";
import { rolerouter } from "./role.routes";
import { Permissionrouter } from "./permission.routes";
import { modulerouter } from "./module.routes";
const route = Router();

route.use(router);
route.use(rolerouter);
route.use(Permissionrouter);
route.use(modulerouter);

export { route };
