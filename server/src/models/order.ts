import { DataTypes, Model } from "sequelize";
import db from "../config/db.config";
import { Service } from "../utils/types/service";
import { Status } from "../utils/types/status";
import { TrackingInstance } from "./tracking";

export interface OrderAttributes {
  id: string;
  orderType: Service;
  placedBy: string;
  recipient?: string;
  description?: string;
  price: number;
  status: Status;
  agent?: string | null;
}

export class OrderInstance extends Model<OrderAttributes> {}

OrderInstance.init(
  {
    id: {
      type: DataTypes.STRING,
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
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Pending"
    },
    agent: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize: db,
    tableName: "Orders"
  }
);

OrderInstance.hasMany(TrackingInstance, {
  foreignKey: "orderId",
  as: "trackers"
});

TrackingInstance.belongsTo(OrderInstance, {
  foreignKey: "orderId",
  as: "order"
});
