"use server";
 
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
 
export const extractAppointment = async (input: string) => {
    const result = await generateObject({
        model: openai("gpt-4o-mini"),
        prompt: `"
 You are assisting a user in generating academic period weeks. Each academic period consists of multiple weeks, where:

Each week is 7 days long, starting on Monday and ending on Sunday.
If the provided start date does not fall on a Monday, adjust it to the nearest earlier Monday. For example, "25 Dec 2024" would use "23 Dec 2024" as the starting Monday.
The user specifies a duration, such as "12 weeks starting from the week of 1 Aug 2024." Your output should generate 12 sequential weeks with start and end dates.

         If the user gives dates that do not fall on Monday then you should should always use the ealier Monday as the starting date for the week. E.g. 25 Dec 2024, Monday would be 23 Dec 2024 and the week would start from 23 Dec 2024 and end on 29 Dec 2024.

         If the user gives dates that do not fall on Sunday then you should should always use the later Sunday as the ending date for the week. E.g. 25 Dec 2024, Sunday would be 29 Dec 2024 and the week would start from 23 Dec 2024 and end on 29 Dec 2024.

If the user asks for something that is not a week e.g. days/weeks/months/years, you should generate the week that starts on the provided date and ends the appropiate days/weeks/months/years later, following the week always start on Monday and end on Sunday rule.
       

        Given the following input:

        ${input}

        
       "`,
        schema: z.object({
            academic_period: z.string().describe("This is the academic period name e.g. 'Semester 1'"), 
            academic_period_weeks: z.array(
                z.object({
                    number: z.string().describe("This is the academic period week number e.g. '1' for the first week, and '12' for the twelfth week"),
                    startDate: z.string().nullable().describe("format DD/MMM/YYYY - this is the start date of the academic period week. This is the first day of the week and all academic period weeks start on a Monday"),
                    endDate: z.string().nullable().describe("format DD/MMM/YYYY - this is the end date of the academic period week. This is the last day of the week and all academic period weeks end on a Sunday"),
                    dayCount: z.number().nullable().describe("This is the number of days in the academic period week"),
                })
            ).nullable().describe("This is the array of academic period weeks"),
        }),
    });
    return result.object;
};
