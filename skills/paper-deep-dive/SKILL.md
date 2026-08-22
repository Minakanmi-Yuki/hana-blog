---
name: paper-deep-dive
description: Generate and revise Embodied AI paper deep dive blog posts in the hana-blog repository. Use when the user provides a paper and optional code/project/dataset links and wants a one-paper-per-post Chinese blog in the Paper Deep Dive collection, or when the user asks to improve or rewrite an existing paper-deep-dive-* post based on reader feedback.
---

# Paper Deep Dive

## Overview

Create one Embodied AI paper deep dive post per paper under `src/content/blog/paper-deep-dive-<slug>/index.mdx`. The skill also revises existing posts from reader feedback while preserving factual accuracy.

## Workflow

Choose one workflow:

- **Generate post**: read `references/create-post.md`, copy `assets/post-template.mdx`, follow the generation workflow, then validate.
- **Revise post**: read `references/revise-post.md`, apply feedback to the existing post, then validate.

## Shared Requirements

- Write in Chinese and keep important English technical terms.
- Do not create an English `index-en` version unless the user explicitly asks.
- Use `category: 'research'` and the slug prefix `paper-deep-dive-`.
- Use a Pixiv hero image already used by another post if possible; avoid images reused many times.
- Mark facts with `【Paper】`, `【Code】`, and `【Analysis】`.
- Include key paper figures such as the system overview, architecture, method diagrams, and experimental results.
- Use `Algorithm` and `AlgorithmStep` components for pseudocode.
- Use `ArxivRating` at the top of generated posts.
- Write one post per paper.
- Update `updatedDate` when revising a post.
- Validate with `npm run check`; run `npm run build` for route, config, or shared component changes.

## Resources

- `references/create-post.md`: detailed generation workflow, structure, fact-label rules, and validation.
- `references/extract-paper-figures.md`: how to extract figures from arXiv LaTeX source or PDF fallback and upload them.
- `references/revise-post.md`: feedback revision workflow and feedback classification.
- `assets/post-template.mdx`: copyable MDX skeleton for new posts.
