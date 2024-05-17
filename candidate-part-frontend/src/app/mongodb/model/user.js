import mongoose,{Schema} from "mongoose";

const UserSchema = new Schema({
    username:String,
    password:String,
    email:String,
    verifytoken:{
        type:String,
        require:false,
    }
})

const User = mongoose.models.User ||  mongoose.model("User",UserSchema);

export default User;