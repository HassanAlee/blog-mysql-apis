const bcryptjs = require("bcryptjs");

const genSalt = async () => {
  return await bcryptjs.genSalt();
};

const hashPassword = async (password, salt) => {
  return await bcryptjs.hash(password, salt);
};

const validatePassword = async (password, hash) => {
  return bcryptjs.compareSync(password, hash);
};
module.exports = { genSalt, hashPassword, validatePassword };
