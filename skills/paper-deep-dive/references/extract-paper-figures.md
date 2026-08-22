# Extract Paper Figures

Paper Deep Dive posts should use the paper's own figures. Prefer the arXiv LaTeX source because it preserves original figure files and crop parameters.

## 1. Prefer LaTeX Source

Download the arXiv source:

```bash
curl -L https://arxiv.org/e-print/<arxiv-id> -o /tmp/paper-src.tar.gz
tar -xzf /tmp/paper-src.tar.gz -C /tmp/paper-src
```

Find figure usages:

```bash
rg -n "includegraphics|begin\{figure|caption\{" /tmp/paper-src/*.tex
```

Inspect the source for useful figures:

- `setup.jpg` / overview images
- architecture PDFs or diagrams
- method figures
- experiment figures
- ablation figures

Reuse the paper's own `trim` and `width` parameters when cropping.

## 2. Crop a Figure PDF

LaTeX trim syntax is:

```text
\includegraphics[width=..., trim={left bottom right top}, clip]{figure.pdf}
```

Get the page size:

```bash
pdfinfo figure.pdf | rg "Page size"
```

Convert the LaTeX trim into a `pdfcrop --bbox`:

```text
bbox = left, bottom, page_width - right, page_height - top
```

Example for a `720x540` page with `trim={1cm 11.5cm 0 0}`:

```bash
pdfcrop --bbox '28.3465 326.0 720 540' --clip figure.pdf cropped.pdf
pdftocairo -f 1 -l 1 -png -r 200 -singlefile cropped.pdf cropped
```

Use `pdftocairo` or `pdftoppm` for rasterization instead of ImageMagick's PDF reader when possible.

## 3. PDF-Only Fallback

If LaTeX source is unavailable:

```bash
curl -L https://arxiv.org/pdf/<arxiv-id> -o /tmp/paper.pdf
pdftoppm -f <page> -l <page> -r 200 -png /tmp/paper.pdf /tmp/figure
```

Then crop with ImageMagick:

```bash
convert /tmp/figure-<page>.png -crop WxH+X+Y +repage /tmp/figure-crop.png
```

Keep readable labels and avoid cutting off captions or diagram text.

## 4. Choose Figures

Use 3-6 relevant figures per post:

- Overview / system figure
- Overall architecture
- Method or module diagram
- Task or environment setup
- Main results or ablation

Do not include every figure. Select figures that the text actually explains.

## 5. Upload and Insert

Upload the extracted images to the blog image host:

```bash
pnpm images:upload -- --dry-run --remote-dir blog/paper-deep-dive-<slug> /tmp/figure-*.png
pnpm images:upload -- --remote-dir blog/paper-deep-dive-<slug> /tmp/figure-*.png
```

Insert the uploaded URL into the matching MDX section:

```mdx
![<figure name> from paper Figure <N>](https://pic.hana0721.top/blog/paper-deep-dive-<slug>/<uploaded-file>.webp)
```

If no source or PDF is available, state that clearly in the post instead of inventing a figure.
