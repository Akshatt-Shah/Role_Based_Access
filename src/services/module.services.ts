import { Module } from "../models";
import { IModule } from "../models";
import { Request, Response } from "express";

export class Moduleservices {
  async createModule(data: IModule) {
    try {
      const newModule = await Module.create(data);
      return {
        message: "Module created successfully",
        data: newModule,
        status: true,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
  async getModule(id: string) {
    try {
      const newModule = await Module.findOne({ _id: id });
      return {
        message: "Module retreiwed successfully",
        data: newModule,
        status: true,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
  async getallModule() {
    try {
      const newModule = await Module.find();
      return {
        message: "Module retreiwed successfully",
        data: newModule,
        status: true,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
  async updateoneModule(id: string, data: any) {
    try {
      const newModule = await Module.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
      return {
        message: "Module Updated successfully",
        data: newModule,
        status: true,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
  async deleteoneModule(id: string) {
    try {
      const newModule = await Module.findByIdAndDelete(id);
      return {
        message: "Module Deleted successfully",
        data: newModule,
        status: true,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
}
