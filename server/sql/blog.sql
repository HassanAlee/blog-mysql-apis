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
const getAllBlogsQuery=`
SELECT 
    blogs.id,
    blogs.title AS blog_title,
    blogs.image AS blog_image,
    blogs.description,
    blogs.category,
    users.name AS author_name,
    users.image AS author_image
FROM 
    blogs
JOIN
    users
ON
    users.id=blogs.authorId
;
`;
const getSingleBlogQuery=`
SELECT 
    blogs.id,
    blogs.title AS blog_title,
    blogs.image AS blog_image,
    blogs.description,
    blogs.category,
    DATE(blogs.created),
    users.name AS author_name,
    users.image AS author_image
FROM 
    blogs
JOIN 
    users 
ON 
    users.id = blogs.authorId
WHERE 
    blogs.id = ?;
;
`;
const getAuthorBlogsQuery=`
SELECT blogs.id,blogs.title,blogs.description,blogs.image,blogs.category,DATE_FORMAT(blogs.created, '%Y-%m-%d') AS createdDate,users.name,users.image FROM blogs JOIN users ON blogs.authorId=users.id WHERE blogs.authorId=?;
`;
module.exports={addBlogQuery,getAllBlogsQuery,getSingleBlogQuery,getAuthorBlogsQuery}