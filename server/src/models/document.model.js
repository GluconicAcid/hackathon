import { Schema } from 'mongoose'

const documentSchema = new Schema(
    {
        documentName: {
            type: String,
            trim: true,
            required: true
        },
        documentContent: {
            type: String,
            trim: true
        },
        documentType: {
            type: String, 
            required: true
        },
        author: {
            type: String, 
            trim: true
        }
    },
    {
        timestamps: true
    }
)

export const Document = mongoose.model("Document", documentSchema);