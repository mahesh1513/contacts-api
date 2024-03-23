const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')

//@desc Get all contacts
//@route /api/contacts
//@access Private
const getContacts = asyncHandler(async (req,res) => {
    contacts = await Contact.find({user_id:req.user.id})
    res.status(200).json(contacts)
})

//@desc Get a contact
//@route /api/contacts/:id
//@access Private
const getContact = asyncHandler(async(req,res) => {

    const contact = await Contact.findById(req.params.id)
    if(!contact) {
        res.status(401).json({message:"User dont have permission!!!"})
    }
    if(contact.user_id.toString()!==req.user.id)  {
        res.status(401).json({message:"User dont have permission!!!"})
    }
    res.status(200).json(contact)

})

//@desc Create a contact
//@route /api/contacts/
//@access Private
const createContact = asyncHandler(async(req,res,next) => {
    
    console.log(`The Request Body is`,req.user.email)
    const {name,email,phone_no} = req.body;
    if(!name || !email || !phone_no) {
        res.status(400)
        throw new Error("All fields are mandatory!!!")
    }

    const contact = await Contact.create({
        name,
        email,
        phone_no,
        user_id:req.user.id
    })
    res.status(201).json(contact)
})

//@desc Get a contact
//@route /api/contacts/:id
//@access Private
const updateContact = asyncHandler(async(req,res,next) => {

    const contact = await Contact.findById(req.params.id)
    if(!contact) {
        throw new Error("Contact Not Available!!!")
    }

    if(contact.user_id.toString()!==req.user.id)  {
        res.status(401).json({message:"User dont have permission!!!"})
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new:true }
    )
    res.status(200).json(updatedContact)
})
//@desc Get a contact
//@route /api/contacts/:id
//@access Private
const deleteContact = asyncHandler(async(req,res,next) => {

    const contact = await Contact.findById(req.params.id)
    if(!contact) {
        throw new Error("Contact Not Available!!!")
    }
    if(contact.user_id.toString()!==req.user.id)  {
        res.status(401).json({message:"User dont have permission!!!"})
    }
    await contact.deleteOne();
    res.status(200).json({message:"User deleted!!!"})
})

module.exports = {getContacts,getContact,createContact,updateContact,deleteContact}