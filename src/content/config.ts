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
  }),
});

export const collections = { blog, cases };
