import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string().default('HubSpot活用'),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    ogImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const cases = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    company: z.string(),
    industry: z.string(),
    employees: z.string(),
    tool_before: z.string(),
    tool_after: z.string(),
    period: z.string(),
    highlight: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
    description: z.string(),
    heroImage: z.string().optional(),
    products: z.array(z.enum(["Sales Hub", "Marketing Hub", "Service Hub"])).optional(),
    supportType: z.array(z.enum(["導入支援", "活用支援"])).optional(),
    implementation: z.enum(["構築代行あり", "構築代行なし"]).optional(),
  }),
});

export const collections = { blog, cases };
