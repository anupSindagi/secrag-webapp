/**
 * Determines if we should use the API proxy (Next.js /api route) instead of direct connection.
 * This is needed when:
 * - The page is loaded over HTTPS, but the backend API is HTTP (mixed content issue)
 * - Or when explicitly configured via environment variable
 */
export function getApiUrl(backendUrl: string | undefined): string {
  if (!backendUrl) {
    return "";
  }

  // If explicitly configured to use proxy, use it
  const useProxy = process.env.NEXT_PUBLIC_USE_API_PROXY === "true";

  // Check if we're in browser and on HTTPS
  const isHttps =
    typeof window !== "undefined" && window.location.protocol === "https:";

  // Check if backend URL is HTTP
  const isHttpBackend = backendUrl.startsWith("http://");

  // Use proxy if:
  // 1. Explicitly configured to use proxy, OR
  // 2. We're on HTTPS and backend is HTTP (to avoid mixed content)
  if (useProxy || (isHttps && isHttpBackend)) {
    // Use absolute URL for /api path which will proxy to the backend
    // The SDK requires an absolute URL, so we need to prepend the origin
    if (typeof window !== "undefined") {
      return `${window.location.origin}/api`;
    }
    // Fallback for server-side (shouldn't normally happen, but just in case)
    return "/api";
  }

  // Otherwise, use the backend URL directly
  return backendUrl;
}

/**
 * Gets the actual backend URL for server-side use (for API passthrough configuration)
 */
export function getBackendUrl(): string {
  return (
    process.env.LANGGRAPH_API_URL ||
    process.env.BACKEND_API_URL ||
    "http://localhost:2024"
  );
}
