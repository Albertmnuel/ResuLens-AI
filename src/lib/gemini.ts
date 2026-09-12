import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export async function generateSummaryWithGemini(role: string, skills: string[]): Promise<string> {
  const prompt = `Write a professional, concise 2-3 sentence resume summary for a ${role || 'Software Engineer'} with skills in: ${skills.join(', ') || 'software development'}. Focus on impact, value delivered, and technical proficiency. Do not include markdown formatting or commentary.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });
    return response.text?.trim() || '';
  } catch (error) {
    console.error('Error generating summary:', error);
    throw error;
  }
}

export async function enhanceBulletWithGemini(role: string, rawBullet: string): Promise<string> {
  const prompt = `Rewrite the following resume bullet point for a ${role || 'Software Engineer'} to make it action-oriented, quantifiable, and high-impact using ATS best practices:
"${rawBullet}"
Return ONLY the single improved bullet point without quotation marks, bullet symbols, or extra text.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });
    return response.text?.trim() || rawBullet;
  } catch (error) {
    console.error('Error enhancing bullet point:', error);
    throw error;
  }
}