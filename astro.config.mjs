import { defineConfig } from 'astro/config';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import sitemap from '@astrojs/sitemap';

// ブログ記事の URL → 最終更新日（updatedDate ?? pubDate）のマップを構築
const blogDir = fileURLToPath(new URL('./src/content/blog', import.meta.url));
const blogDates = new Map();

for (const file of readdirSync(blogDir)) {
  if (!file.endsWith('.md')) continue;
  const slug = file.replace(/\.md$/, '');
  const raw = readFileSync(`${blogDir}/${file}`, 'utf-8');
  const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) continue;
  const pub = fm[1].match(/^pubDate:\s*(.+)$/m)?.[1]?.trim().replace(/['"]/g, '');
  const upd = fm[1].match(/^updatedDate:\s*(.+)$/m)?.[1]?.trim().replace(/['"]/g, '');
  const date = upd || pub;
  if (date) {
    blogDates.set(`https://hareka.io/blog/${slug}/`, new Date(date).toISOString());
  }
}

export default defineConfig({
  site: 'https://hareka.io',
  integrations: [
    sitemap({
      serialize(item) {
        const lastmod = blogDates.get(item.url);
        if (lastmod) {
          item.lastmod = lastmod;
        }
        return item;
      },
    }),
  ],
});
