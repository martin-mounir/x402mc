import { createPaidMcpHandler } from "x402-mcp";
import z from "zod";
import { facilitator } from "@coinbase/x402";

const handler = createPaidMcpHandler(
  (server) => {
    server.paidTool(
      "get_random_number",
      "Get a random number between two numbers",
      { price: 0.001 },
      {
        min: z.number().int(),
        max: z.number().int(),
      },
      {},
      async (args) => {
        const randomNumber =
          Math.floor(Math.random() * (args.max - args.min + 1)) + args.min;
        return {
          content: [{ type: "text", text: randomNumber.toString() }],
        };
      }
    );
    server.paidTool(
      "add",
      "Add two numbers",
      { price: 0.01 },
      {
        a: z.number().int(),
        b: z.number().int(),
      },
      {},
      async (args) => {
        const result = args.a + args.b;
        return {
          content: [{ type: "text", text: result.toString() }],
        };
      }
    );
    server.tool(
      "hello-remote",
      "Receive a greeting",
      {
        name: z.string(),
      },
      {},
      async (args) => {
        return { content: [{ type: "text", text: `Hello ${args.name}` }] };
      }
    );
  },
  {
    serverInfo: {
      name: "test-mcp",
      version: "0.0.1",
    },
  },
  {
    recipient: process.env.X402_WALLET_ADDRESS as `0x${string}`,
    facilitator,
  }
);

export { handler as GET, handler as POST };
