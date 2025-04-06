import  extractTextFromPages  from "../services/pdfReader.js";
import generateAIResponse from "../services/geminiPrompting.js";
import contentPageNumbers from "../constants/contentPageNumbers.js";


const handleMissingContentId = () => {
    return "Content ID is missing or invalid";
};

const getAiResponse = async (req, res) => {
    const { contentId } = req.body;
    console.log("The content id for backend is",contentId)

    const idOfTheContent = Number(contentId)
    if (!contentId) {
        return res.json({ success: false, message: handleMissingContentId() });
    }
    try{
        if (!contentPageNumbers[contentId]){
            return res.json({success:false, message:"no contentId map here."})
        }
        const startPage = contentPageNumbers[contentId][0];
        const endPage = contentPageNumbers[contentId][1];
        const bookUrl = contentPageNumbers[contentId][2];

        console.log("startPage", startPage, "endPage", endPage, "bookUrl", bookUrl);

        const prompt = "summarize all the pages in 300 words"+ "\n" + await extractTextFromPages(bookUrl, startPage, endPage); // <-- Await the function
        console.log("the prompt is ",prompt.length);

    return res.json({success:true, message:bookUrl})
    }
    catch(error){
        return res.json({success:false, message:error.message})
    }

    // continue with logic...
};
export default getAiResponse;