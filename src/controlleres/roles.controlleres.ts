import { NextFunction, Request, Response } from "express";
import { IRole } from "../models";
import { Roleservices } from "../services";
import { NewRequest } from "../middlewares/verify.middleware";
const Roleservice = new Roleservices();
export class Rolecontrolleres {
  async createRole(req: Request, res: Response, next: NextFunction) {
    try {
      const Role: IRole = req.body;
      const newRole = await Roleservice.createRole(Role);
      res.status(200).json(newRole);
    } catch (error) {
      res
        .status(error.status)
        .json({ message: error.message, status: error.status });
    }
  }
  async getRole(req: NewRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const newRole = await Roleservice.getRole(id);
      res.status(200).json(newRole);
    } catch (error) {
      res
        .status(error.status)
        .json({ message: error.message, status: error.status });
    }
  }
  async getallRole(req: NewRequest, res: Response, next: NextFunction) {
    try {
      const newRole = await Roleservice.getallRole();
      res.status(200).json(newRole);
    } catch (error) {
      res
        .status(error.status)
        .json({ message: error.message, status: error.status });
    }
  }
  async updateRole(req: NewRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data: any = req.body;
      const newRole = await Roleservice.updateoneRole(id, data);
      res.status(200).json(newRole);
    } catch (error) {
      res
        .status(error.status)
        .json({ message: error.message, status: error.status });
    }
  }

  async deleteanyRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const newRole = await Roleservice.deleteoneRole(id);
      res.status(200).json(newRole);
    } catch (error) {
      res
        .status(error.status)
        .json({ message: error.message, status: error.status });
    }
  }
}
