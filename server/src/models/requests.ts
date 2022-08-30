import { DataTypes, Model } from "sequelize";
import db from "../config/db.config";

export interface RequestAttributes {
  id: string;
  user: "admin" | "agent" | "customer";
  requestType: "delete";
  reason?: string;
}

export class RequestInstance extends Model<RequestAttributes> {}

RequestInstance.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "user is required"
        },
        notEmpty: {
          msg: "Please select a type of user (admin, agent, customer)"
        }
      }
    },
    requestType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "requestType is required"
        },
        notEmpty: {
          msg: "Please select a type of request"
        }
      }
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize: db,
    tableName: "Requests"
  }
);
