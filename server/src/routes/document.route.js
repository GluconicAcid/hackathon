import { Router } from 'express'
import multer from 'multer'
import { handleDocument } from '../controllers/document.controller';

const documentRoute = Router();

const upload = multer({ dest: 'uploads/' });

documentRoute.post('/process', upload.array('documents'), handleDocument);

export default documentRoute;