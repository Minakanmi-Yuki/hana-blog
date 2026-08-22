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

## 3. Crop a Raster Figure

When `\includegraphics` references a raster image such as `setup.jpg`, use the source image dimensions and the LaTeX `trim` values.

For raster images, the source pixel dimensions correspond to the LaTeX natural size in points at 72 dpi. Convert the `trim` lengths to points with:

```text
1 cm = 28.3465 bp
```

Then crop with ImageMagick:

```text
x = left_bp
y = top_bp
width = source_pixel_width - left_bp - right_bp
height = source_pixel_height - top_bp - bottom_bp
```

Example for a `3000x2250` source with `trim={0.3cm 44.35cm 0.3cm 0.5cm}`:

```bash
convert source.jpg -crop 2983x979+8+14 +repage cropped.png
identify cropped.png
```

Check the output aspect ratio. If the crop looks like a narrow strip or leaves large white margins, recalculate the trim before uploading.

## 4. PDF-Only Fallback

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

## 5. Choose Figures

Use 3-6 relevant figures per post:

- Overview / system figure
- Overall architecture
- Method or module diagram
- Task or environment setup
- Main results or ablation

Do not include every figure. Select figures that the text actually explains.

## 6. Upload and Insert

Upload the extracted images to the blog image host:

```bash
pnpm images:upload -- --dry-run --remote-dir blog/paper-deep-dive-<slug> /tmp/figure-*.png
pnpm images:upload -- --remote-dir blog/paper-deep-dive-<slug> /tmp/figure-*.png
```

Insert the uploaded URL into the matching MDX section:

```mdx
![<figure name> from paper Figure <N>](https://pic.hana0721.top/blog/paper-deep-dive-<slug>/<uploaded-file>.webp)
```

For wide or previously problematic images, use an explicit responsive `img` tag:

```mdx
<img
  src='https://pic.hana0721.top/blog/paper-deep-dive-<slug>/<uploaded-file>.webp'
  alt='<figure name> from paper Figure <N>'
  class='zoomable'
  width='<pixel width>'
  height='<pixel height>'
  loading='lazy'
  decoding='async'
  style='max-width:100%; height:auto;'
/>
```

## 7. CDN Fallback

`pic.hana0721.top` may return a cached 404 for newly uploaded files. After uploading, verify the custom-domain URL:

```bash
curl -sS -o /dev/null -w '%{http_code}\n' \
  'https://pic.hana0721.top/blog/paper-deep-dive-<slug>/<uploaded-file>.webp'
```

If it returns 404 while the GitHub raw URL returns 200, use the raw URL for that image:

```text
https://raw.githubusercontent.com/Minakanmi-Yuki/picx-images-hosting/master/blog/paper-deep-dive-<slug>/<uploaded-file>.webp
```

Prefer the custom domain after the CDN cache has refreshed; use raw as a temporary fallback so readers can load the image immediately.

If no source or PDF is available, state that clearly in the post instead of inventing a figure.
