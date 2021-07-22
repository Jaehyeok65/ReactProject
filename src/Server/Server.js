const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const multer = require('multer');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'asfg1245!',
    database : 'user',
});

 connection.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
 
// http://localhost:4000/ 으로 접속 시 응답메시지 출력
app.get('/', (req,res) => {
    res.send('Server Response Success');
})

app.post("/idplz", (req,res)=>{
    const user_id = req.body.user_id;
    const user_password = req.body.user_password;
    const user_name = req.body.user_name;
    //console.log(req.body);
    connection.query("INSERT INTO userinformation (user_id,user_password,user_name) values (?,?,?)",[user_id,user_password,user_name],
    function(err,rows,fields){
        if(err){
            console.log("실패");
            // console.log(err);
        }else{
            console.log("성공");
            res.send(rows);
            //console.log(rows);
        };
    });

    
});

app.post("/callbody", (req,res)=>{
    connection.query("SELECT * FROM userinformation",
    function(err,rows,fields){
        if(err){
            console.log("불러오기 실패");
        }else{
            console.log("불러오기 성공");
            //console.log(rows);
            res.send(rows);
        }
    })
})

app.post("/callnovel", (req,res)=>{
    connection.query("SELECT * FROM novelinformation",
    function(err,rows,fields){
        if(err){
            console.log("로드 실패");
        }else{
            console.log("로드 성공");
            //console.log(rows);
            res.send(rows);
        }
    })
})

const storage = multer.diskStorage({
    destination: "C:/Users/wkkl2/reactproject/public/assets",
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });

  const upload = multer({
    storage: storage,
  });

  
  app.post("/uploaded", upload.single("file"), function(req, res, next) {
      console.log(req.file.filename);
       res.send(req.file.filename);
  });

app.post("/callwebtoon", (req,res)=>{
    connection.query("SELECT * FROM webtooninformation",
    function(err,rows,fields){
        if(err){
            console.log("로드 실패");
        }else{
            console.log("로드 성공");
            //console.log(rows);
            res.send(rows);
        }
    })
})

app.post("/webtoonview", (req,res)=>{
    connection.query("UPDATE webtooninformation SET webtoon_view = webtoon_view + ? WHERE webtoon_name = ?",[req.body.webtoon_view,req.body.webtoon_name],
    function(err,rows,fields){
        if(err){
            console.log("로드 실패");
        }else{
            console.log("로드 성공");
            //console.log(rows);
            res.send(rows);
        }
    })
})

app.post("/novelview", (req,res)=>{
    connection.query("UPDATE novelinformation SET novel_view = novel_view + ? WHERE novel_name = ?",[req.body.novel_view,req.body.novel_name],
    function(err,rows,fields){
        if(err){
            console.log("로드 실패");
        }else{
            console.log("로드 성공");
            //console.log(rows);
            res.send(rows);
        }
    })
})

app.post("/islogin", (req,res)=>{
    connection.query("SELECT user_id, user_password FROM userinformation where user_id = ?",[req.body.user_id],
    function(err,rows,fields) {
        if(err) {
            console.log("오류가 발생했습니다.");
        }
        else {
            res.send(rows);
        }
    }
    );
})

app.post("/checklogin", (req,res)=>{
    connection.query("SELECT user_id FROM userinformation where user_id = ?",[req.body.user_id],
    function(err,rows,fields) {
        if(err) {
            console.log("오류가 발생했습니다.");
        }
        else {
            res.send(rows);
        }
    }
    );
})

 
app.listen(PORT, () => {
    console.log(`Server run : http://localhost:${PORT}/`)
})

