import { DataTypes, Model } from "sequelize";
import db from "../config/db.config";
import { Service } from "../utils/types/service";
import { OrderInstance } from "./order";

export interface AgentAttributes {
  id: string;
  lastName: string;
  firstName: string;
  bvn?: number;
  dob: string;
  email: string;
  phone: string;
  address: string;
  govtIdRef?: string;
  service: Service;
  maxOrders?: number;
  password: string;
}

export class AgentInstance extends Model<AgentAttributes> {
  orders?: OrderInstance[];
}

AgentInstance.init(
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
          msg: "Please provide your last name"
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
          msg: "Please provide your first name"
        }
      }
    },
    bvn: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "dob is required"
        },
        notEmpty: {
          msg: "Please provide a valid date of birth"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "email is required"
        },
        notEmpty: {
          msg: "Please provide a valid email address"
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "phone is required"
        },
        notEmpty: {
          msg: "Please provide your phone number"
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "address is required"
        },
        notEmpty: {
          msg: "Please provide your address"
        }
      }
    },
    govtIdRef: {
      type: DataTypes.STRING,
      allowNull: true
    },
    service: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "service is required"
        },
        notEmpty: {
          msg: "Please select a service you want to provide"
        }
      }
    },
    maxOrders: {
      type: DataTypes.INTEGER,
      defaultValue: 1
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
    tableName: "Agents"
  }
);

AgentInstance.hasMany(OrderInstance, {
  foreignKey: "agent",
  as: "orders"
});

OrderInstance.belongsTo(AgentInstance, {
  foreignKey: "agent",
  as: "assignedAgent"
});
