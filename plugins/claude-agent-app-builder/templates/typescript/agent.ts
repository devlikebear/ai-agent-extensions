/**
 * Claude Agent SDK - TypeScript Example
 * Simple agent that analyzes code and provides recommendations
 */

import { ClaudeSDKClient } from '@anthropic-ai/claude-agent-sdk';
import * as readline from 'readline/promises';

async function main() {
  // Check for API key
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ Error: ANTHROPIC_API_KEY environment variable not set');
    console.error('Please set your API key:');
    console.error('  export ANTHROPIC_API_KEY="your-api-key"');
    process.exit(1);
  }

  // Create readline interface for user input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Configure agent
  const client = new ClaudeSDKClient({
    model: 'claude-sonnet-4-20250514',
    cwd: process.cwd(),
    systemPrompt: `You are a helpful coding assistant.
Analyze code, suggest improvements, and help with debugging.
Always provide clear explanations for your recommendations.`,
    permissionMode: 'default', // Require user confirmation
    allowedTools: ['Read', 'Grep', 'Edit', 'Bash'],
  });

  console.log('🤖 Claude Agent started!');
  console.log("Type 'quit' to exit\n");

  try {
    while (true) {
      // Get user input
      const userInput = await rl.question('You: ');

      if (['quit', 'exit', 'q'].includes(userInput.toLowerCase())) {
        console.log('Goodbye!');
        break;
      }

      // Send query to agent
      await client.query(userInput);

      // Process response
      for await (const message of client.receiveResponse()) {
        if (message.type === 'assistant') {
          // Print assistant's response
          for (const content of message.content) {
            if (content.type === 'text') {
              console.log(`\n🤖 Assistant: ${content.text}\n`);
            }
          }
        } else if (message.type === 'result') {
          // Print usage statistics
          if (message.error) {
            console.error(`❌ Error: ${message.error}\n`);
          } else {
            console.log('✅ Task completed!');
            if (message.usage) {
              console.log(`📊 Tokens used: ${message.usage.total_tokens ?? 'N/A'}\n`);
            }
          }
        }
      }
    }
  } finally {
    // Clean up
    await client.close();
    rl.close();
  }
}

// Run the agent
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
