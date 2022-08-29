import { DataTypes, DateDataType, Model } from "sequelize";
import db from "../config/db.config";
import { Service } from "../utils/types/service";
import { OrderInstance } from "./order";
import { StorageInstance } from "./storage";

export interface AgentAttributes {
  id: string;
  lastName: string;
  firstName: string;
  bvn: number;
  dob: DateDataType;
  email: string;
  phoneNumber: number;
  address: string;
  govtIdRef: string;
  service: Service;
  maxOrders: number;
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
      type: DataTypes.NUMBER,
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
      type: DataTypes.DATEONLY,
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
    phoneNumber: {
      type: DataTypes.NUMBER,
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
      allowNull: false,
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
      type: DataTypes.NUMBER,
      allowNull: false,
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
  foreignKey: "agentId",
  as: "files"
});

StorageInstance.belongsTo(AgentInstance, {
  foreignKey: "agentId",
  as: "agent"
});
