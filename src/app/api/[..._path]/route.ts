import { initApiPassthrough } from "langgraph-nextjs-api-passthrough";

// This file acts as a proxy for requests to your LangGraph server.
// Read the [Going to Production](https://github.com/langchain-ai/agent-chat-ui?tab=readme-ov-file#going-to-production) section for more information.

// Get the backend API URL from environment variable, defaulting to localhost for development
const BACKEND_API_URL = process.env.LANGGRAPH_API_URL || process.env.BACKEND_API_URL || "http://localhost:2024";
const BACKEND_API_KEY = process.env.LANGSMITH_API_KEY || process.env.BACKEND_API_KEY || undefined;

export const { GET, POST, PUT, PATCH, DELETE, OPTIONS, runtime } =
  initApiPassthrough({
    apiUrl: BACKEND_API_URL,
    apiKey: BACKEND_API_KEY,
    runtime: "edge", // default
  });
