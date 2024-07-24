import { NextFunction, Request, Response } from "express";
import { IPermission } from "../models";
import { Permissionservices } from "../services";
import { NewRequest } from "../middlewares/verify.middleware";
const Permissionservice = new Permissionservices();
export class Permissioncontrolleres {
  async createPermission(req: Request, res: Response, next: NextFunction) {
    try {
      const Permission: IPermission = req.body;
      const newPermission = await Permissionservice.createPermission(Permission);
      res.status(200).json(newPermission);
    } catch (error) {
      res
        .status(error.status)
        .json({ message: error.message, status: error.status });
    }
  }
  async getPermission(req: NewRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const newPermission = await Permissionservice.getPermission(id);
      res.status(200).json(newPermission);
    } catch (error) {
      res
        .status(error.status)
        .json({ message: error.message, status: error.status });
    }
  }
  async getallPermission(req: NewRequest, res: Response, next: NextFunction) {
    try {
      const newPermission = await Permissionservice.getallPermission();
      res.status(200).json(newPermission);
    } catch (error) {
      res
        .status(error.status)
        .json({ message: error.message, status: error.status });
    }
  }
  async updatePermission(req: NewRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data: any = req.body;
      const newPermission = await Permissionservice.updateonePermission(id, data);
      res.status(200).json(newPermission);
    } catch (error) {
      res
        .status(error.status)
        .json({ message: error.message, status: error.status });
    }
  }

  async deleteanyPermission(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const newPermission = await Permissionservice.deleteonePermission(id);
      res.status(200).json(newPermission);
    } catch (error) {
      res
        .status(error.status)
        .json({ message: error.message, status: error.status });
    }
  }
}
