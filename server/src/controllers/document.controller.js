import { Document } from '../models/document.model.js';
import { Query } from '../models/query.model.js';
import path from 'path'

const handleDocument = async (req, res) => {
    try {
        const documents = req.files;
        if(!documents)
        {
            return req.status(400).json({
                message: "Document is required",
                statusCode: 400,
                success: false 
            })
        }
        const query = req.body.query;
        if(!query)
        {
            return req.status(400).json({
                message: "Query is required",
                statusCode: 400,
                success: false
            })
        }


        const documentIds = [];
        let combineText = "";

        for(const document of documents)
        {
            const type = path.extname(document.filename).slice(1).toLowerCase();
            const extractedText = await extract(document);
            
            const doc = await Document.create({
                documentName: document.filename,
                documentContent: extractedText,
                documentType: type
            })

            if(!doc)
            {
                return res.status(500).json({
                    message: "Failed to create document in database",
                    statusCode: 500,
                    success: false
                })
            }

            documentIds.push(doc._id);
            combineText += extractedText;
        }

        const AImodelResponse = await sendToModel(combineText);

        if(!AImodelResponse)
        {
            return res.status(500).json({
                message: "AI model error",
                statusCode: 500,
                success: false
            })
        }

        const queryEntry = await Query.create({
            query: query,
            response: AImodelResponse,
            documents: documentIds
        })

        if(!queryEntry) 
        {
            return res.status(500).json({
                message: "Failed to create query in database",
                statusCode: 500,
                success: true
            })
        }

        return res.status(200).json({
            message: "Reponse send successfully",
            response: AImodelResponse,
            statusCode: 200,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            statusCode: 500,
            success: false,
            error: error.message
        })
    }
}

export {
    handleDocument
}