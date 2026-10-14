import type { ShikiConfig } from "astro";

type ShikiTransformer = NonNullable<ShikiConfig["transformers"]>[number];

const R = "#ff5d6a"; // keywords, tags, directives
const G = "#9fe0c0"; // strings
const M = "#57c7e3"; // functions, keys, flags
const V = "#e6b673"; // variables, numbers, attributes
const TEXT = "#cdd0da";
const COMMENT = "#8b8a95";

const theme: ShikiConfig["theme"] = {
    name: "laravel-fmt",
    type: "dark",
    colors: {
        "editor.background": "#141319",
        "editor.foreground": TEXT,
    },
    tokenColors: [
        { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: COMMENT } },
        { scope: ["keyword", "storage", "entity.name.tag", "support.function.construct"], settings: { foreground: R } },
        { scope: ["string", "string.quoted"], settings: { foreground: G } },
        {
            scope: [
                "entity.name.function",
                "support.function",
                "support.type.property-name",
                "constant.other.option",
                "entity.name.tag.yaml",
            ],
            settings: { foreground: M },
        },
        {
            scope: [
                "variable",
                "constant.numeric",
                "constant.language",
                "entity.other.attribute-name",
                "support.constant",
            ],
            settings: { foreground: V },
        },
        {
            scope: ["entity.name.command", "string.unquoted.argument", "entity.name.type"],
            settings: { foreground: TEXT },
        },
    ],
};

export const shiki = { theme } as const;

const labels: Record<string, string> = {
    sh: "Terminal",
    bash: "Terminal",
    shell: "Terminal",
    php: "PHP",
    blade: "Blade",
    html: "HTML",
    css: "CSS",
    json: "JSON",
    yaml: "YAML",
    markdown: "Markdown",
};

export const codeBlock: ShikiTransformer = {
    pre(node) {
        this.addClassToHast(
            node,
            "m-0 overflow-x-auto px-4 py-3.5 font-mono text-[13px] leading-5.25 focus-visible:outline-offset-[-2px]",
        );
    },
    root(hast) {
        // oxlint-disable-next-line no-underscore-dangle -- Shiki's name for the raw fence meta.
        const title = /title="([^"]+)"/.exec(this.options.meta?.__raw ?? "")?.[1];
        const label = title ?? labels[this.options.lang] ?? "Text";

        return {
            type: "root",
            children: [
                {
                    type: "element",
                    tagName: "div",
                    properties: {
                        class: "my-5.5 overflow-hidden rounded-[11px] border border-border bg-code-bg shadow-[0_8px_28px_-18px_rgba(0,0,0,0.7)] scheme-dark",
                    },
                    children: [
                        {
                            type: "element",
                            tagName: "div",
                            properties: {
                                class: "flex items-center justify-between border-b border-white/[0.07] bg-white/2 px-3 py-2",
                                dataPagefindIgnore: true,
                            },
                            children: [
                                {
                                    type: "element",
                                    tagName: "span",
                                    properties: { class: "font-mono text-[11px] tracking-[0.04em] text-[#8b8a95]" },
                                    children: [{ type: "text", value: label }],
                                },
                                {
                                    type: "element",
                                    tagName: "button",
                                    properties: {
                                        type: "button",
                                        class: "inline-flex cursor-pointer items-center rounded-md border border-white/10 bg-transparent px-2.25 py-1 font-mono text-[11px] text-[#8b8a95] transition-colors hover:border-white/20 hover:text-[#cdd0da] data-copied:text-[#7fd9ea]",
                                        dataCopyText: this.source,
                                    },
                                    children: [{ type: "text", value: "Copy" }],
                                },
                            ],
                        },
                        ...hast.children,
                    ],
                },
            ],
        };
    },
};
