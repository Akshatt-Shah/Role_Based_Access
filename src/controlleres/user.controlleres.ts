import { NextFunction, Request, Response } from "express";
import { IUser } from "../interfaces";
import { userservices } from "../services";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import config from "config";
import { NewRequest } from "../middlewares/verify.middleware";
import { User } from "../models";

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
          secretkey,
          {
            expiresIn: "24h",
          }
        );
        const refreshtoken = Jwt.sign(
          {
            id: newuser.data._id,
          },
          secretkey,
          {
            expiresIn: "7d",
          }
        );
        if (token && refreshtoken) {
          newuser.token = token;
          newuser.refreshtoken = refreshtoken;
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

  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshtoken } = req.body;
      if (refreshtoken) {
        const decoded: any = await Jwt.verify(refreshtoken, secretkey);
        console.log(decoded)
        if (decoded) {
          const id = decoded.id;
          const userdata = await User.findOne({ _id: id });
          if (userdata) {
            const token = await Jwt.sign(
              {
                id: userdata._id,
                role: userdata.role,
              },
              secretkey,
              {
                expiresIn: "1m",
              }
            );
            return res.status(200).json({ token: token, status: true });
          } else {
            return res
              .status(401)
              .json({ message: "User not found", status: false });
          }
        } else {
          return res
            .status(401)
            .json({ message: "Invalid refresh token", status: false });
        }
      } else {
        return res
          .status(401)
          .json({ message: "Refresh token is required", status: false });
      }
    } catch (error) {
      if(error.message === "jwt expired"){
        return res
         .status(401)
         .json({ message: "Refresh token has expired please Login", status: false });
      }else{

        res.status(401).json({ error: error.message, status: false });
      }
    }
  }
}
