import Mongoose, { Schema } from 'mongoose'

export const messageSchema = new Schema({
    class:{ type: String, enum : ["user","assistant"]},
    time: { type: Date , default : Date.now},
    content:{ type:String}
})

export const chatSchema = new Schema({
    title:{ type : String, required: [true,"Enter title"]},
    messages : [messageSchema]
})

export const Message = Mongoose.model("Message",messageSchema)

export const Chat = Mongoose.model("Chat",chatSchema);  