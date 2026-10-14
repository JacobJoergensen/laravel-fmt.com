# Contributing

This repository is the Laravel Fmt website and its documentation. For bugs in the package itself, use the [laravel-fmt](https://github.com/jacobjoergensen/laravel-fmt/issues) repository instead.

## Reporting bugs

[Open an issue](https://github.com/jacobjoergensen/laravel-fmt.com/issues/new/choose) and fill in the bug report. Say which page, which browser, and which theme you were in.

## Fixing the docs

Every docs page has an "Edit this page" link in the top right. For a typo or a clearer sentence, that is the whole workflow. No issue needed.

The pages live in `src/content/docs` as MDX. Each one starts with frontmatter:

```yaml
---
title: CLI
description: Every laravel-fmt command, flag, and exit code.
group: Usage
order: 10
---
```

`group` is the sidebar heading, one of Introduction, Usage, Configuration, Workflow or Reference. `order` is the position within it. The `description` shows under the page title and as the meta description, so write a sentence, not a label. Quote any value containing a colon, or the build will fail to parse the frontmatter.

Code goes in a fenced block with a language. Add `title` to label it with a file name:

````md
```json title="laravel-fmt.json"
{
  "printWidth": 100
}
```
````

Check every claim against the [laravel-fmt](https://github.com/jacobjoergensen/laravel-fmt) source.

Match the voice of the surrounding pages. Short sentences, no filler, and say what the code does rather than what it lets you do.

## Setup

Node 24 or newer, with pnpm:

```sh
pnpm install
pnpm dev
```

## Pull requests

For anything beyond a small fix, [file an issue](https://github.com/jacobjoergensen/laravel-fmt.com/issues/new?template=feature.yml) first. It saves time on both sides if the answer is no.

Branch from `main`. Keep the diff focused, and don't bundle a change with a reformat.

## Checks

```sh
pnpm test:lint    # oxlint, and oxfmt in check mode
pnpm lint         # same, but writes the fixes
pnpm build        # catches broken content and frontmatter
```

CI runs `pnpm test:lint` and `pnpm build` on every pull request. Both have to pass.
