/**
 * DeptManager model.
 * @module dept_manager
 */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('dept_manager', {
      dept_no: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
      emp_no: { type: DataTypes.NUMBER, allowNull: false, primaryKey: true },
      from_date: { type: DataTypes.DATE, allowNull: false  },
      to_date: { type: DataTypes.DATE, allowNull: false },
    }, {
      underscored: true,
      freezeTableName: true,
      timestamps: false
    });
  }