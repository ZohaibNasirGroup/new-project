const jwt = require("jsonwebtoken");
const jwt_secret = "noaccess";

const fetchUser = (req, res, next) => {
  const token = req.header('auth-token'); 
  if (!token) {
    res.status(401).json({ message: "please come with a valid token" });
  }
  try {
    const data = jwt.verify(token, jwt_secret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "please come with a valid token" });
  }
};

module.exports=fetchUser;