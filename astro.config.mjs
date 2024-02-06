import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import remarkToc from "remark-toc";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { h, s } from "hastscript";
import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
const DEFAULT_LAYOUT = "/src/layouts/Section.astro";
function setDefaultLayout() {
  return function (_, file) {
    const {
      frontmatter
    } = file.data.astro;
    if (!frontmatter.layout) frontmatter.layout = DEFAULT_LAYOUT;
  };
}

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx(), sitemap(), starlight()],
  site: "https://docs.axelar.dev",
  markdown: {
    remarkPlugins: [setDefaultLayout, [remarkToc, {
      heading: "contents"
    }]],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, {
      behavior: "append",
      content: [h("span", {
        ariaHidden: "true",
        class: "anchor-icon"
      }, h("svg", {
        width: 16,
        height: 16,
        version: 1.1,
        viewBox: "0 0 16 16",
        xlmns: "http://www.w3.org/2000/svg"
      }, h("path", {
        fillRule: "evenodd",
        fill: "currentcolor",
        d: "M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
      })))]
    }]],
    syntaxHighlight: false
  }
});