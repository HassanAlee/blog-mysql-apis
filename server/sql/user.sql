const userTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    country VARCHAR(50),
    info VARCHAR(1000),
    image VARCHAR(50)
  );
`;

const registerQuery =
  "INSERT INTO users(name,email,password,country,info,image) VALUES (?,?,?,?,?,?)";

const checkUserQuery =
"SELECT * FROM users WHERE email=? OR id=?"

const updateUserQuery=(setClause)=>{
  const q=`UPDATE users SET ${setClause.join(', ')} WHERE id =?`;
  console.log(q);
  return q;
}
module.exports = { registerQuery,checkUserQuery,updateUserQuery };
