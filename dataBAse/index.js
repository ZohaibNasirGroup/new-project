const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("login_portal_connectivity", "root", "", {
  host: "localhost",
  dialect: "mysql",
  pool: { max: 5, min: 0, idle: 10000 },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users")(sequelize, DataTypes);
db.registration =require("./registration-signup")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("table created");
});

module.exports = db;
