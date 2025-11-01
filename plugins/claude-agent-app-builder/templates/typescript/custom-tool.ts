/**
 * Custom Tool Example - Weather Tool
 * Demonstrates how to create custom tools for Claude Agent SDK
 */

import { tool, createSdkMcpServer, ClaudeSDKClient } from '@anthropic-ai/claude-agent-sdk';
import { z } from 'zod';

/**
 * Weather Tool - Get current weather information
 */
const weatherTool = tool(
  'get-weather',
  'Get current weather information for a specific location',
  z.object({
    location: z.string().describe('City name or ZIP code'),
    units: z.enum(['celsius', 'fahrenheit']).optional().describe('Temperature units'),
  }),
  async (args) => {
    // Simulated weather data (replace with actual API call)
    const weatherData = {
      location: args.location,
      temperature: args.units === 'fahrenheit' ? 72 : 22,
      units: args.units ?? 'celsius',
      conditions: 'Partly cloudy',
      humidity: 65,
      wind_speed: 15,
    };

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(weatherData, null, 2),
        },
      ],
    };
  }
);

/**
 * Calculator Tool - Perform mathematical calculations
 */
const calculatorTool = tool(
  'calculate',
  'Perform mathematical calculations',
  z.object({
    expression: z.string().describe("Mathematical expression to evaluate (e.g., '2 + 2', '10 * 5')"),
  }),
  async (args) => {
    try {
      // WARNING: eval() is dangerous! Use a proper math parser in production
      // This is just for demonstration purposes
      const result = Function(`"use strict"; return (${args.expression})`)();

      return {
        content: [
          {
            type: 'text' as const,
            text: `Result: ${result}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          },
        ],
        isError: true,
      };
    }
  }
);

/**
 * Create MCP server with custom tools
 */
function createToolsServer() {
  return createSdkMcpServer({
    name: 'custom-tools',
    version: '1.0.0',
    tools: [weatherTool, calculatorTool],
  });
}

/**
 * Example: Using the custom tools in an agent
 */
async function main() {
  console.log('Custom Tool Example - Weather and Calculator\n');

  // Create the MCP server
  const toolsServer = createToolsServer();

  // Configure agent with custom tools
  const client = new ClaudeSDKClient({
    model: 'claude-sonnet-4-20250514',
    systemPrompt: 'You are a helpful assistant with access to weather and calculator tools.',
    permissionMode: 'acceptEdits',
    mcpServers: {
      'custom-tools': {
        server: toolsServer,
      },
    },
  });

  try {
    // Example queries that use the custom tools
    const queries = [
      "What's the weather like in Tokyo?",
      'Calculate 25 * 4 + 10',
      'Convert the temperature in Paris to Fahrenheit',
    ];

    for (const query of queries) {
      console.log(`\n🔍 Query: ${query}`);

      await client.query(query);

      for await (const message of client.receiveResponse()) {
        if (message.type === 'assistant') {
          for (const content of message.content) {
            if (content.type === 'text') {
              console.log(`🤖 Response: ${content.text}`);
            }
          }
        } else if (message.type === 'result') {
          if (message.error) {
            console.error(`❌ Error: ${message.error}`);
          } else {
            console.log('✅ Completed');
          }
        }
      }
    }
  } finally {
    await client.close();
  }
}

// Run the example
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
