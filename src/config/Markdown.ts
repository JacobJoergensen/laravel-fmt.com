export function toMarkdown(title: string, description: string, body: string): string {
    const content = body
        .replace(/^import .+;\n/gm, "")
        .replace(/<Callout label="(.+?)">([\s\S]+?)<\/Callout>/g, (_, label: string, text: string) => {
            return `> **${label}:** ${text.trim().replace(/\s+/g, " ")}`;
        })
        .replace(/<div class="note">([\s\S]+?)<\/div>/g, (_, text: string) => text.trim())
        .replaceAll("&nbsp;", " ")
        .trim();

    return `# ${title}\n\n${description}\n\n${content}\n`;
}
