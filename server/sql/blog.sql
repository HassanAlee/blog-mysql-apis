const blogTableQuery=`
CREATE TABLE blogs(
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(1000) NOT NULL,
description VARCHAR(10000) NOT NULL,
image VARCHAR(100) NOT NULL,
category VARCHAR(50),
created DATETIME DEFAULT NOW(),
UPDATED DATETIME DEFAULT NOW(),
authorId INT,
FOREIGN KEY(authorId) REFERENCES users(id) ON DELETE CASCADE
);
`;
const addBlogQuery=`
INSERT INTO blogs(title,description,image,category,authorId) values (?,?,?,?,?);
`;
module.exports={addBlogQuery}