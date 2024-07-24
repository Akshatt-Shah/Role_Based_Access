import { User } from "../models";
import { IUser } from "../interfaces";
import { Request, Response } from "express";

export class userservices {
  async createuser(user: IUser) {
    try {
      const newUser =await User.create(user);
      return {
        message: "User created successfully",
        data: newUser,
        status: true,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
  async getuser(id: string) {
    try {
      const newUser =await User.findOne({ _id: id });
      return {
        message: "User retreiwed successfully",
        data: newUser,
        status: true,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
  async getalluser() {
    try {
      const newUser =await User.find();
      return {
        message: "User retreiwed successfully",
        data: newUser,
        status: true,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
  async updateoneuser(id: string, data: any) {
    try {
      const newUser =await User.findOneAndUpdate({ _id: id }, data, { new: true });
      return {
        message: "User Updated successfully",
        data: newUser,
        status: true,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
  async deleteoneuser(id: string) {
    try {
      const newUser =await User.findByIdAndDelete(id);
      return {
        message: "User Deleted successfully",
        data: newUser,
        status: true,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
  async deleteanyuser(id: string) {
    try {
      const newUser =await User.findByIdAndDelete(id);
      return {
        message: "User Deleted successfully",
        data: newUser,
        status: true,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }

  async loginuser(email: string) {
    try {
      const newUser =await User.findOne({ email: email });
      return {
        message: "User retreiwed successfully",
        data: newUser,
        status: true,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
}
