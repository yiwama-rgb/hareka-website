import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.string().default('HubSpot活用'),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    ogImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
