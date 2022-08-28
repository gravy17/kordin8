import { DataTypes, Model } from "sequelize";
import db from "../config/db.config";
import { Service } from "../utils/types/service";
import { Status } from "../utils/types/status";
import { AgentInstance } from "./agent";
import { CustomerInstance } from "./customer";
import { TrackingInstance } from "./tracking";

export interface OrderAttributes {
  id: string;
  orderType: Service;
  placedBy: string;
  recipient?: string;
  description?: string;
  price: number;
  status: Status;
}

export class OrderInstance extends Model<OrderAttributes> {
  agent?: string;
}

OrderInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    orderType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Type is required"
        },
        notEmpty: {
          msg: "Please select a type"
        }
      }
    },
    placedBy: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Type is required"
        },
        notEmpty: {
          msg: "Please select a type"
        }
      }
    },
    recipient: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Pending"
    }
  },
  {
    sequelize: db,
    tableName: "Orders"
  }
);

OrderInstance.belongsTo(AgentInstance, {
  foreignKey: "agent"
});

OrderInstance.belongsTo(CustomerInstance, {
  foreignKey: "placedBy"
});

OrderInstance.hasMany(TrackingInstance, {
  foreignKey: "orderId",
  as: "trackers"
});
