import mongoose, { Mongoose } from "mongoose";

const itemSchema=new mongoose.Schema({
   user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
   },
   claimedBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
   },
   title:{
      type:String,
      required:true
   },
   picture:{
      type:String,
      required:true
   },
   address:{
      type:String,
      required:true
   },

   //set by general user lost or found states
   state:{
      type:String,
      enum:['lost','found'],
      required:true
   },
   status:{
      type:String,
      enum:['claimed','approved','reject','approval pending'],
      default:'approval pending' //until and unless it is claimed it is not removed if claimed it move to found items list.  

      //only admin can approved or reject the item after that anyone in general can claim that.
   }
},{timestamps:true})

const Item=mongoose.models.Item || mongoose.model('Item',itemSchema)

export default Item;