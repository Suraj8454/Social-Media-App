const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { error, success } = require("../Utils/responseWrapper");

const singupcontroller = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      // return res.status(400).send("all filed are requried");
      return res.send(error(400, "all filed are requried"));
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      // return res.status(409).send("user is always register");
      return res.send(error(409, "user is always register"));
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashpassword,
    });

    // return res.status(201).json({
    //   user,
    // });

    return res.send(success(201, { user }));
  } catch (err) {
    console.log(err);
  }
};

const logincontroller = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      // return res.status(400).send("all filed are requried");
      return res.send(error(400, "all filed are requried"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      // return res.status(404).send("user is always register");
      return res.send(error(404, "user is always register"));
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      // return res.status(400).send("incorrect password");
      return res.send(error(400, "incorrect password"));
    }

    const access = accesstoken({
      _id: user._id,
      email: user.email,
      password: user.password,
    });
    const refresh = refreshtoken({
      _id: user._id,
      email: user.email,
      password: user.password,
    });

    res.cookie("jwt", refresh, {
      httpOnly: true,
      secure: true,
    });
    // return res.json({ access });
    return res.send(success(200, { access }));
  } catch (err) {
    console.log(err);
  }
};

const refreshAccessTokenController = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) {
    // return res.status(401).send('refresh token is cookie is required')
    return res.send(error(401, "refresh token cookie is required"));
  }

  const refresh = cookies.jwt;
  console.log("refreshh", refresh);

  // if (!refresh) {
  //   return res.status(401).send("refresh token requried");
  // }

  try {
    const decode = jwt.verify(refresh, process.env.REFRESH_TOKEN_PRIVATE_KEY);
    const _id = decode._id;
    const accesstoken = refreshtoken({ _id });
    // return res.status(201).send({ accesstoken });
    return res.send(success(201, { accesstoken }));
  } catch (e) {
    console.log(e);
    // return res.status(401).send("invalid refresh token");
    return res.send(error(401, "invalid refresh token"));
  }
};

const accesstoken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "1d",
    });
    console.log(token);
    return token;
  } catch (e) {
    console.log(e);
  }
};

const refreshtoken = (data) => {
  try {
    const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
      expiresIn: "1y",
    });
    console.log(token);
    return token;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  singupcontroller,
  logincontroller,
  refreshAccessTokenController,
};
