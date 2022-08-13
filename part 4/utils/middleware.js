const jwt = require("jsonwebtoken");
const logger = require("./logger");

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "invalid token" });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Token expired" });
  }

  next(error);
};

const tokenExtractor = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    req.token = token;
  } catch (err) {
    console.log(err);
    res.json({ error: "Invalid token" });
  }

  next();
};

const userExtractor = (req, res, next) => {
  try {
    const token = req.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const id = decodedToken.id;

    req.user = id;
  } catch (err) {
    console.log(err);
    res.json({ error: "Invalid user id " });
  }

  next();
};

// const tokenExtractor = (req,res,next) => {
//   const authorization = req.get("authorization");
//   if (authorization && authorization.toLowerCase().startsWith("bearer")) {
//     req.token = authorization.substring(7);
//   }
// };

// const tokenExtractor = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token, process.env.SECRET);
//     const userId = decodedToken.userId;

//     if (req.body.id && req.body.id !== userId) {
//       throw "Invalid User Id";
//     } else {
//       next();
//     }
//   } catch {
//     res.status(401).json({
//       error: new Error("Invalid request"),
//     });
//   }
// };

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
