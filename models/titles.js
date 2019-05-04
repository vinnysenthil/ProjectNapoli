/**
 * Titles model.
 * @module titles
 */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('titles', {
      emp_no: { type: DataTypes.NUMBER, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
      from_date: { type: DataTypes.DATE, allowNull: false, primaryKey: true },
      to_date: { type: DataTypes.DATE, allowNull: false },
    }, {
      underscored: true,
      freezeTableName: true,
      timestamps: false
    });
  }