import { NextFunction, Request, Response } from "express";
import { IUser } from "../interfaces";
import { userservices } from "../services";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import config from "config";
import { NewRequest } from "../middlewares/verify.middleware";

const secretkey = String(config.get("SecretKey"));
const userservice = new userservices();
export class usercontrolleres {
  async createuser(req: Request, res: Response, next: NextFunction) {
    try {
      let user: IUser = req.body;
      user.password = await bcrypt.hash(user.password, 10);
      const newuser = await userservice.createuser(user);
      res.status(200).json(newuser);
    } catch (error) {
      res
        .status(error.status)
        .json({ message: error.message, status: error.status });
    }
  }
  async getuser(req: NewRequest, res: Response, next: NextFunction) {
    try {
      const id = req.user.id;
      const newuser = await userservice.getuser(id);
      res.status(200).json(newuser);
    } catch (error) {
      res
        .status(error.status)
        .json({ message: error.message, status: error.status });
    }
  }
  async getalluser(req: NewRequest, res: Response, next: NextFunction) {
    try {
      const newuser = await userservice.getalluser();
      res.status(200).json(newuser);
    } catch (error) {
      res
        .status(error.status)
        .json({ message: error.message, status: error.status });
    }
  }
  async updateuser(req: NewRequest, res: Response, next: NextFunction) {
    try {
      const id = req.user.id;
      const data = req.body;
      const newuser = await userservice.updateoneuser(id, data);
      res.status(200).json(newuser);
    } catch (error) {
      res
        .status(error.status)
        .json({ message: error.message, status: error.status });
    }
  }
  async deleteuser(req: NewRequest, res: Response, next: NextFunction) {
    try {
      const id = req.user.id;
      const newuser = await userservice.deleteoneuser(id);
      res.status(200).json(newuser);
    } catch (error) {
      res
        .status(error.status)
        .json({ message: error.message, status: error.status });
    }
  }
  async deleteanyuser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const newuser = await userservice.deleteanyuser(id);
      res.status(200).json(newuser);
    } catch (error) {
      res
        .status(error.status)
        .json({ message: error.message, status: error.status });
    }
  }
  async loginuser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      let newuser: any = await userservice.loginuser(email);
      if (newuser.data) {
        const token = Jwt.sign(
          {
            id: newuser.data._id,
            role: newuser.data.role,
          },
          secretkey
        );
        if (token) {
          newuser.token = token;
          res.status(200).json(newuser);
        } else {
          res.status(500).json({ message: "Error generating token" });
        }
      } else {
        res.status(401).json({ message: "User not found" });
      }
    } catch (error) {
      res
        .status(error.status)
        .json({ message: error.message, status: error.status });
    }
  }
}
