
import { GEMINI_API_KEY } from "./env.js";
import { GoogleGenAI } from "https://esm.sh/@google/genai";

const API_KEY = GEMINI_API_KEY

try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    window.ai = ai; // Make the 'ai' object globally accessible for your main script
} catch (e) {
    console.error("Failed to initialize GoogleGenAI. Check API Key.", e);
    // You might want to disable the scan button here if the API fails to load
}

export async function findBin(base64Image, mimeType, resultDiv, displayResults){
    if(resultDiv){
        resultDiv.innerHTML = "Analyzing...";
    }

    if(!window.ai){
        if(resultDiv) resultDiv.textContent = "AI not initialized.";
        return;
    }

    const prompt = `
            Analyze the object in the image. Search for the primary object in the image and try to ignore secondary objects/people.
            Identify what it is and determine which bin it should go into. 
            Use standard municipal recycling guidelines for North America (General Waste, Recycling, Compost) (non-contaminated paper, plastic, metal are recyclable).
            if you CAN'T identify the object, respond set the object_identified to "UNKNOWN", bin_destination to "IDK DUDE" , and reasoning being "could not identify object
            Respond ONLY with a JSON object that strictly adheres to the provided schema.
        `;
    try {
        const response = await window.ai.models.generateContent({
            model: "gemini-2.5-flash", 
            contents: [
                { role: "user", parts: [
                    // This is how you send the image data to Gemini
                    {
                        inlineData: {
                            data: base64Image,
                            mimeType: mimeType
                        }
                    },
                    { text: prompt }
                ]}
            ],
            config: {
                // FORCE the output to be JSON
                responseMimeType: "application/json",
                // DEFINE the structure of the JSON we want
                responseSchema: {
                    type: "object",
                    properties: {
                        object_identified: { type: "string", description: "Clear name of the object." },
                        // Use an 'enum' to ensure the output is one of these three exact values
                        bin_destination: { type: "string", enum: ["RECYCLING", "COMPOST", "TRASH"], description: "The correct disposal bin." },
                        reasoning: { type: "string", description: "A brief, one-sentence explanation for the bin choice." }
                    },
                    required: ["object_identified", "bin_destination", "reasoning"]
                }
            }
        });

        // 3. Process the Response
        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        
        // 4. Call the function to update the UI
        displayResults(result);

} catch (error) {
    console.error("Gemini API Error:", error);
    if (resultDiv) {
        resultDiv.textContent = `Error during analysis. Details: ${error.message}`;
    }
}
}
