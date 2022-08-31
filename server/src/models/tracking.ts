import { DataTypes, Model } from "sequelize";
import db from "../config/db.config";

interface TrackingAttributes {
  id: string;
  orderId: string;
  name?: string;
  phone?: string;
  email?: string;
}

export class TrackingInstance extends Model<TrackingAttributes> {}

TrackingInstance.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "orderId is required"
        },
        notEmpty: {
          msg: "Please provide an Order Id"
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize: db,
    tableName: "Trackers"
  }
);
