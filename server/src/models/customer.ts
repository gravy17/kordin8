import dbConfig from "../config/db.config";
import { Model, DataTypes, Sequelize } from "sequelize";
import { OrderInstance } from "./order";

export interface CustomerAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export class CustomerInstance extends Model<CustomerAttributes> {
  orders?: OrderInstance[];
}

CustomerInstance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Phone number is required"
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
    sequelize: dbConfig,
    tableName: "Customers"
  }
);

CustomerInstance.hasMany(OrderInstance, {
  foreignKey: "placedBy",
  as: "orders"
});
