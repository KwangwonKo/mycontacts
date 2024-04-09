const express=require("express");
const dbConnect=require("./config/dbConnect");
const methodOverride = require("method-override");
//const errorhandler=require("./middlewares/errorhandler");
//const path=require("path");
const app=express();
app.set("view engine","ejs");
app.set("views","./views");
//const router = express.Router();
const port=3000;
dbConnect();
//app.use(errorhandler);
/*
const logger=(req,res,next)=>{
    console.log("User Logged");
    next();
}

app.use(logger);
const requestTime = (req,res,next)=>{
    let today = new Date();                 // Date 객체 만들기
    let now = today.toLocaleTimeString();   // 현재 시간을 문자열로 바꾸기
    req.requestTime=now;                    // req 객체에 requestTime 속성 추가하기
    next();
}
app.use(requestTime);

app.route("/").get((req,res)=>{
    res.status(200).send("Hello Node!");
})
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/loginRoutes"));
app.use("/contacts", require("./routes/contactRoutes"));
// load public files
app.use(express.static("./public"));
app.use(methodOverride("_method"));
/*
app.get("/",(req,res)=>{
    const responseText = `Hello Node! \n요청 시간 : ${req.requestTime}`;
    res.set("Content-type", "text/plain");
    res.send(responseText);
})
app.use("/contacts", require("./routes/contactRoutes"));
app.get("/test",(req,res,next)=>{
    const error=new Error("테스트용 에러"); // 오류 생성
    error.status=401;
    next(error);
});

app.get("/",(req,res)=>{
    res.status(200);
    res.send("Hello Node!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
*/
/*
//모든 연락처 가져오기
router.get("/contacts",(req,res)=>{
    //res.status(201).send("Create Contacts");
    //res.sendFile(__dirname+"/assets/contacts.html");
    res.status(200).send("Contacts Page");
});
// 새 연락처 추가하기
router.post("/contacts",(req,res)=>{
    res.status(201).send("Create Contacts");
});
  
// 연락처 상세보기
router.get("/contacts/:id", (req, res) => {
    res.status(200).send(`View Contact for ID: ${req.params.id}`);
});
  
// 연락처 수정하기
router.put("/contacts/:id", (req, res) => {
   res.status(200).send(`Update Contact for ID: ${req.params.id}`);
});

// 연락처 삭제하기
router.delete("/contacts/:id", (req,res)=>{
    res.status(200).send(`Delete Contact for ID: ${req.params.id}`);
});
*/


//app.use(router);

app.listen(port,()=>{
    console.log(`${port}번 포트에서 서버 실행중`);
});