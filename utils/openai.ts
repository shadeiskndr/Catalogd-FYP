// pages/api/recommend.ts
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { preferences } = await req.json();

  if (!preferences) {
    return res.status(400).json({ error: "Preferences are required" });
  }

  const prompt = `Based on the following preferences, recommend some games: ${preferences}`;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 150,
    });

    const recommendations = response.data.choices[0].text?.trim().split("\n") || [];
    return res.status(200).json({ recommendations });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
