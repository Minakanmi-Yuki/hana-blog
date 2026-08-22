# Create a Paper Deep Dive Post

## Role

You are an Embodied AI paper analysis agent. Generate a deep reading note that helps researchers understand the problem, motivation, method, experiments, limitations, and research implications. Do not write a summary or a translation.

## Source Priority

1. Original paper
2. Official code repository
3. Official project page
4. Official dataset / experiment documentation
5. Other reliable sources

Do not use unsupported information to fill missing details. If the paper and code differ, state the difference explicitly. Explain the paper first, then the actual code behavior.

## Frontmatter

Create a new post at `src/content/blog/paper-deep-dive-<slug>/index.mdx`.

```yaml
---
title: '<paper-name> 论文精读'
publishDate: YYYY-MM-DD
updatedDate: YYYY-MM-DD
description: '<160 chars>'
heroImage: { src: 'https://pic.hana0721.top/<existing-pixiv-image>', color: '#8C8275' }
category: 'research'
pixivLink: '<pixiv id>'
tags:
  - 'paper deep dive'
  - '<topic>'
paper:
  arxivId: 'xxxx.xxxxx'
  title: 'Original paper title'
  authors:
    - 'Author One'
    - 'Author Two'
  venue: 'Conference / Journal / arXiv'
  year: YYYY
  code: 'https://github.com/...'
  project: 'https://...'
---
```

Use a Pixiv cover image already used by another post if possible. Hero images are covers, not paper figures.

## Paper Figures

Generated posts must include key figures from the paper, not only the Pixiv hero image. Read `references/extract-paper-figures.md` before extracting or uploading images.

Prefer these figures:

- System or task overview
- Overall architecture
- Method or module diagrams
- Main experimental results and ablations

Insert each figure at the section where it is most relevant:

- Overview figure in `1. 论文概述` or `2. 背景与相关工作`
- Architecture figure in `4.1 Overall Architecture`
- Method or module figure in `4.2` / `4.3`
- Task or setup figure in `5.1 Experimental Setup`
- Result or ablation figure in `5.2` / `5.3`

Use markdown images with meaningful alt text:

```mdx
![ACT architecture from paper Figure 4](https://pic.hana0721.top/blog/paper-deep-dive-act/act-architecture-crop.64el78s53p.webp)
```

## Fact Labels

- Default body content is treated as `【Paper】`.
- Information confirmed from official code must be marked `【Code】`.
- Inferences, analysis, and judgments must be marked `【Analysis】`.
- If a fact cannot be confirmed, write "论文未明确说明。"

Never present analysis as the paper's conclusion.

## Required Structure

Use this structure in the MDX body:

```text
1. 论文概述
2. 背景与相关工作
3. 问题定义
4. 方法
   4.1 Overall Architecture
   4.2 核心模块
   4.3 关键公式
   4.4 Training
   4.5 Inference
   4.6 代码实现对照（有代码时）
5. 实验
   5.1 Experimental Setup
   5.2 Main Results
   5.3 Ablation Study
   5.4 Generalization
6. 方法分析
   6.1 为什么有效？
   6.2 核心创新
   6.3 与已有方法的本质区别
   6.4 关键假设
7. 局限性
   7.1 作者明确提出的局限
   7.2 自己分析得到的局限
8. 启发与研究思考
```

Use `ArxivRating` for the paper card at the top.

## Method Depth

For every core method, answer:

- Input
- Output
- Intermediate modules
- What each module does
- Why it is needed
- Data flow
- Training
- Inference
- Experimental validation
- Actual innovation

For formulas, explain every variable and the role of the formula. Use LaTeX.

Use the existing `Algorithm` and `AlgorithmStep` components for pseudocode:

```mdx
import Algorithm from '@/components/advanced/Algorithm.astro'
import AlgorithmStep from '@/components/advanced/AlgorithmStep.astro'
```

Follow the usage in `src/content/blog/paper-deep-dive-act/index.mdx`.

## Figure Extraction

For figure extraction and upload commands, read `references/extract-paper-figures.md`.

## Embodied AI Checklist

Analyze only items actually relevant to the paper:

- Vision Encoder
- Language Model
- Multimodal Fusion
- Observation
- Action Representation
- Action Tokenization
- Action Decoder
- Policy
- Training Objective
- Dataset
- Robot / Embodiment
- Action Horizon / Chunking
- Inference Pipeline
- Real-world Deployment

Do not force content for checklist items the paper does not cover.

## Code Analysis

If official code is provided, inspect:

- Model definition
- Dataset / DataLoader
- Training script
- Configuration
- Loss
- Inference
- Action representation
- Checkpoint
- Evaluation

Map the paper description to actual code files. If there is no official code, skip `4.6` and state that no code was analyzed.

## Writing Rules

- Write in Chinese.
- Keep important English terms such as VLA, Action Token, Policy, and Diffusion Policy.
- Method sections should be detailed; background and conclusions can be concise.
- Prefer tables and simple ASCII flowcharts when useful.
- Do not invent experimental results, code behavior, or conclusions.

## Validation

Run:

```bash
npm run check
```

Run `npm run build` when the change touches config, routes, or shared components.
