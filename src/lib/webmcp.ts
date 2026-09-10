/**
 * WebMCP: in-page tools for browser-resident AI agents.
 *
 * A W3C draft. An agent running inside the browser can call tools the page
 * registers, so it operates this site the way a person does instead of guessing
 * at URLs. `document.modelContext` is the current API; `navigator.modelContext`
 * was the origin-trial alias and is probed as a fallback. Everything is
 * feature-detected and does nothing in browsers without it.
 */

export type WebMcpToolResult = {
  content: { type: "text"; text: string }[];
  isError?: boolean;
};

export type WebMcpTool = {
  name: string;
  description: string;
  /** JSON Schema for the arguments. Omit for a tool that takes none. */
  inputSchema?: Record<string, unknown>;
  execute: (args: Record<string, unknown>) => Promise<WebMcpToolResult> | WebMcpToolResult;
};

type ModelContext = {
  registerTool?: (tool: unknown) => (() => void) | void;
  provideContext?: (context: { tools: unknown[] }) => void;
};

function modelContext(): ModelContext | null {
  if (typeof window === "undefined") return null;
  const fromDocument = (document as unknown as { modelContext?: ModelContext }).modelContext;
  if (fromDocument) return fromDocument;
  const fromNavigator = (navigator as unknown as { modelContext?: ModelContext }).modelContext;
  return fromNavigator ?? null;
}

export function toolJson(value: unknown): WebMcpToolResult {
  return { content: [{ type: "text", text: JSON.stringify(value, null, 2) }] };
}

export function toolError(message: string): WebMcpToolResult {
  return { isError: true, content: [{ type: "text", text: message }] };
}

/** Registers tools and returns a cleanup. A no-op where WebMCP is unavailable. */
export function registerWebMcpTools(tools: WebMcpTool[]): () => void {
  const context = modelContext();
  if (!context) return () => {};

  const shaped = tools.map((tool) => ({
    name: tool.name,
    description: tool.description,
    inputSchema: tool.inputSchema ?? { type: "object", properties: {} },
    execute: (args: unknown) => tool.execute((args ?? {}) as Record<string, unknown>),
  }));

  if (typeof context.registerTool === "function") {
    const cleanups: Array<(() => void) | undefined> = shaped.map((tool) => {
      try {
        const result = context.registerTool?.(tool);
        return typeof result === "function" ? result : undefined;
      } catch {
        return undefined;
      }
    });
    return () => cleanups.forEach((cleanup) => cleanup?.());
  }

  if (typeof context.provideContext === "function") {
    try {
      context.provideContext({ tools: shaped });
    } catch {
      // Older shape without cleanup. Nothing to undo.
    }
  }
  return () => {};
}
