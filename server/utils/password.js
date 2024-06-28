const bcryptjs = require("bcryptjs");
const generatePassword = (password) => {
  return bcryptjs.hashSync(password, 10);
};
const checkPassword = (password, userPassword) => {
  return bcryptjs.compareSync(userPassword, password);
};
module.exports = { generatePassword, checkPassword };
