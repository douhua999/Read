SET NAMES UTF8;
DROP DATABASE IF EXISTS ds;
CREATE DATABASE ds CHARSET=UTF8;
USE ds;
CREATE TABLE ds_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR
(32),
  upwd VARCHAR
(32),
  email VARCHAR
(32),
  phone CHAR
(11),
  address VARCHAR
(128),
  user_name VARCHAR
(8),
  sex BOOL #1男 0女
);
INSERT INTO ds_user
VALUES
  (1, "doudou", md5('123456'), '1148484027@qq.com', 17328310873, 'GD', 'cpj', 1),
  (2, "huahua", md5('654321'), '1148484027@qq.com', 17328310873, 'GD', 'cpj', 0);
 
CREATE TABLE ds_product(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  ptype VARCHAR
(16),
  pname VARCHAR
(16),
  price DECIMAL
(10,2),
  pic VARCHAR
(32),
details VARCHAR
(256)
);
INSERT INTO  ds_product
VALUES
  (null, "青春", "掌控", "22.90", "cover1.jpg", "掌控焦虑的人生"),
  (null, "青春", "我离婚了", "18.88", "cover2.jpg", "我终于离婚了"),
  (null, "青春", "漫画唐诗", "28.99", "cover3.jpg", "半小时：漫画唐诗"),
  (null, "青春", "事实", "22.80", "cover4.jpg", "用数据思考"),
  (null, "青春", "陷阱", "28.50", "cover5.jpg", "性格的陷阱"),
  (null, "青春", "情商", "35.60", "cover6.jpg", "新情商"),
  (null, "青春", "乒乓球", "44.50", "cover7.jpg", "教你打乒乓球"),
  (null, "青春", "人脉", "4.5", "cover8.jpg", "超级人脉术"),
  (null, "哲学", "人脉", "4.5", "cover8.jpg", "超级人脉术"),
  (null, "哲学", "乒乓球", "44.50", "cover7.jpg", "教你打乒乓球"),
  (null, "哲学", "情商", "35.60", "cover6.jpg", "新情商"),
  (null, "哲学", "陷阱", "28.50", "cover5.jpg", "性格的陷阱"),
  (null, "哲学", "事实", "22.80", "cover4.jpg", "用数据思考"),
  (null, "哲学", "掌控", "22.90", "cover1.jpg", "掌控焦虑的人生"),
  (null, "哲学", "漫画唐诗", "28.99", "cover3.jpg", "半小时：漫画唐诗"),
  (null, "哲学", "我离婚了", "18.88", "cover2.jpg", "我终于离婚了"),
  (null, "投资", "父子", "28.89", "cover9.jpg","如父如子"),
  (null, "投资", "前进", "20.5", "cover10.jpg","步履不停"),
  (null, "投资", "人脉", "4.5", "cover8.jpg", "超级人脉术"),
  (null, "投资", "乒乓球", "44.50", "cover7.jpg", "教你打乒乓球"),
  (null, "投资", "掌控", "22.90", "cover1.jpg", "掌控焦虑的人生"),
  (null, "投资", "漫画唐诗", "28.99", "cover3.jpg", "半小时：漫画唐诗"),
  (null, "投资", "陷阱", "28.50", "cover5.jpg", "性格的陷阱"),
  (null, "投资", "事实", "22.80", "cover4.jpg", "用数据思考");
  
-- 购物车
CREATE TABLE ds_cart(
 cid INT PRIMARY KEY AUTO_INCREMENT,
 img VARCHAR
(255),
 uid INT,
 pid INT,
 count INT,
 price DECIMAL
(10,2)
);
INSERT INTO ds_cart
VALUES
(null, 'cover1.jpg',1,1,1,1.5),
(null, 'cover2.jpg',1,2,2,2.5),
(null, 'cover3.jpg',1,12,3,4.5),
(null, 'cover4.jpg',1,17,1,8.5),
(null, 'cover5.jpg',1,1,1,1.5),
(null, 'cover6.jpg',1,2,2,2.5),
(null, 'cover7.jpg',1,12,3,4.5),
(null, 'cover8.jpg',1,17,1,8.5),
(null, 'cover9.jpg',2,1,1,1.5),
(null, 'cover10.jpg',2,2,2,2.5),
(null, 'cover1.jpg',2,12,3,4.5),
(null, 'cover2.jpg',2,17,1,8.5),
(null, 'cover3.jpg',2,1,1,1.5),
(null, 'cover4.jpg',2,2,2,2.5),
(null, 'cover5.jpg',2,12,3,4.5),
(null, 'cover6.jpg',2,17,1,8.5);

