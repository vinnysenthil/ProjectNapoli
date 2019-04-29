/**
 * Titles model.
 * @module titles
 */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('titles', {
      emp_no: { type: DataTypes.NUMBER, allowNull: false, primaryKey: true },
      title: { type: DataTypes.STRING, allowNull: false  },
      from_date: { type: DataTypes.DATE, allowNull: false },
      to_date: { type: DataTypes.DATE, allowNull: false },
    }, {
      underscored: true,
      freezeTableName: true,
      timestamps: false
    });
  }