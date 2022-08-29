import { DataTypes, Model } from "sequelize";
import db from "../config/db.config";
import { OrderInstance } from "./order";

interface BaseTrackingAttributes {
  id: string;
  orderId: string;
  name?: string;
  phone?: string;
  email?: string;
}

interface PhoneTrackingAttributes extends BaseTrackingAttributes {
  phone: string;
}

interface EmailTrackingAttributes extends BaseTrackingAttributes {
  email: string;
}

export type TrackingAttributes = BaseTrackingAttributes &
  (EmailTrackingAttributes | PhoneTrackingAttributes);

export class TrackingInstance extends Model<TrackingAttributes> {}

TrackingInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    orderId: {
      type: DataTypes.UUIDV4,
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

TrackingInstance.belongsTo(OrderInstance, {
  foreignKey: "orderId",
  as: "order"
});