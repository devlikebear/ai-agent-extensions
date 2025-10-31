"""
Claude Agent SDK - Python Example
Simple agent that analyzes code and provides recommendations
"""

import asyncio
import os
from claude_agent_sdk import ClaudeSDKClient, ClaudeAgentOptions


async def main():
    """Main agent function"""

    # Configure agent options
    options = ClaudeAgentOptions(
        model="claude-sonnet-4-20250514",
        cwd=os.getcwd(),
        system_prompt="""You are a helpful coding assistant.
Analyze code, suggest improvements, and help with debugging.
Always provide clear explanations for your recommendations.""",
        permission_mode="default",  # Require user confirmation
        allowed_tools=["Read", "Grep", "Edit", "Bash"],
    )

    # Create client with context manager
    async with ClaudeSDKClient(options=options) as client:
        print("🤖 Claude Agent started!")
        print("Type 'quit' to exit\n")

        while True:
            # Get user input
            user_input = input("You: ")

            if user_input.lower() in ["quit", "exit", "q"]:
                print("Goodbye!")
                break

            # Send query to agent
            await client.query(user_input)

            # Process response
            async for message in client.receive_response():
                if message.type == "assistant":
                    # Print assistant's response
                    for content in message.content:
                        if content["type"] == "text":
                            print(f"\n🤖 Assistant: {content['text']}\n")

                elif message.type == "result":
                    # Print usage statistics
                    if message.error:
                        print(f"❌ Error: {message.error}\n")
                    else:
                        print(f"✅ Task completed!")
                        if message.usage:
                            print(f"📊 Tokens used: {message.usage.get('total_tokens', 'N/A')}\n")


if __name__ == "__main__":
    # Load API key from environment
    if not os.getenv("ANTHROPIC_API_KEY"):
        print("❌ Error: ANTHROPIC_API_KEY environment variable not set")
        print("Please set your API key:")
        print("  export ANTHROPIC_API_KEY='your-api-key'")
        exit(1)

    # Run agent
    asyncio.run(main())
