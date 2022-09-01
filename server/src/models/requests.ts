import { DataTypes, Model } from "sequelize";
import db from "../config/db.config";

export interface RequestAttributes {
  id: string;
  user?: "admin" | "agent" | "customer";
  requestType: "delete" | "cancel";
  reason?: string;
  order?: boolean;
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
      allowNull: true
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
    },
    order: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize: db,
    tableName: "Requests"
  }
);
