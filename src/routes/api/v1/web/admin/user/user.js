const express = require("express");
const db = require("../../../../../../models/v1");
const { status, } = require("http-status");
const {
  message400,
  message500,
  message200,
} = require("../../../../../../utils/httpResponses");
const authenticate = require("../../../../../../middlewares/v1/adminAuthenticate");

const router = express.Router();

router.post("/", async (req, res) => {
  const inputError = db.sequelize.models
    .user
    .getLoginError(req.body);
  if (false !== inputError) {
    res.status(status.BAD_REQUEST);
    return res.json({ error: inputError, });
  }

  const cleanData = db.sequelize.models
    .user
    .getCleanLoginData(
      req.bodyString("email"),
      req.bodyString("password"),
    );
  if (false === cleanData) {
    res.status(status.BAD_REQUEST);
    return res.json({ error: message400, });
  }

  const emailExists = db.sequelize.models.user
    .emailExists(cleanData.email);
  if (false === emailExists) {
    res.status(status.BAD_REQUEST);
    return res.json({ error: "The email given does not exist in our records.", });
  }
  
  const user = await db.sequelize.models.user
    .getUserByEmail(
      cleanData.email,
    );
  if (false === user) {
    res.status(status.BAD_REQUEST);
    return res.json({ error: "The email is not in our records.", });
  }
  
  if ("admin" !== user.role) {
    res.status(status.BAD_REQUEST);
    return res.json({ error: "You do not have permission to access the admin dashboard.", });
  }
  
  const successLogin = await db.sequelize.models.user
    .loginUser(
      cleanData.password,
      user.password,
      user.passwordSalt,
    );
  if (false === successLogin) {
    res.status(status.BAD_REQUEST);
    return res.json({ error: "The email and password combination did not match.", });
  }

  const authTokenInsert = await db.sequelize.models
    .userToken
    .createAuthToken(user.id);
  if (false === authTokenInsert) {
    res.status(status.BAD_REQUEST);
    return res.json({ error: message500, });
  }

  const authTokenResult = await db.sequelize.models
    .userToken
    .getAuthToken(
      authTokenInsert.authTokenId,
    );
  if (false === authTokenResult) {
    res.status(status.BAD_REQUEST);
    return res.json({ error: message500, });
  }

  await db.sequelize.models.user.updateUserTimestamp(
    user.id,
  );
  
  res.status(status.OK);
  return res.json({
    data: {
      authToken: authTokenResult.token,
      user: db.sequelize.models
        .user
        .getFormattedUserData(user),
    },
  });
});

router.get("/authorize", authenticate, async (req, res) => {
  const userFromAuthToken = await db.sequelize.models.user.getUserByAuthToken(
    req.session.extractedToken,
  );
  if (false === userFromAuthToken) {
    res.status(status.INTERNAL_SERVER_ERROR);
    return res.json({
      error: message500,
    });
  }
  
  if ("admin" !== userFromAuthToken.role) {
    res.status(status.BAD_REQUEST);
    return res.json({ error: "You do not have permission to access the admin dashboard.", });
  }
  
  await db.sequelize.models.user.updateUserTimestamp(
    req.session.userId,
  );
  
  res.status(status.OK);
  return res.json({
    user: db.sequelize.models.user
      .getFormattedUserData(userFromAuthToken),
  });
});

router.delete('/', authenticate, async (req, res) => {
  const user = await db.sequelize.models.user
    .getUserByAuthToken(
      req.session.extractedToken,
    );
  if (false === user) {
    res.status(status.INTERNAL_SERVER_ERROR);
    return res.json({ error: message500, });
  }
  
  if ("admin" !== user.role) {
    res.status(status.BAD_REQUEST);
    return res.json({ error: "You do not have permission to access the admin dashboard.", });
  }
  
  const logoutUser = db.sequelize.models.userToken.logoutUser(
    user.id,
    req.session.extractedToken,
  );
  if (false === logoutUser) {
    res.status(status.INTERNAL_SERVER_ERROR);
    return res.json({
      error: message500,
    });
  }
  
  await db.sequelize.models.user.updateUserTimestamp(
    req.session.userId,
  );

  res.status(status.OK);
  return res.json({
    message: message200,
  });
});

module.exports = router;