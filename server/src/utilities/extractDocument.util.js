import fs from 'fs';
import pdf from 'pdf-parse'
import mammoth from 'mammoth';

const extract = async (filePath, fileType) => {
    try {
        if (fileType === 'pdf') 
        {
            const dataBuffer = fs.readFileSync(filePath);
            const data = await pdf(dataBuffer);
            return data.text;
        } 
        else if (fileType === 'docx') 
        {
            const result = await mammoth.extractRawText({ path: filePath });
            return result.value;
        } 
        else if (fileType === 'txt') 
        {
            return fs.readFileSync(filePath, 'utf8');
        } 
        else 
        {
            throw new Error('Unsupported file type: ' + fileType);
        }
    } catch (error) {
        console.error("Error extracting file", error);
        throw error;
    }
}

export {extract};