import mongoose, { models } from 'mongoose'

const userSchema=new mongoose.Schema({
   name:{
      type:String,
      required:true
   },
   password:{
      type:String,
      required:true
   },
   email:{
      type:String,
      required:true
   },
   role:{
      type:String,
      enum:['Admin','User'],
      default:'User'
   },
   mobileNo:{
      type:Number,
      required:true,
      validate:{
         validator:function(v){
            if(v.length===10) return true;
            return /\d{10}/.test(v);
         },
         message:props=>`{props.value} is not a valid phone number`
      }
   },
   profilePic:{
      type:String,
   }
},{timestamps:true})

const User=models.User || mongoose.model('User',userSchema);

export default User;