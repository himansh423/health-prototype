import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export async function POST(request: Request) {
  try {
    const { income, familySize, healthCondition } = await request.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      As a healthcare financing AI advisor for rural communities in India, provide a recommendation based on the following user profile:
      
      - Monthly household income: ₹${income}
      - Family size: ${familySize} members
      - Health condition: ${healthCondition} (healthy, minor issues, or chronic condition)
      
      Analyze this data and recommend the most suitable financing option from:
      1. Subscription Model (fixed monthly payments)
      2. Tiered Pricing (based on income brackets)
      3. Microinsurance (low-cost coverage for essentials)
      
      The goal is to ensure rural households can access diagnostic tests and generic medicines for ≤₹500 per month.
    
      Respond with a **valid JSON** object containing the following fields:

      \`\`\`json
      {
        "recommendedOption": "subscription" | "tiered" | "microinsurance",
        "confidenceScore": number between 60 and 95,
        "reasoning": "string explaining the recommendation",
        "customizedAdvice": "string with personalized advice"
      }
      \`\`\`
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;  // Ensure it's awaited
    const rawText = await response.text();

    console.log("Raw Response from Gemini:", rawText); // Debugging

    // Extract only the JSON part using regex
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    const cleanedText = jsonMatch ? jsonMatch[0] : "{}";

    // Parse the cleaned JSON
    const recommendation = JSON.parse(cleanedText);

    return NextResponse.json(recommendation);
  } catch (error) {
    console.error("Error generating recommendation:", error);
    return NextResponse.json({ error: "Failed to generate recommendation" }, { status: 500 });
  }
}
