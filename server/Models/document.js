'use strict';
module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    roomID: DataTypes.STRING, 
    title: {
      field: 'title',
      type:DataTypes.STRING,
      defaultValue: sequelize.NOW 
    },
    content: DataTypes.STRING,
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
    },
  }, {});
  Document.associate = function(models) {
    // associations can be defined here
  };
  return Document;
};