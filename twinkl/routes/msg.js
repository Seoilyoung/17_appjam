var express = require('express');
var mysql =require('mysql');
var router = express.Router();
var connection =mysql.createConnection({

});

router.get('/:ID',function(req, res) {
	var ID = req.params.ID ;
	connection.query('select * from userinfo where id=?',[ID], function(err, rows, fields) {
        if(!err) {
            var user_id = rows[0].uid ;
            connection.query('select * from message where uid=?', [user_id], function(err, rows, fields) {
                if(rows[0]) {
                    res.json([{"result" : "DBexist"}]);		// 사용자의 메세지 DB가 있는 경우 
                }
                else {
                    res.json([{"result" : "DBnotexist"}]);	// 사용자의 메세지 DB가 없는 경우
                }
            });
        }
        else {
            res.json([{"result" : "DBerror"}]);
        }
	});
});

router.post('/list',function(req, res) {
   connection.query('select * from userinfo where id=?',[req.body.ID], function(err, rows, fields) {
        if(!err) {
            var user_id = rows[0].uid ;
            console.log(user_id);
            connection.query('select * from message where uid=? and date_format(date, "%Y")=? and date_format(date, "%m")=?', [user_id, req.body.YEAR, req.body.MONTH], function(err, query, fields) {
                if(!err) {
                    res.json(query);                   // 해당 ID의 월별 메세지 리스트 출력
                }
                else {
                    res.json([{"result" : "DBerror"}]);   // 두번째 쿼리문 에러
                }
            })       
        }
        else {
            res.json([{"result" : "DBerror"}]);           // 첫번째 쿼리문 에러
        }
   })
})

router.get('/:ID/list/:YEAR/:MONTH',function(req, res) {
	var ID = req.params.ID ;
    var YEAR = req.params.YEAR ;
    var MONTH = req.params.MONTH ;
	connection.query('select * from userinfo where id=?',[ID], function(err, rows, fields) {
        if(!err) {
            var user_id = rows[0].uid ;
            connection.query('select * from message where uid=? and date_format(date, "%Y")=? and date_format(date, "%m")=?', [user_id, YEAR, MONTH], function(err, rows, fields) {
                if(!err) {
                    res.json(rows);		             // 해당 ID의 월별 메세지 리스트 출력
                }
                else {
                    res.json([{"result" : "DBerror"}]);	// 두번째 쿼리문 에러
                }
            });
        }
        else {
            res.json([{"result" : "DBerror"}]);           // 첫번째 쿼리문 에러
        }
	});
});

router.post('/insert', function(req, res) {
	connection.query('select * from userinfo where id=?',[req.body.ID],function(err, rows, fields) {
		var user_id = rows[0].uid ;
		connection.query('insert into message(uid, title, content, music_title, music_artist, tag1, tag2, tag3, tag4, tag5, tag6, tag7, tag8, tag9, tag10) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [user_id, req.body.TITLE, req.body.CONTENT, req.body.MUSIC_TITLE, req.body.MUSIC_ARTIST, req.body.TAG1, req.body.TAG2, req.body.TAG3, req.body.TAG4, req.body.TAG5, req.body.TAG6, req.body.TAG7, req.body.TAG8, req.body.TAG9, req.body.TAG10], function(err, rows, fields) {
			if(!err) {
				res.json([{"result" : "success"}]);
				console.log("메세지 등록 성공");
			}
			else {
				res.json([{"result" : "DBerror"}]);
			}
		});
	});
});

router.post('/delete',function(req,res){
     connection.query('select * from userinfo where id =?',[req.body.KEY_ID],function(err,rows, fields) {
        var user_id = rows[0].uid ;
    connection.query('delete from message where uid=? and title=?;', [user_id, req.body.KEY_TITLE], function(err, rows, fields) {
         if(!err) {
                res.json([{"result" : "success"}]);
            console.log("메세지 삭제 성공");
         }
         else {
            res.json([{"result" : "DBerror"}]);
         }
      });
});
});

router.post('/update', function(req, res) {
connection.query('select * from userinfo where id=?',[req.body.KEY_ID],function(err,rows,fields) {
        var user_id = rows[0].uid ;
      connection.query('update message set title = ?, content=?,music_title=?,music_artist=?, tag1=?, tag2=?, tag3=?, tag4=?, tag5=?, tag6=?, tag7=?, tag8=?, tag9=?, tag10=? where uid = ? and title=?;',[ req.body.NEW_TITLE, req.body.NEW_CONTENT, req.body.NEW_MUSIC_TITLE,req.body.NEW_MUSIC_ARTIST, req.body.TAG1, req.body.TAG2, req.body.TAG3, req.body.TAG4, req.body.TAG5, req.body.TAG6, req.body.TAG7, req.body.TAG8, req.body.TAG9, req.body.TAG10, user_id, req.body.KEY_TITLE ], function(err, rows, fields) {
         if(!err) {
            res.json([{"result" : "success"}]);
            console.log("메세지 수정 성공");
         }
         else {
            res.json([{"result" : "DBerror"}]);
         }
    });
});
});

module.exports = router;
