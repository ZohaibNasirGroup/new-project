
module.exports=(sequelize, DataTypes)=>{
    const Registration = sequelize.define('registration', {
      // Model attributes are defined here
      firstname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING
        // allowNull defaults to true
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      // Other model options go here
    });
    
    return Registration;
    }