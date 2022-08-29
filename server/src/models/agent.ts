import { DataTypes, DateDataType, Model } from "sequelize";
import db from "../config/db.config";
import { Service } from "../utils/types/service";
import { OrderInstance } from "./order";
import { StorageInstance } from "./storage";

export interface AgentAttributes {
  id: string;
  lastName: string;
  firstName: string;
  bvn: Number;
  dob?: string;
  email: string;
  phoneNumber: string;
  address?: string;
  govtIdRef?: string;
  service?: Service;
  maxOrders?: Number;
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
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "bvn is required"
        },
        notEmpty: {
          msg: "Please provide your bvn"
        }
      }
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: true,
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
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "phoneNumber is required"
        },
        notEmpty: {
          msg: "Please provide your phone number"
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
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
      allowNull: true,
      validate: {
        notNull: {
          msg: "govtIdRef is required"
        },
        notEmpty: {
          msg: "Please provide the id number of your government issued id"
        }
      }
    },
    service: {
      type: DataTypes.STRING,
      allowNull: true,
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
      allowNull: true,
      defaultValue: 1
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
  foreignKey: "agent"
});

AgentInstance.hasOne(StorageInstance, {
  foreignKey: "id",
  as: "files"
});

StorageInstance.belongsTo(AgentInstance, {
  foreignKey: "id",
  as: "agent"
});
