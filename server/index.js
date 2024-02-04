const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3000

const schema = mongoose.Schema({
    name: String,
    email: String,
    mobile: String
},(
    {timestamps: true}
))

const userModel = mongoose.model('user', schema)


//read api
app.get('/', async(req, res)=>{
    const data = await userModel.find()
    res.json({success: true , data: data}) 
})

//create data 
app.post('/create', async(req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.json({success: true, message : 'Data created successfully'})
})

//create put api || update api

app.put('/update', async(req,res)=>{
    console.log(req.body)
    const {id,...rest} = req.body

    console.log(rest)
    const data = await userModel.updateOne({_id: id}, rest)
    res.send({success: true, message: 'Data updated successfully', data:data})
})


app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const data = await model.deleteOne({_id:id})
    res.send({success : true,message:"data will be deleted"})
})

mongoose.connect('mongodb://127.0.0.1:27017/crudoperation')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Could not connect to MongoDB', err))

app.listen(port, () => console.log(`Server is running on port ${port}`))

