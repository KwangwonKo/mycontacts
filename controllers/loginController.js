const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

//@desc Get login page
//@route GET /register
const getRegister = (req,res)=>{
    res.render("register");
};

//@desc Get login page
//@route GET /
const getLogin = (req,res) =>{
    res.render("home");
};

//@desc Get login page
//@route GET /
const loginUser = asyncHandler(async(req,res)=>{
    const { username, password } = req.body;
    /*
    if(username === "admin" && password === "1234"){
        res.send("Login success");
    }else{
        res.send("Login failed");
    }
    */
   const user = await User.findOne({ username });
   if(!user){ // 일치하는 사용자가 없다면 오류 메시지 표시
    return res.status(401).json({ message: "일치하는 사용자가 없습니다." });
   }
   // 입력된 비밀번호와 사용자의 비밀번호 비교
   const isMatch = await bcrypt.compare(password, user.password);
   if(!isMatch){ // 비밀번호가 일치하지 않으면 오류 메시지 표시
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
   }
   // 사용자 ID를 기반으로 JWT 토큰 생성
   const token = jwt.sign({ id: user._id }, jwtSecret);
   // 생성된 토큰을 쿠키에 저장
   res.cookie("token",token, { httpOnly: true });
   // 로그인에 성공하면 '/contacts'로 이동시킴
   res.redirect("/contacts");
});

//@desc Register User
//@route POST /register
const registerUser = asyncHandler(async(req,res)=>{
    // 폼에서 넘겨받은 내용(req.body)을 username과 password, password2로 추출합니다.
    const { username, password, password2 } = req.body;
    // 비밀번호와 비밀번호 확인이 일치하는지 확인합니다.
    if(password === password2){
        // bcrypt를 사용해 비밀번호를 암호화합니다.
        const hashedPassword = await bcrypt.hash(password,10);
        // 사용자 이름과 암호화된 비밀번호를 사용해서 새 사용자를 만듭니다.
        const user = await User.create({ username, password: hashedPassword });
        // 성공 메시지를 출력합니다. 확인하기 위해 user도 화면에 출력합니다.
        res.status(201).json({ message: "Register successful", user});
    }else{
        res.send("Register Failed");
    }
});

// @desc Logout
// @route GET /logout
const logout = (req,res)=>{
    res.clearCookie("token");
    res.redirect("/");
};

module.exports = { getRegister, registerUser, getLogin, loginUser, logout };