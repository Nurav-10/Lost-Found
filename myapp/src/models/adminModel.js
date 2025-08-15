import mongoose from 'mongoose'

const adminSchema=new mongoose.Schema({
   user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
   managedItems:[{type:mongoose.Schema.Types.ObjectId,ref:'Item'}]
})

const Admin=models.Admin || mongoose.model('Admin',adminSchema);
export default Admin