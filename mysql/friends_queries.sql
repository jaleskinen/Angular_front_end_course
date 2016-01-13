SELECT * FROM user;

SELECT username FROM user order by username;

SELECT user_id FROM user WHERE username="jarmo";

SELECT username,pass FROM user;

SELECT * FROM user WHERE username="jarmo";

SELECT * FROM user WHERE username="jarmo" and pass="jarmo";

SELECT * FROM friend WHERE name LIKE '%ei%'

SELECT * FROM friend;

SELECT user.username, friend.friend_name, friend.address, friend.age 
FROM user INNER JOIN friend on user.user_id=friend.user_id WHERE user.username="jarmo";

/*Call procedure. This will get all users from user table*/
CALL getAllUsers();

/*Call procedure. This will get user logininfo from user table*/
CALL getLoginInfo("jarmo","jarmo");

/*Call procedure. This will get friends by username from friend table*/
CALL getFriendsByUsername("jarmo");

/*Call procedure. This will get friends by user_id from friend table*/
CALL getFriendsByUserId(3);

/*Call procedure. This will get friends by user_id from friend table*/
CALL registerUser("aaaa","aaaa");

/*Call procedure. This will add new friends*/
CALL addNewFriend("Friend 3","Friendstreet 3", "33", "jarmo");

/*Call procedure. This will add new friends*/
CALL getUserId("aaa");

/*Call procedure. This will update friends*/
CALL updateFriend("Friend 2","Friendstreet 2", "222", 1);

/*Call procedure. This will delete friends*/
CALL deleteFriends(7);