import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

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
1. **Subscription Model**:
   - Fixed monthly payments for comprehensive healthcare access.
   - Includes:
     - Unlimited access to generic medicines.
     - Regular diagnostic tests (e.g., blood tests, urine tests).
     - Teleconsultations with healthcare providers.
     - Health monitoring and personalized recommendations.
   - Cost: ₹400-500/month.
   - Best for: Families with stable income and chronic conditions.

2. **Tiered Pricing**:
   - Income-based pricing with three tiers:
     - **Tier 1**: ₹200-300/month (Income < ₹10k).
     - **Tier 2**: ₹300-400/month (Income ₹10k-₹20k).
     - **Tier 3**: ₹400-500/month (Income ₹20k+).
   - Includes:
     - Access to generic medicines and diagnostic tests.
     - Flexible payment options based on seasonal income.
   - Best for: Families with fluctuating income or larger households.

3. **Microinsurance**:
   - Low-cost coverage for essential healthcare needs.
   - Includes:
     - Basic Coverage (₹100-200/month): Essential medications and diagnostic tests.
     - Extended Coverage (₹200-300/month): Includes chronic care and diabetic kits.
   - Best for: Low-income families with chronic conditions.

The goal is to ensure rural households can access diagnostic tests, generic medicines, and diabetic kits for ≤₹500 per month.

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
    const response = await result.response;
    const rawText = await response.text();

    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    const cleanedText = jsonMatch ? jsonMatch[0] : "{}";

    const recommendation = JSON.parse(cleanedText);

    return NextResponse.json(recommendation);
  } catch (error) {
    console.error("Error generating recommendation:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendation" },
      { status: 500 }
    );
  }
}
