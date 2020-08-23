import sequelizeConnection from './sequelizeConnection';
import { INTEGER, STRING, DATE, Model, Optional } from 'sequelize';

export interface OccupancyCheckAttributes {
  id: number;
  location: string;
  capacity: number;
  count: number;
  fetched: Date;
}

type OccupancyCheckCreationAttributes = Optional<OccupancyCheckAttributes, 'id'>;

interface OccupancyCheckInstance
  extends Model<OccupancyCheckAttributes, OccupancyCheckCreationAttributes>,
    OccupancyCheckAttributes {}

export const OccupancyCheck = sequelizeConnection.define<OccupancyCheckInstance>(
  'occupancy_check',
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    location: {
      type: STRING,
      allowNull: false,
    },
    capacity: {
      type: INTEGER,
      allowNull: false,
    },
    count: {
      type: INTEGER,
      allowNull: false,
    },
    fetched: {
      type: DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
