/**
 * Salaries model.
 * @module salaries
 */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('salaries', {
      emp_no: { type: DataTypes.NUMBER, allowNull: false },
      salary: { type: DataTypes.NUMBER, allowNull: false },
      from_date: { type: DataTypes.DATE, allowNull: false, primaryKey: true },
      to_date: { type: DataTypes.DATE, allowNull: false },
    }, {
      underscored: true,
      freezeTableName: true,
      timestamps: false
    });
  }