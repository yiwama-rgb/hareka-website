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
"01-hubspot-claude-code-integration.md": {
	id: "01-hubspot-claude-code-integration.md";
  slug: "01-hubspot-claude-code-integration";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"02-hubspot-api-claude-code.md": {
	id: "02-hubspot-api-claude-code.md";
  slug: "02-hubspot-api-claude-code";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"03-hubspot-mcp-setup.md": {
	id: "03-hubspot-mcp-setup.md";
  slug: "03-hubspot-mcp-setup";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"04-hubspot-report-automation.md": {
	id: "04-hubspot-report-automation.md";
  slug: "04-hubspot-report-automation";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"05-hubspot-api-natural-language.md": {
	id: "05-hubspot-api-natural-language.md";
  slug: "05-hubspot-api-natural-language";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"06-claude-code-hubspot-conversion-rate.md": {
	id: "06-claude-code-hubspot-conversion-rate.md";
  slug: "06-claude-code-hubspot-conversion-rate";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"07-hubspot-mcp-capabilities.md": {
	id: "07-hubspot-mcp-capabilities.md";
  slug: "07-hubspot-mcp-capabilities";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"08-claude-code-hubspot-automation-examples.md": {
	id: "08-claude-code-hubspot-automation-examples.md";
  slug: "08-claude-code-hubspot-automation-examples";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"09-hubspot-claude-code-roles.md": {
	id: "09-hubspot-claude-code-roles.md";
  slug: "09-hubspot-claude-code-roles";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"10-hubspot-report-usability.md": {
	id: "10-hubspot-report-usability.md";
  slug: "10-hubspot-report-usability";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"11-hubspot-custom-report-limits.md": {
	id: "11-hubspot-custom-report-limits.md";
  slug: "11-hubspot-custom-report-limits";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"12-hubspot-google-sheets-integration.md": {
	id: "12-hubspot-google-sheets-integration.md";
  slug: "12-hubspot-google-sheets-integration";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"13-hubspot-starter-vs-professional.md": {
	id: "13-hubspot-starter-vs-professional.md";
  slug: "13-hubspot-starter-vs-professional";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"14-hubspot-downgrade-decision.md": {
	id: "14-hubspot-downgrade-decision.md";
  slug: "14-hubspot-downgrade-decision";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"15-hubspot-cant-use-reasons.md": {
	id: "15-hubspot-cant-use-reasons.md";
  slug: "15-hubspot-cant-use-reasons";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"16-hubspot-crm-data-input-adoption.md": {
	id: "16-hubspot-crm-data-input-adoption.md";
  slug: "16-hubspot-crm-data-input-adoption";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"17-hubspot-implementation-failure-patterns.md": {
	id: "17-hubspot-implementation-failure-patterns.md";
  slug: "17-hubspot-implementation-failure-patterns";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"18-hubspot-breeze-ai-honest-review.md": {
	id: "18-hubspot-breeze-ai-honest-review.md";
  slug: "18-hubspot-breeze-ai-honest-review";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"19-hubspot-vs-salesforce-ai-era.md": {
	id: "19-hubspot-vs-salesforce-ai-era.md";
  slug: "19-hubspot-vs-salesforce-ai-era";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"hubspot-claude-mcp-personalized-mail.md": {
	id: "hubspot-claude-mcp-personalized-mail.md";
  slug: "hubspot-claude-mcp-personalized-mail";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"hubspot-utilization-5-points.md": {
	id: "hubspot-utilization-5-points.md";
  slug: "hubspot-utilization-5-points";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"salesforce-to-hubspot-migration-checklist.md": {
	id: "salesforce-to-hubspot-migration-checklist.md";
  slug: "salesforce-to-hubspot-migration-checklist";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
