"""
Custom Tool Example - Weather Tool
Demonstrates how to create a custom tool for Claude Agent SDK
"""

import asyncio
import json
from typing import Any
from claude_agent_sdk import tool, create_sdk_mcp_server, ClaudeSDKClient, ClaudeAgentOptions


# Define a custom tool using @tool decorator
@tool(
    name="get-weather",
    description="Get current weather information for a specific location",
    input_schema={
        "type": "object",
        "properties": {
            "location": {
                "type": "string",
                "description": "City name or ZIP code"
            },
            "units": {
                "type": "string",
                "enum": ["celsius", "fahrenheit"],
                "description": "Temperature units",
                "default": "celsius"
            }
        },
        "required": ["location"]
    }
)
async def get_weather(args: dict[str, Any]) -> dict[str, Any]:
    """
    Get weather information for a location
    In a real implementation, this would call a weather API
    """
    location = args["location"]
    units = args.get("units", "celsius")

    # Simulated weather data (replace with actual API call)
    weather_data = {
        "location": location,
        "temperature": 22 if units == "celsius" else 72,
        "units": units,
        "conditions": "Partly cloudy",
        "humidity": 65,
        "wind_speed": 15
    }

    return {
        "content": [{
            "type": "text",
            "text": json.dumps(weather_data, indent=2)
        }]
    }


# Another example tool - Calculator
@tool(
    name="calculate",
    description="Perform mathematical calculations",
    input_schema={
        "type": "object",
        "properties": {
            "expression": {
                "type": "string",
                "description": "Mathematical expression to evaluate (e.g., '2 + 2', '10 * 5')"
            }
        },
        "required": ["expression"]
    }
)
async def calculate(args: dict[str, Any]) -> dict[str, Any]:
    """
    Safely evaluate mathematical expressions
    """
    expression = args["expression"]

    try:
        # WARNING: eval() is dangerous! Use a proper math parser in production
        # This is just for demonstration purposes
        result = eval(expression, {"__builtins__": {}}, {})

        return {
            "content": [{
                "type": "text",
                "text": f"Result: {result}"
            }]
        }
    except Exception as e:
        return {
            "content": [{
                "type": "text",
                "text": f"Error: {str(e)}"
            }],
            "isError": True
        }


# Create MCP server with custom tools
def create_tools_server():
    """Create an MCP server with custom tools"""
    return create_sdk_mcp_server(
        name="custom-tools",
        tools=[get_weather, calculate]
    )


# Example: Using the custom tools in an agent
async def main():
    """Demonstrate using custom tools in an agent"""

    # Create the MCP server
    tools_server = create_tools_server()

    # Configure agent with custom tools
    options = ClaudeAgentOptions(
        model="claude-sonnet-4-20250514",
        system_prompt="You are a helpful assistant with access to weather and calculator tools.",
        permission_mode="acceptEdits",
        mcp_servers={
            "custom-tools": {
                "server": tools_server
            }
        }
    )

    async with ClaudeSDKClient(options=options) as client:
        # Example queries that use the custom tools
        queries = [
            "What's the weather like in Tokyo?",
            "Calculate 25 * 4 + 10",
            "Convert the temperature in Paris to Fahrenheit"
        ]

        for query in queries:
            print(f"\n🔍 Query: {query}")

            await client.query(query)

            async for message in client.receive_response():
                if message.type == "assistant":
                    for content in message.content:
                        if content["type"] == "text":
                            print(f"🤖 Response: {content['text']}")

                elif message.type == "result":
                    if message.error:
                        print(f"❌ Error: {message.error}")
                    else:
                        print("✅ Completed")


if __name__ == "__main__":
    print("Custom Tool Example - Weather and Calculator\n")
    asyncio.run(main())
