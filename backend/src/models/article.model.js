import mongoose from "mongoose";


const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    userId:{
        type:String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    },
    doctorName:{
        type:String,
        required: true
    }
})

const Article = mongoose.model('Article', articleSchema);
export default Article;
