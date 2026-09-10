/**
 * WebMCP's declarative tool attributes, as JSX props.
 *
 * `toolname` and `tooldescription` come from the W3C WebMCP draft. They mark a
 * control as an agent-callable tool in the markup itself, so a static scan of the
 * HTML sees it without running JavaScript. React passes unknown all-lowercase
 * attributes through to the DOM, so only this declaration is needed.
 */
declare module "react" {
  interface HTMLAttributes<T> {
    /** WebMCP: the tool name an agent invokes this control by. */
    toolname?: string;
    /** WebMCP: what invoking this control does, in plain language. */
    tooldescription?: string;
  }
}

export {};
