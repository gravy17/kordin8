import { DataTypes, Model } from "sequelize";
import db from "../config/db.config";

export interface AdminAttributes {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

export class AdminInstance extends Model<AdminAttributes> {}

AdminInstance.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "lastName is required"
        },
        notEmpty: {
          msg: "Please provide the last name of the admin"
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "firstName is required"
        },
        notEmpty: {
          msg: "Please provide the first name of the admin"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "email is required"
        },
        isEmail: {
          msg: "Please provide a valid email for the admin"
        }
      }
    },
    phone: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "address is required"
        },
        notEmpty: {
          msg: "Please provide an address for this admin"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password is required"
        },
        notEmpty: {
          msg: "Please provide a password"
        }
      }
    }
  },
  {
    sequelize: db,
    tableName: "Admins"
  }
);
