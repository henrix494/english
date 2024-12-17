import { z } from "zod";

// Define the schema
export const text_schema = z.object({
  text_and_questions: z.array(
    z.object({
      title: z.string().describe("The title of the text."),

      text_body: z
        .array(z.string())
        .min(3, "The text body must have at least 3 sections ")
        .describe(
          "An array of sections representing the text body. Split the text into at least 3 meaningful sections ."
        ),

      possible_answers: z.array(
        z.object({
          questions: z
            .string()
            .describe(
              "A question related to the text. There must be 5 questions covering random areas of the text."
            ),

          possible_answers: z
            .array(
              z.object({
                answer: z
                  .string()
                  .describe(
                    "An option for the answer. There must be exactly 4 options for each question."
                  ),
                is_true: z
                  .boolean()
                  .describe("Indicates whether the answer is correct."),
              })
            )
            .length(4, "Each question must have exactly 4 possible answers."),
        })
      ),
    })
  ),
});
