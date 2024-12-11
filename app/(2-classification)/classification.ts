import "dotenv/config";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import supportRequests from "./support_requests_multilanguage.json"; 
import { z } from "zod";
 
async function main() {
  const result = await generateObject({
    model: openai("gpt-4o-mini"),
    prompt:
      "Classify the following support requests.\n\n" +
      JSON.stringify(supportRequests),
    schema: z.object({
      original_request: z.string(),
      udf1: z.string().describe("this is the translatede to english request"), 
      category: z.enum([
        "billing",
        "product_issues",
        "enterprise_sales",
        "account_issues",
        "product_feedback",
      ]),
      urgency: z.enum(["low", "medium", "high"]),
      language: z.string(),
    }),
    output: "array",
  });
  console.log(result.object);
}
 
main().catch(console.error);