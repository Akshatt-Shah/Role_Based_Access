import { NextFunction, Request, Response } from "express";
import { IModule } from "../models";
import { Moduleservices } from "../services";
import { NewRequest } from "../middlewares/verify.middleware";
const Moduleservice = new Moduleservices();
export class Modulecontrolleres {
  async createModule(req: Request, res: Response, next: NextFunction) {
    try {
      const Module: IModule = req.body;
      const newModule = await Moduleservice.createModule(Module);
      res.status(200).json(newModule);
    } catch (error) {
      res
        .status(error.status)
        .json({ message: error.message, status: error.status });
    }
  }
  async getModule(req: NewRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const newModule = await Moduleservice.getModule(id);
      res.status(200).json(newModule);
    } catch (error) {
      res
        .status(error.status)
        .json({ message: error.message, status: error.status });
    }
  }
  async getallModule(req: NewRequest, res: Response, next: NextFunction) {
    try {
      const newModule = await Moduleservice.getallModule();
      res.status(200).json(newModule);
    } catch (error) {
      res
        .status(error.status)
        .json({ message: error.message, status: error.status });
    }
  }
  async updateModule(req: NewRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data: any = req.body;
      const newModule = await Moduleservice.updateoneModule(id, data);
      res.status(200).json(newModule);
    } catch (error) {
      res
        .status(error.status)
        .json({ message: error.message, status: error.status });
    }
  }

  async deleteanyModule(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const newModule = await Moduleservice.deleteoneModule(id);
      res.status(200).json(newModule);
    } catch (error) {
      res
        .status(error.status)
        .json({ message: error.message, status: error.status });
    }
  }
}
