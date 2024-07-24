import { Permission } from "../models";
import { IPermission } from "../models";

export class Permissionservices {
  async createPermission(data: IPermission) {
    try {
      const newPermission = await Permission.create(data);
      return {
        message: "Permission created successfully",
        data: newPermission,
        status: true,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
  async getPermission(id: string) {
    try {
      const newPermission = await Permission.findOne({ _id: id });
      return {
        message: "Permission retreiwed successfully",
        data: newPermission,
        status: true,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
  async getallPermission() {
    try {
      const newPermission = await Permission.find();
      return {
        message: "Permission retreiwed successfully",
        data: newPermission,
        status: true,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
  async updateonePermission(id: string, data: any) {
    try {
      const newPermission = await Permission.findOneAndUpdate(
        { _id: id },
        data,
        { new: true }
      );
      return {
        message: "Permission Updated successfully",
        data: newPermission,
        status: true,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
  async deleteonePermission(id: string) {
    try {
      const newPermission = await Permission.findByIdAndDelete(id);
      return {
        message: "Permission Deleted successfully",
        data: newPermission,
        status: true,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
}
