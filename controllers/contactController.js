const asyncHandler = require("express-async-handler");
const Contact=require("../models/contactModel");
const path=require("path");
// @desc Get all contacts
// @rote GET /contacts
const getAllContacts = asyncHandler(async(req,res) => {
    //res.status(200).send("Contacts Page");
    /*
    const contacts=await Contact.find();
    res.status(200).send(contacts);
    
    const contact = await Contact.findById(req.params.id);
    res.status(200).send(contact);

    const name = req.params.id;
    const contact = await Contact.findOne({name:name});
    res.status(200).send(contact);
    */
    const contacts = await Contact.find();
    res.render("index", { contacts: contacts });
    /*
    const users = [
        {name: "Donghee", email: "donghee@woman.girl", phone:"70255752"},
        {name: "Jinwoo", email: "jinwoo@man.dad", phone:"20142858"},
    ];
    res.status(200).send("<h1 style='color:green'>Contacts Page</h1>");
    const filePath=path.join(__dirname, "../assets","getAll.html");
    res.sendFile(filePath);
    res.render("getAll");
    res.render("getAll",{heading: "User List"});
    res.render("getAll",{heading: "User List", users: users});
    */
    
});
// @desc Get all contacts
// @route POST /contacts/add
const createContact = asyncHandler(async(req,res)=>{
    console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).send("필수값이 입력되지 않았습니다.");
    }
    const contact=await Contact.create({
        name,
        email,
        phone,
    });
    // res.status(201).send("Create Contacts");
    res.redirect("/contacts");
});
// @desc Get all contacts
// @rote GET /contacts
const getContact=asyncHandler(async(req,res)=>{
    // res.status(200).send(`View Contact for ID: ${req.params.id}`);
    const contact = await Contact.findById(req.params.id);
    res.render("update", { contact: contact });
});
// @desc Get all contacts
// @rote GET /contacts
const updateContact=asyncHandler(async(req,res)=>{
    // res.status(200).send(`Update Contact for ID: ${req.params.id}`);
    const id = req.params.id;
    const { name, email, phone } = req.body;
    /*
    const contact = await Contact.findById(id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    // 수정
    contact.name=name;
    contact.email=email;
    contact.phone=phone;
    //저장
    contact.save();
    res.status(200).json(contact);
    */
   const updatedContact = await Contact.findByIdAndUpdate(
    id,
    {name, email, phone},
    {new: true}
   );
   // res.status(200).send(updatedContact);
    res.redirect("/contacts");
});
// @desc Get all contacts
// @rote GET /contacts
const deleteConteact=asyncHandler(async(req,res)=>{
    //res.status(200).send(`Delete Contact for ID: ${req.params.id}`);
    /*
    const contact = await Contact.findByid(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.deleteOne();
    res.status(200).send(`Delete Contact for ID: ${req.params.id}`);
    */
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect("/contacts");
})
// @desc Get all contacts
// @rote GET /contacts
const addContactForm=(req,res)=>{
    res.render("add"); // views/add.js 렌더링하기
}
module.exports={
    getAllContacts,
    createContact,
    getContact,
    updateContact,
    deleteConteact,
    addContactForm
};
/*
const getAllContacts = asyncHandler(async(req,res) => {
    const getAllContacts = async (req,res) => {
    try{
        res.status(200).send("Contacts Page");
    }catch(error){
        res.send(error.message);
    }
    res.status(200).send("Contacts Page");
});
*/