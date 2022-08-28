import { DataTypes, Model } from "sequelize";
import db from "../config/db.config";
import { AgentInstance } from "./agent";

export interface StorageAttributes {
  agentId: string;
  passport: Blob;
  govtId: Blob;
}

export class StorageInstance extends Model<StorageAttributes> {}

StorageInstance.init(
  {
    agentId: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    passport: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    govtId: {
      type: DataTypes.BLOB,
      allowNull: false
    }
  },
  {
    sequelize: db,
    tableName: "Storage"
  }
);

StorageInstance.belongsTo(AgentInstance, {
  foreignKey: "agentId",
  onDelete: "CASCADE",
  as: "agent"
});
