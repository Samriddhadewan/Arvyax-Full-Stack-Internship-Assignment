import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    user_id : {type : mongoose.Schema.Types.ObjectId, ref: 'User',required : true},
    title : {type: String, required: true},
    tags : [String],
    json_file_url : {type : String, required : true},
    status: {type : String, enum: ['draft', 'published'], default:'draft'},
    created_at:{type : Date, default: Date.now},
    updated_at: {type : Date, default: Date.now}
});

const sessionModel = mongoose.model('session', sessionSchema)
export default sessionModel;