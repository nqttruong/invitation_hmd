
import { GoogleGenAI } from "@google/genai";

export const generateGreeting = async (guestName: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Hãy viết một câu chào mừng ngắn gọn, ấm áp và trang trọng bằng tiếng Việt gửi đến khách mời tên là "${guestName}"(sử dụng từ bạn), người sẽ tham dự lễ tốt nghiệp của Đặng Minh Hiền tại Đại học Phenikaa. Câu văn nên thể hiện sự trân trọng. Tối đa 2 câu.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });
    return response.text?.trim() || `Rất hân hạnh được đón tiếp ${guestName} tại lễ tốt nghiệp của Đặng Minh Hiền.`;
  } catch (error) {
    console.error("Gemini Error:", error);
    return `Rất hân hạnh được đón tiếp ${guestName} tại lễ tốt nghiệp của Đặng Minh Hiền.`;
  }
};
