import "dotenv/config";
import fs from "fs";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

// import essay
const essay = fs.readFileSync("app/(1-extraction)/essay.txt", "utf-8");

async function main() {
  const result = await generateText({
    model: openai("gpt-4-turbo"),
    prompt: "Sumarise in two sentances." + "\n\n" + essay,
  });

  console.log(result.text); 
}

main().catch(console.error);