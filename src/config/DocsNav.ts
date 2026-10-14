import { getCollection } from "astro:content";

export interface DocsNavItem {
    title: string;
    slug?: string;
    href?: string;
}

export interface DocsNavGroup {
    group: string;
    items: DocsNavItem[];
}

export interface DocsSiblings {
    prev: DocsSequenceItem | undefined;
    next: DocsSequenceItem | undefined;
}

export interface DocsSequenceItem {
    title: string;
    slug: string;
}

const extraItems: Record<string, DocsNavItem[]> = {
    Reference: [
        {
            title: "Contributing",
            href: "https://github.com/jacobjoergensen/laravel-fmt/blob/main/.github/CONTRIBUTING.md",
        },
    ],
};

export async function getDocsNav(): Promise<DocsNavGroup[]> {
    const entries = await getCollection("docs");
    const sorted = entries.toSorted((a, b) => a.data.order - b.data.order);

    const groups = new Map<string, DocsNavItem[]>();

    for (const entry of sorted) {
        const items = groups.get(entry.data.group) ?? [];

        items.push({ title: entry.data.title, slug: entry.id });
        groups.set(entry.data.group, items);
    }

    for (const [group, items] of Object.entries(extraItems)) {
        groups.set(group, [...(groups.get(group) ?? []), ...items]);
    }

    return Array.from(groups, ([group, items]) => ({ group, items }));
}

export function groupForSlug(nav: DocsNavGroup[], slug: string): string | undefined {
    for (const g of nav) {
        if (g.items.some((it) => it.slug === slug)) {
            return g.group;
        }
    }

    return undefined;
}

export function siblingsForSlug(nav: DocsNavGroup[], slug: string): DocsSiblings {
    const sequence: DocsSequenceItem[] = [];

    for (const item of nav.flatMap((g) => g.items)) {
        if (item.slug !== undefined && item.slug !== "changelog") {
            sequence.push({ title: item.title, slug: item.slug });
        }
    }

    const index = sequence.findIndex((it) => it.slug === slug);

    if (index === -1) {
        return { prev: undefined, next: undefined };
    }

    return { prev: sequence[index - 1], next: sequence[index + 1] };
}
