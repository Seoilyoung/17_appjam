var express = require('express');
var mysql =require('mysql');
var crypto = require('crypto');
var router = express.Router();
var connection =mysql.createConnection({

});


router.post('/login', function(req, res) {
    var text = req.body.PASSWORD;
    var key = 'mysecret key';
    // create hahs
    var hash = crypto.createHmac('sha512', key);
    hash.update(text);
    var value = hash.digest('hex');

    connection.query('select * from userinfo where id=?',[req.body.ID], function(err, rows, fields) {
        if(!err){
            if(rows[0]){
                if(value==rows[0].password){
                    connection.query('update userinfo set ip=? where id=?',[req.ip, req.body.ID], function(err, rows, fields) {
                        if(!err){
                            req.session.login = true;
                            req.session.userid = req.body.ID;
                            res.json([{"result" : "success"}]);//성공적으로 로그인 했을 경우, success 리턴
                            console.log("어플 로그인 성공");
                        }
                        else
                            res.json([{"result" : "DBerror"}]);
                    });
                }
                else
                    res.json([{"result" : "passwdError"}]);
            }
            else
                res.json([{"result" : "noID"}]);
        }
        else
            res.json([{"result" : "DBerror"}]);
    });
});

router.post('/logout',function(req, res) {
    req.session.destroy(function (err) {
        if(!err){
            res.json([{"result" : "success"}]); // 성공적으로 로그아웃 했을 경우 , success 반환
        }
        else
            res.json([{"result" : "DBerror"}]);
    });
});

router.post('/join', function(req, res) {
    var text = req.body.PASSWORD;
    var key = 'mysecret key';

    // create hahs
    var hash = crypto.createHmac('sha512', key);
    hash.update(text);
    var value = hash.digest('hex');

    connection.query('select * from userinfo where id=?', [req.body.ID], function(err, rows1, fields) {
        if(!rows1[0]){
            connection.query('select * from archive_userinfo where id=?', [req.body.ID], function(err, rows2, fields) {
                if(!rows2[0]) {
                    connection.query('insert into userinfo(nickname, id, gender, password) values (?, ?, ?, ?);' , [req.body.NICKNAME, req.body.ID, req.body.GENDER, value], function(err, rows, fields) {
                        if(!err) {
                            res.json([{"result" : "success"}]); 
                            console.log("회원가입 성공");
                        }
                        else {
                            res.json([{"result" : "DBerror"}]);
                        }
                    });
                }
                else {
                    connection.query('select * from archive_userinfo where id=?',[req.body.ID], function(err, rows3, fields) {
                        if(!err) {
                            var user_id = rows3[0].uid ;
                            connection.query('insert into userinfo select * from archive_userinfo where uid=?',[user_id], function(err) {
                                if(!err) {
                                    connection.query('insert into message select * from archive_message where uid=?',[user_id], function(err) {
                                        if(!err) {
                                            connection.query('delete from archive_userinfo where uid=?', [user_id], function(err, rows, fields) {
                                                if(!err) {
                                                    console.log("회원가입 성공(이전 데이터 복원)");
                                                    res.json([{"result" : "success"}]);
                                                }
                                                else {
                                                    res.json([{"result" : "DBerror"}]);
                                                }
                                            });
                                        }
                                        else {
                                            res.json([{"result" : "DBerror"}]);
                                        }
                                    });
                                }
                                else {
                                    res.json([{"result" : "DBerror"}]);
                                }
                            });
                        }
                    });
                }
            });
        }
        else {
            res.json([{"result" : "ExistedID"}]);
        }
    });
});


router.post('/leave',function(req,res){
    connection.query('select * from userinfo where id=?',[req.body.ID], function(err, rows, fields) {
        if(rows[0]) {
            var user_id = rows[0].uid ;
            connection.query('insert into archive_userinfo select * from userinfo where uid=?',[user_id],function(err) {
                if(!err) {
                    connection.query('insert into archive_message select * from message where uid=?',[user_id],function(err) {
                        if(!err) {
                            connection.query('delete from userinfo where uid=?', [user_id], function(err, rows, fields) {
                                if(!err) {
                                    console.log("회원탈퇴 성공");
                                    res.json([{"result" : "success"}]);
                                }
                                else {
                                    res.json([{"result" : "DBerror"}]);
                                }
                            });
                        }
                       else {
                            res.json([{"result" : "DBerror3"}]);
                        }
                    });
                }
                else {
                  res.json([{"result" : "DBerror2"}]);
                }
            });
        }
        else {
            res.json([{"result" : "DBnotExisted"}]);
        }
    });
});


module.exports = router;