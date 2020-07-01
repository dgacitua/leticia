// Adapted from https://bezkoder.com/node-js-mongodb-auth-jwt/

export const allAccess = (req, res) => {
  res.status(200).send("Public Content");
};

export const userBoard = (req, res) => {
  res.status(200).send("User Content");
};

export const adminBoard = (req, res) => {
  res.status(200).send("Admin Content");
};