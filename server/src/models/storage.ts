import { DataTypes, Model } from "sequelize";
import db from "../config/db.config";

export interface StorageAttributes {
  id: string;
  passport: Blob;
  govtId: Blob;
}

export class StorageInstance extends Model<StorageAttributes> {}

StorageInstance.init(
  {
    id: {
      type: DataTypes.STRING,
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
