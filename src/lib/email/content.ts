import "server-only";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export function interpolateEmail(
  value: string,
  variables: Readonly<Record<string, string>>,
) {
  return value.replace(
    /\{\{(name|company|service|budget)\}\}/g,
    (_match, key: string) => variables[key] ?? "",
  );
}

export function richTextToHtml(value: string) {
  const inline = (line: string) =>
    escapeHtml(line)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/_(.+?)_/g, "<em>$1</em>");
  const blocks = value
    .trim()
    .split(/\n{2,}/)
    .map((block) => {
      const lines = block.split("\n");
      if (lines.every((line) => line.startsWith("- ")))
        return `<ul>${lines.map((line) => `<li>${inline(line.slice(2))}</li>`).join("")}</ul>`;
      return `<p>${lines.map(inline).join("<br>")}</p>`;
    });
  return blocks.join("");
}
