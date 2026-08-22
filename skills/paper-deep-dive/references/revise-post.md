# Revise a Paper Deep Dive Post from Reader Feedback

## Input

The user should provide:

- The target post slug or URL, for example `paper-deep-dive-act`.
- Reader feedback. It may be raw comments, a review, or a list of requested changes.

If the target or feedback is missing, ask before guessing.

## Workflow

1. Read the existing post and its frontmatter.
2. Read any linked paper, code, project page, or dataset that is needed to verify feedback.
3. Classify each feedback item:
   - **Accuracy**: numbers, formulas, citations, paper facts, code facts.
   - **Clarity**: confusing explanations, missing variable definitions, ambiguous terms.
   - **Structure**: missing sections, wrong heading levels, excessive length.
   - **Depth**: missing modules, training/inference details, experiments, limitations.
   - **Format**: LaTeX, tables, pseudocode components, labels, links, frontmatter.
4. Verify before editing:
   - If feedback claims a factual error, confirm it against the paper or code.
   - If feedback conflicts with the paper, keep the paper fact and tell the user.
   - If feedback is a subjective request, apply it only when it improves the post without introducing unsupported claims.
5. Plan edits in order:
   - Fix accuracy first.
   - Improve clarity and structure next.
   - Add or condense depth based on the feedback.
   - Fix formatting and metadata last.
6. Apply edits:
   - Preserve the slug unless the user asks to change it.
   - Keep `category: 'research'` and the `paper-deep-dive-` prefix.
   - Keep or refine `paper` frontmatter metadata.
   - Update `updatedDate` to the current date.
   - If `description` or `title` changes, respect schema limits.
   - Keep `【Paper】`, `【Code】`, and `【Analysis】` labels accurate.
   - Keep using `Algorithm` / `AlgorithmStep` for pseudocode.
   - Keep the required structure unless the user explicitly requests a structural change.
7. Validate:

```bash
npm run check
```

Run `npm run build` when the change touches config, routes, or shared components.

## Feedback Mapping Examples

| Feedback           | Action                                                                                                |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| "这个数字不对"     | Verify against the paper/code, correct it, and keep the correct label.                                |
| "4.1 看不懂"       | Rewrite the data-flow explanation and ASCII diagram.                                                  |
| "缺少训练细节"     | Add Training Data, Loss, Optimizer, and pipeline details from the paper/code.                         |
| "文章太长"         | Condense optional sections such as related work and research directions; keep method and experiments. |
| "伪代码格式不统一" | Replace plain algorithm text with `Algorithm` / `AlgorithmStep`.                                      |
| "公式变量没解释"   | Add variable definitions to every formula.                                                            |

## Output

Report the changes you made and the validation commands you ran. If reader feedback could not be applied because it conflicts with the source material, explain why.
