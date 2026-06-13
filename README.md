# bible-cross-references

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

## Schema

```ts
interface Dataset {
  references: CrossReference[];
  indexed: Record<string, number[]>;  // "bookId-chapter-verse" → reference ids
}

interface CrossReference {
  id: number;
  slug: I18nString;
  source: VerseRef;
  description: I18nString;
  targets: VerseRef[];
}

interface VerseRef {
  bookId: number;          // 1–66, see https://github.com/midvash/bible-data#book-ids
  chapter: number;
  verse: number;
  names: I18nString;       // localized book name
  reference: I18nString;   // localized reference, e.g. "Genesis 1:27"
}

type I18nString = {
  'pt-br': string;
  'en': string;
  'es': string;
};
```

Book IDs follow the 1–66 Protestant canon used by [bible-data](https://github.com/midvash/bible-data).

## How it differs from OpenBible.info

[OpenBible.info](https://www.openbible.info/labs/cross-references/) publishes ~340,000 algorithmically-extracted cross-references under CC-BY. That's great for completeness, terrible for precision — most entries are weak associations.

This dataset is **curated, themed, and labeled**: each reference has a human-written description of what theme connects the verses. 453 entries instead of 340k, but every one is hand-picked.

The two complement each other.

## License

Released under **CC-BY 4.0**. Attribution to **Midvash** (with a link to [midvash.com](https://midvash.com)) when redistributing or building on this data.

## Related projects

- **[bible-data](https://github.com/midvash/bible-data)** — 33 public-domain Bible versions, same `bookId` scheme.
- **[Midvash](https://midvash.com)** — the Bible reader and study platform this dataset powers.

## The Midvash ecosystem

Part of [**Midvash**](https://midvash.com) — a free Bible reading & study platform. All pieces are open and interlink:

| | |
|---|---|
| 📖 **Reader** | [midvash.com](https://midvash.com) — web app, 9 languages |
| 🔌 **API** | [api.midvash.com](https://api.midvash.com) · [`bible-api`](https://github.com/midvash/bible-api) |
| 🤖 **MCP server** | [mcp.midvash.com](https://mcp.midvash.com) · [`bible-mcp`](https://github.com/midvash/bible-mcp) |
| 🧩 **WordPress plugin** | [midvash.app/wordpress-plugin](https://midvash.app/wordpress-plugin) · [`bible-by-midvash`](https://github.com/midvash/bible-by-midvash) |
| 🧩 **EmDash plugin** | [midvash.app/emdash-plugin](https://midvash.app/emdash-plugin) · [`emdash-plugin-bible`](https://github.com/midvash/emdash-plugin-bible) |
| 🌐 **Chrome extension** | [midvash.app/chrome-extension](https://midvash.app/chrome-extension) · [`bible-chrome-extension`](https://github.com/midvash/bible-chrome-extension) |
| 📦 **Open data** | [`bible-data`](https://github.com/midvash/bible-data) · [`bible-data-js`](https://github.com/midvash/bible-data-js) · [`bible-cross-references`](https://github.com/midvash/bible-cross-references) |

<sub>Free & open, built by [Midvash](https://midvash.com).</sub>
