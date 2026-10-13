# RViz 截图源文件与图床

2026-10-13，正文的五张标注截图已转换为 WebP，质量 90，保持 1850×1016 尺寸，上传到
`https://pic.hana0721.top/blog/piper-infra-3/`。正文与原尺寸链接均使用图床地址。

原始 PNG、标注 PNG 和可编辑 SVG 已从 `public` 移出，保存在本机：

`/home/juhuahua233/piper_lab/artifacts/blog-image-migration-20261013/piper-infra-3/rviz-local/`

重新生成标注时，将原始截图目录传给脚本：

```bash
node docs/piper-infra/piper-infra-3/rviz-local-20261011/annotate-rviz-screenshots.mjs \
  /home/juhuahua233/piper_lab/artifacts/blog-image-migration-20261013/piper-infra-3/rviz-local
```

源文件也可从博客提交 `099c7f5` 的 `public/images/piper-infra-3/rviz-local/` 恢复。
迁移映射、文件大小和校验值记录在 `docs/image-host-migration-20261013.json`。
