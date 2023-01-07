import mongoose from "mongoose"
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : [true , 'name is required']
    },
    email : {
        type : String,
        required : [true , 'email is required'],
        unique : true
    },
    password : {
        type : String,
        required : [true , 'password is required']
    },
    confirmPassword : {
        type : String,
        required : [true , 'confirmPassword is required'],
        validate : {
            validator : function(el){
               return el === this.password
            },
            message : `Password Didn't Match`
        }
    },
    role:{
       type: String,
       enum : {
        values: ['admin' , 'user' , 'merchant' , 'moderator'],
        message : 'enter the correct role'
       },
       default : 'user'

    },
    active:{
        type : Boolean,
        default : true
    },
   
})


userSchema.pre('save' , async function(next){
    if ( !this.isModified('password'))  return next()
    this.password = await bcrypt.hash(this.password , 12)
    this.confirmPassword = undefined
    next()
})


userSchema.methods.validatePassword = async function(clientPassword , dbPassword){
   return await bcrypt.compare(clientPassword , dbPassword)
}



const User = mongoose.model('User' , userSchema)

export default User