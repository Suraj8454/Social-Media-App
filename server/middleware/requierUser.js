const jwt = require("jsonwebtoken");
const { error } = require("../Utils/responseWrapper");

module.exports = async (req, res, next) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    // return res.status(401).send("authincation is required");
    return res.send(error(401, "authincation is required"));
  }

  const accesstoken = req.headers.authorization.split(" ")[1];
    //  console.log(accesstoken);

  try {
    const decode = jwt.verify(
      accesstoken,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );
    req._id = decode._id;
    next();
  } catch (e) {
    console.log(e);
    // return res.status(401).send("invalid access");
    return res.send(error(401, "invalid access"));
  }

  next();
};
