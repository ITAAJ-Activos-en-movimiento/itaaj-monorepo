import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateContent = async (
  topic: string,
  platform: string,
  tone: string,
  contentType: string,
  keywords: string
): Promise<string> => {
  const prompt = `Create a ${platform} ${contentType} about ${topic} using a ${tone} tone.${
    keywords ? ` Include these keywords: ${keywords}.` : ''
  }
  For Twitter, keep it under 280 characters.
  For Instagram, include relevant hashtags.
  For LinkedIn, maintain a professional voice.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a professional social media content creator, return all content in spanish for mexican audience"
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7,
  });

  return completion.choices[0].message.content || '';
};

export const generateImage = async (
  topic: string,
  style: string
): Promise<string> => {
  const prompt = `Create a ${style} style image about ${topic}. The image should be high quality and suitable for social media.`;

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    n: 1,
    size: "1024x1024",
    quality: "standard",
  });

  return response.data[0].url || '';
};