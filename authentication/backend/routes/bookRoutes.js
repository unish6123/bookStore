
import express from 'express';
import getAiResponse from '../aiIntegration/getAiResponse.js';



const bookRouter = express.Router();

bookRouter.post('/getSummary', getAiResponse);



export default bookRouter;