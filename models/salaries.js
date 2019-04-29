/**
 * Salaries model.
 * @module salaries
 */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('salaries', {
      emp_no: { type: DataTypes.NUMBER, allowNull: false, primaryKey: true },
      salary: { type: DataTypes.NUMBER, allowNull: false },
      from_date: { type: DataTypes.DATE, allowNull: false  },
      to_date: { type: DataTypes.DATE, allowNull: false },
    }, {
      underscored: true,
      freezeTableName: true,
      timestamps: false
    });
  }