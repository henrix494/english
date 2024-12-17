import { z } from "zod";
export const text_scema = z.object({
  text_and_questions: z.array(
    z.object({
      title: z.string().describe("Title of the text"),
      text_body: z.string().describe("Full body of the text"),
      possible_answers: z.array(
        z.object({
          questions: z
            .string()
            .describe(
              "5 questions  about the text from random areas in the whole text"
            ),
          possible_answers: z.array(
            z.object({
              answer: z.string().describe("4 Options for an Answer ."),
              is_true: z.boolean().describe("is answer correct"),
            })
          ),
        })
      ),
    })
  ),
});
