import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const transformImage = async (
  base64Image: string,
  prompt: string
): Promise<string> => {
  try {
    // Remove data URL prefix if present (e.g., "data:image/jpeg;base64,")
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: 'image/jpeg', // Assuming jpeg/png, standardizing
            },
          },
          {
            text: `${prompt} Return ONLY the image.`,
          },
        ],
      },
    });

    // Extract image from response
    // The model typically returns text or inlineData. For image generation/editing,
    // we look for inlineData in the response parts.
    const parts = response.candidates?.[0]?.content?.parts;
    
    if (!parts) {
      throw new Error("No content generated");
    }

    // Find the image part
    const imagePart = parts.find(p => p.inlineData);

    if (imagePart && imagePart.inlineData) {
      return `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
    }

    // Fallback if the model refused to generate an image and returned text instead (e.g., policy violation)
    const textPart = parts.find(p => p.text);
    if (textPart) {
      throw new Error(`AI Message: ${textPart.text}`);
    }

    throw new Error("Failed to generate image.");
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Something went wrong with the cartoon machine!");
  }
};