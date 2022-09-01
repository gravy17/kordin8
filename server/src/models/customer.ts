import { Model, DataTypes } from "sequelize";
import { OrderInstance } from "./order";
import db from "../config/db.config";

export interface CustomerAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export class CustomerInstance extends Model<CustomerAttributes> {
  orders?: OrderInstance[];
}

CustomerInstance.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "FirstName is required"
        },
        notEmpty: {
          msg: "Provide FirstName"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "LastName is required"
        },
        notEmpty: {
          msg: "Provide LastName"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Email is required"
        },
        isEmail: {
          msg: "Provide the valid email"
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "phone is required"
        },
        isNumeric: {
          msg: "Provide the valid phone number"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize: db,
    tableName: "Customers"
  }
);

CustomerInstance.hasMany(OrderInstance, {
  foreignKey: "placedBy",
  as: "orders"
});

OrderInstance.belongsTo(CustomerInstance, {
  foreignKey: "placedBy",
  as: "customer"
});
