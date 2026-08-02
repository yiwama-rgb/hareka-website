declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"24-hubspot-consulting-cost.md": {
	id: "24-hubspot-consulting-cost.md";
  slug: "24-hubspot-consulting-cost";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"25-hubspot-vendor-selection.md": {
	id: "25-hubspot-vendor-selection.md";
  slug: "25-hubspot-vendor-selection";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"26-salesforce-hubspot-migration.md": {
	id: "26-salesforce-hubspot-migration.md";
  slug: "26-salesforce-hubspot-migration";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"27-hubspot-adoption-failure.md": {
	id: "27-hubspot-adoption-failure.md";
  slug: "27-hubspot-adoption-failure";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"28-crm-implementation-failure.md": {
	id: "28-crm-implementation-failure.md";
  slug: "28-crm-implementation-failure";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"29-salesforce-expensive-complex.md": {
	id: "29-salesforce-expensive-complex.md";
  slug: "29-salesforce-expensive-complex";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"30-sales-crm-input.md": {
	id: "30-sales-crm-input.md";
  slug: "30-sales-crm-input";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"31-salesforce-hubspot-migration-process.md": {
	id: "31-salesforce-hubspot-migration-process.md";
  slug: "31-salesforce-hubspot-migration-process";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"32-salesforce-hubspot-migration-checklist.md": {
	id: "32-salesforce-hubspot-migration-checklist.md";
  slug: "32-salesforce-hubspot-migration-checklist";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"33-hubspot-can-and-cannot.md": {
	id: "33-hubspot-can-and-cannot.md";
  slug: "33-hubspot-can-and-cannot";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"34-hubspot-agent-cli.md": {
	id: "34-hubspot-agent-cli.md";
  slug: "34-hubspot-agent-cli";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"35-hubspot-report-ai.md": {
	id: "35-hubspot-report-ai.md";
  slug: "35-hubspot-report-ai";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"36-hubspot-workflow-ai.md": {
	id: "36-hubspot-workflow-ai.md";
  slug: "36-hubspot-workflow-ai";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"37-crm-migration-with-ai.md": {
	id: "37-crm-migration-with-ai.md";
  slug: "37-crm-migration-with-ai";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"hubspot-claude-mcp-personalized-mail.md": {
	id: "hubspot-claude-mcp-personalized-mail.md";
  slug: "hubspot-claude-mcp-personalized-mail";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"hubspot-claude-what-you-can-do.md": {
	id: "hubspot-claude-what-you-can-do.md";
  slug: "hubspot-claude-what-you-can-do";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"cases": {
"01-salesforce-hubspot-manufacturing.md": {
	id: "01-salesforce-hubspot-manufacturing.md";
  slug: "01-salesforce-hubspot-manufacturing";
  body: string;
  collection: "cases";
  data: InferEntrySchema<"cases">
} & { render(): Render[".md"] };
"02-saas-salesforce-hubspot-datamigration.md": {
	id: "02-saas-salesforce-hubspot-datamigration.md";
  slug: "02-saas-salesforce-hubspot-datamigration";
  body: string;
  collection: "cases";
  data: InferEntrySchema<"cases">
} & { render(): Render[".md"] };
"03-consulting-hubspot-reactivation.md": {
	id: "03-consulting-hubspot-reactivation.md";
  slug: "03-consulting-hubspot-reactivation";
  body: string;
  collection: "cases";
  data: InferEntrySchema<"cases">
} & { render(): Render[".md"] };
"04-staffing-marketinghub-launch.md": {
	id: "04-staffing-marketinghub-launch.md";
  slug: "04-staffing-marketinghub-launch";
  body: string;
  collection: "cases";
  data: InferEntrySchema<"cases">
} & { render(): Render[".md"] };
"05-trading-marketinghub-content.md": {
	id: "05-trading-marketinghub-content.md";
  slug: "05-trading-marketinghub-content";
  body: string;
  collection: "cases";
  data: InferEntrySchema<"cases">
} & { render(): Render[".md"] };
"06-investment-fund-hubspot-launch.md": {
	id: "06-investment-fund-hubspot-launch.md";
  slug: "06-investment-fund-hubspot-launch";
  body: string;
  collection: "cases";
  data: InferEntrySchema<"cases">
} & { render(): Render[".md"] };
"07-benefits-zendesk-hubspot-consolidation.md": {
	id: "07-benefits-zendesk-hubspot-consolidation.md";
  slug: "07-benefits-zendesk-hubspot-consolidation";
  body: string;
  collection: "cases";
  data: InferEntrySchema<"cases">
} & { render(): Render[".md"] };
"08-startup-airtable-hubspot-migration.md": {
	id: "08-startup-airtable-hubspot-migration.md";
  slug: "08-startup-airtable-hubspot-migration";
  body: string;
  collection: "cases";
  data: InferEntrySchema<"cases">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
