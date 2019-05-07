/**
 * Employees model.
 * @module employees
 */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('employees', {
      emp_no: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
      birth_date: { type: DataTypes.DATE, allowNull: false },
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      gender: { type: DataTypes.ENUM(
          'M', 'F'
      ), allowNull: false },
      hire_date: { type: DataTypes.DATE, allowNull: false },
      fired: { type:DataTypes.BOOLEAN, allowNull: true}
    }, {
      underscored: true,
      freezeTableName: true,
      timestamps: false
    });
  }