export function CodeBlock({ code, caption }: { code: string; caption?: string }) {
  return (
    <pre className="code">
      {caption ? <div className="caption">{caption}</div> : null}
      <code>{code}</code>
    </pre>
  )
}
