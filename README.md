# bible-cross-references

> 🌐 **English** · [Português (BR)](./README.pt-BR.md) · [Español](./README.es.md)

**453 curated thematic cross-references across the Bible** — each one connects a source verse to related passages with a short description.

Useful for Bible study, search-engine snippets, and any app that wants to surface "verses on the same theme" without ingesting the much larger but uncurated OpenBible.info dataset.

Multilingual labels: **English, Portuguese, Spanish**.

> Powers the cross-reference feature at [midvash.com](https://midvash.com).

---

## Quick start

```bash
curl -L -o cross-references.json \
  https://raw.githubusercontent.com/midvash/bible-cross-references/main/cross-references.json
```

```js
const data = require('./cross-references.json');
console.log(data.references[0]);
// {
//   id: 1,
//   slug: { 'pt-br': '...', en: '...', es: '...' },
//   source: { bookId: 1, chapter: 1, verse: 27, names: {...}, reference: {...} },
//   description: { 'pt-br': '...', en: 'Creation of man in the image of God', es: '...' },
//   targets: [ { bookId: 40, chapter: 19, verse: 4, ... }, ... ]
// }
```

```js
// Source verse lookup (`indexed.bySource`):
const ids = data.indexed.bySource['1:1:27'] ?? [];       // Genesis 1:27
const refs = ids.map((id) => data.references.find((r) => r.id === id));
```

## Schema

```ts
interface Dataset {
  references: CrossReference[];
  indexed: {
    bySource: Record<string, number[]>;  // "bookId:chapter:verse" (e.g. "1:1:27") → reference ids
    byTarget: Record<string, number[]>;  // same key, for every target verse → reference ids
    bySlug: Record<Locale, Record<string, number>>;  // slug → reference id, per locale
  };
}

interface CrossReference {
  id: number;
  slug: I18nString;
  source: VerseRef;
  description: I18nString;
  targets: VerseRef[];
}

interface VerseRef {
  bookId: number;          // 1–66, see https://github.com/midvash/bible-data/blob/main/SCHEMA.md#book-identifiers
  chapter: number;
  verse: number;
  verseEnd?: number;       // last verse of a range (e.g. Genesis 9:26-27); absent for a single verse
  names: I18nString;       // localized book name
  reference: I18nString;   // localized reference, e.g. "Genesis 1:27"
}

type Locale = 'pt-br' | 'en' | 'es';

type I18nString = Record<Locale, string>;
```

Book IDs follow the 1–66 Protestant canon used by [bible-data](https://github.com/midvash/bible-data).

## How it differs from OpenBible.info

[OpenBible.info](https://www.openbible.info/labs/cross-references/) publishes ~340,000 algorithmically-extracted cross-references under CC-BY. That's great for completeness, terrible for precision — most entries are weak associations.

This dataset is **curated, themed, and labeled**: each reference has a human-written description of what theme connects the verses. 453 entries instead of 340k, but every one is hand-picked.

The two complement each other.

## License

Licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0); full legal code in [LICENSE](./LICENSE).

Copyright (c) 2026 Midvash. When you share or adapt this data, credit **Midvash** with a link to [midvash.com](https://midvash.com), link to the license, and say if you made changes.

## Related projects

- **[bible-data](https://github.com/midvash/bible-data)** — 32 open Bible versions, same `bookId` scheme.
- **[Midvash](https://midvash.com)** — the Bible reader and study platform this dataset powers.

## The Midvash ecosystem

Part of [**Midvash**](https://midvash.com) — a free Bible reading & study platform. Everything is open and interlinks:

| | |
|---|---|
| 📖 **Reader (web)** | [midvash.com](https://midvash.com) — 9 languages |
| 📱 **iOS app** | [midvash.com/ios](https://midvash.com/ios) |
| 🔌 **API** | [api.midvash.com](https://api.midvash.com) · [`bible-api`](https://github.com/midvash/bible-api) |
| 🤖 **MCP server** | [mcp.midvash.com](https://mcp.midvash.com) · [`bible-mcp`](https://github.com/midvash/bible-mcp) |
| 🧩 **WordPress plugin** | [midvash.com/wordpress-plugin](https://midvash.com/wordpress-plugin) · [`bible-wordpress-plugin`](https://github.com/midvash/bible-wordpress-plugin) |
| 🧩 **EmDash plugin** | [midvash.com/emdash-plugin](https://midvash.com/emdash-plugin) · [`bible-emdash-plugin`](https://github.com/midvash/bible-emdash-plugin) |
| 🌐 **Chrome extension** | [midvash.com/chrome-extension](https://midvash.com/chrome-extension) · [`bible-chrome-extension`](https://github.com/midvash/bible-chrome-extension) |
| 📦 **Open data** | [`bible-data`](https://github.com/midvash/bible-data) · [`bible-data-js`](https://github.com/midvash/bible-data-js) · [`bible-cross-references`](https://github.com/midvash/bible-cross-references) |

<sub>Free & open, built by [Midvash](https://midvash.com)</sub>
