const bcryptjs = require("bcryptjs");
const generatePassword = (password) => {
  return bcryptjs.hashSync(password, 10);
};
module.exports = { generatePassword };
