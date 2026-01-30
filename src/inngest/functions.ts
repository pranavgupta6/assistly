import { openai, createAgent } from "@inngest/agent-kit";

import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert next.js developer. You write readable, maintanable code. You write simple Next.js & React code snippets.",
      model: openai({
         model : "gpt-4o-mini",
         apiKey : process.env.AI_PIPE_TOKEN,
         baseUrl : process.env.AI_PIPE_BASE_URL

      }),
    });

    const { output } = await codeAgent.run(
      `Write the following snippet: ${event.data.value}`
    );

    return { output }
  },
);