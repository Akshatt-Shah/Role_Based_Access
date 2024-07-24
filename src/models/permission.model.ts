import mongoose, { Schema } from "mongoose";
import { Module } from "./module.model";
import { Role } from "./roles.model";

export interface IPermission {
  moduleId: mongoose.Types.ObjectId;
  roleId: mongoose.Types.ObjectId;
  read: boolean;
  write: boolean;
}

const permissionSchema = new mongoose.Schema(
  {
    moduleId: {
      type: Schema.Types.ObjectId,
      ref: Module,
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: Role,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },

    write: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Permission = mongoose.model<IPermission>("Permission", permissionSchema);

export { Permission };
