const express = require('express')

const contactModel = require('../models/contactsSchema')
//* Create a Router
const router = express.Router()

// get contacts

    router.get('/', async (req, res)=>{
        try {
            const contacts = await contactModel.find()
            res.status(200).json(contacts)
        } catch (error) {
            {
                console.error(error)
            }
        }
    })
    // res.status(200).json({
    //     ////Sending back json data which is an array of todos
    //     todos:[{task: 'Learn Express'}]
    // })

// create contacts
router.post('/', async (req, res)=> {
const contactData = req.body // gets the data from the request

try {
    const contact = await contactModel.create(contactData) // creates the todo in the db
    res.status(201).json(contact)
    // res.status(201).json({data: todo})
} catch (error) {
    console.error(error)
    res.status(400).json('Bad request!')
    
}
})

// get contacts by id
router.get('/:id', async(req, res)=> {
    const id = req.params.id

    try {
        const todo = await contactModel.findById(id)
        res.status(200).json(todo)
    } catch (error) {
        console.error(error)
    }
})

// Update contacts by id
router.put('/:id', async(req, res)=> {
    const id = req.params.id
    const newContactData = req.body
   try {
    const contact = await contactModel.findByIdAndUpdate(id, newContactData, {new:true})
    res.status(202).json(contact)
   } catch (error) {
       console.error(error)
   }

})
// // Delete the contact
router.delete('/:id', async(req, res)=> {
    const id = req.params.id
    try {
        const contact = await contactModel.findByIdAndDelete(id)
        res.status(200).json({msg: 'Contact was deleted'})
    } catch (error) {
        console.log(error)
        
    }
})
module.exports = router