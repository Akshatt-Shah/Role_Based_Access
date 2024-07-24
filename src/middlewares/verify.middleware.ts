import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import config from "config";

const secretkey = String(config.get("SecretKey"));
// roleMiddleware.js
const { roles } = require("../models/roles.model");

export interface NewRequest extends Request {
  user?: any;
}

const authMiddleware = async (
  req: NewRequest,
  res: Response,
  next: NextFunction
) => {
  // console.log(req.headers.authorization)
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = Jwt.verify(token, secretkey);
    req.user = decoded;
    // console.log(req.user);
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
const checkPermission = (role: string, action: string) => {
  return (req: NewRequest, res: Response, next: NextFunction) => {
    const userRole = req.user.role; // Assume req.user is populated with the user's data
    if (role === userRole) {
      if (roles[userRole] && roles[userRole].permissions.includes(action)) {
        return next();
      } else {
        return res.status(403).json({
          message: "You do not have permission to access this route!",
        });
      }
    }

    return res.status(403).json({ message: "Forbidden" });
  };
};

export { authMiddleware, checkPermission };
