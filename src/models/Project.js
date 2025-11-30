import {DataTypes, Model} from 'sequelize';
import sequelize from '../config/database.js';

class Project extends Model {}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    repo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    tags: {
      type: DataTypes.TEXT, // store as JSON stringified array
      allowNull: true,
      get() {
        const raw = this.getDataValue('tags');
        try {
          return raw ? JSON.parse(raw) : [];
        } catch {
          return [];
        }
      },
      set(val) {
        if (Array.isArray(val)) {
          this.setDataValue('tags', JSON.stringify(val));
        } else if (typeof val === 'string') {
          // accept comma-separated string
          this.setDataValue(
            'tags',
            JSON.stringify(val.split(',').map((s) => s.trim()))
          );
        } else {
          this.setDataValue('tags', null);
        }
      },
    },
    cover: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Project',
    tableName: 'projects',
    timestamps: true,
  }
);

export default Project;
