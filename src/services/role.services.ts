import { Role } from "../models";
import { IRole } from "../models";
import { Request, Response } from "express";

export class Roleservices {
  async createRole(data: IRole) {
    try {
      const newRole = await Role.create(data);
      return {
        message: "Role created successfully",
        data: newRole,
        status: true,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
  async getRole(id: string) {
    try {
      const newRole = await Role.findOne({ _id: id });
      return {
        message: "Role retreiwed successfully",
        data: newRole,
        status: true,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
  async getallRole() {
    try {
      const newRole = await Role.find();
      return {
        message: "Role retreiwed successfully",
        data: newRole,
        status: true,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
  async updateoneRole(id: string, data: any) {
    try {
      const newRole = await Role.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
      return {
        message: "Role Updated successfully",
        data: newRole,
        status: true,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
  async deleteoneRole(id: string) {
    try {
      const newRole = await Role.findByIdAndDelete(id);
      return {
        message: "Role Deleted successfully",
        data: newRole,
        status: true,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
}
