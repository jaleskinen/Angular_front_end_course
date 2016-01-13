var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var server = require('../server');

//Define connection attributes for mysql server
var connection = mysql.createConnection({
    
    host: 'localhost',
    user: 'root',
    password: 'Ja11my22',
    database: 'friends_schema',
    multipleStatements: true
});

//Connect to mysql server with given connection attributes
connection.connect(function (err) {
    
    if (err) {
        console.log('could not connect to mysql server: ' + err.message);
    } else {
        
        console.log('Connected to mysql server:database friends_schema!');
    }
});

/*//Call this function to check username and password from mysql database
exports.loginMysql = function (req, res) {
    
    connection.query('SELECT * from user WHERE username = ? and pass = ?', [req.body.username, req.body.password], function (error, results, fields) {
        
        console.log(error);
        console.log(results);
        console.log(fields);
    });
    
};*/

//Call this function to check username and password from mysql database
exports.loginMysqlProc = function (req, res) {
    connection.query('CALL getLoginInfo (?, ?)', [req.body.username, req.body.password], function (error, results, fields) {
        
        if (error) {
           
            res.send(502, {status: error.message});
        } else {
            var test = results[0];
            
            if (test.length > 0) {
                
                req.session.kayttaja = test[0].username;
                //Create the token
                var token = jwt.sign(results, server.secret, {expiresIn: '2h'});
                res.send(200, {status: "Ok", secret: token});
            } else {
                
                res.send(401, {status: "Wrong username or password"});
            }
        }
    });
};

/**
 *This function gets all friends for logged user
 */
exports.getFriendsForUserByUsername = function (req, res) {
    
    connection.query('CALL getFriendsByUsername(?)', [req.session.kayttaja], function (error, results, fields) {
        
        var data = results[0];
        if (results.length > 0) {
        
            res.send(data);
        } else {
            
            res.redirect('/');
        }
    });
};

exports.registerNewUser = function (req, res) {
    console.log('username and password: ' + req.body.username, req.body.password);
    
    connection.query('CALL registerUser(?, ?)', [req.body.username, req.body.password], function (error, results, fields) {
        
        if (error) {
            
            res.status(500).send({status: error.message});
        } else {
            
            res.status(200).send({status: "Ok"});
        }
    });
};


/**
  *This function saves new person information to our friend
  *collection
  */
exports.addNewFriend = function (req, res) {
    
    console.log('req.body.name, req.body.address, req.body.age, req.session.kayttaja: ' + req.body.name + ', ' + req.body.address + ', ' + req.body.age + ',' + req.session.kayttaja);

    connection.query('CALL addNewFriend(?, ?, ?, ?)', [req.body.name, req.body.address, req.body.age, req.session.kayttaja], function (error, results, fields) {
     
        if (error) {

            res.status(500).send({status: "FAIL"});
        } else {

            res.status(200).send({status: "Ok"});
        }
    });
};

//This method updates one person info
exports.updateFriend = function (req, res) {
    
/*    console.log('updateFriend: ' + req.body.name + ',' + req.body.address + ',' + req.body.age + ',' + req.body.id);
    */
    connection.query('CALL updateFriend(?, ?, ?, ?)', [req.body.name, req.body.address, req.body.age, req.body.id], function (error, results, fields) {
     
        if (error) {

            res.status(500).send({status: "FAIL"});
        } else {

            res.status(200).send({status: "Ok"});
        }
    });
};

exports.deleteFriends = function (req, res) {
    var i;
    var toDelete = [];
    if (req.query.forDelete instanceof Array) {
        
        toDelete = req.query.forDelete;
    } else {
        
        toDelete.push(req.query.forDelete);
    }

    var query = "";
    
    for (i = 0; i < toDelete.length; i++) {
        
        query += "CALL deleteFriends(" +  toDelete[i] + ");";
        //query += "DELETE FROM friend WHERE _id=" + toDelete[i] + ";";
    }
    
    //console.log('delete query: ' + query);
    connection.query(query, [], function (error, results, fields) {
        
        if (error) {
     
            res.status(500).send({message: error});
        } else {
            res.status(200).send({message: 'Delete success'});
        }
    });
};

exports.findFriends = function (req, res) {
    var name = req.query.name + "%";
    console.log('req.query.name: ' + req.query.name);
    connection.query('CALL findFriends(?, ?)', [req.query.name, req.session.kayttaja], function (error, results, fields) {
        
        //console.log(results);
        if (results.length > 0) {
            
            var data = results[0];
            res.send(data);
        } else {
            
            res.send([]);
        }
    });
};
