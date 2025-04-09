import mongoose, { Schema } from "mongoose";

const querySchema = new Schema(
    {
        query: {
            type: String,
            require: true,
            trim: true
        },
        response: {
            type: String,
        },
        documents: [{
            type: Schema.Types.ObjectId,
            ref: "Document"
        }]
    },
    {
        timestamps: true
    }
)

export const Query = mongoose.model("Query", querySchema);