/**
 * Departments model.
 * @module departments
 */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('departments', {
      dept_no: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
      dept_name: { type: DataTypes.STRING, allowNull: false },
    }, {
      underscored: true,
      freezeTableName: true,
      timestamps: false
    });
  }