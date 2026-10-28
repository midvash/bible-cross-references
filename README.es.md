# bible-cross-references

> 🌐 [English](./README.md) · [Português (BR)](./README.pt-BR.md) · **Español**

**453 referencias cruzadas temáticas curadas en toda la Biblia** — cada una conecta un versículo de origen con pasajes relacionados mediante una descripción breve.

Útil para el estudio bíblico, fragmentos de motores de búsqueda y cualquier app que quiera destacar "versículos sobre el mismo tema" sin ingerir el dataset mucho más grande, pero no curado, de OpenBible.info.

Etiquetas multilingües: **inglés, portugués, español**.

> Impulsa la función de referencias cruzadas en [midvash.com](https://midvash.com).

---

## Inicio rápido

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
// Búsqueda por versículo de origen (`indexed.bySource`):
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

Los IDs de libro siguen el canon protestante de 1–66 usado por [bible-data](https://github.com/midvash/bible-data).

## Cómo se diferencia de OpenBible.info

[OpenBible.info](https://www.openbible.info/labs/cross-references/) publica ~340.000 referencias cruzadas extraídas algorítmicamente bajo CC-BY. Excelente para la exhaustividad, pésimo para la precisión — la mayoría de las entradas son asociaciones débiles.

Este dataset es **curado, tematizado y etiquetado**: cada referencia tiene una descripción escrita por humanos sobre qué tema conecta los versículos. 453 entradas en lugar de 340 mil, pero cada una está seleccionada a mano.

Ambos se complementan.

## Licencia

Licenciado bajo la [Creative Commons Atribución 4.0 Internacional](https://creativecommons.org/licenses/by/4.0/deed.es) (CC BY 4.0); texto legal completo en [LICENSE](./LICENSE).

Copyright (c) 2026 Midvash. Al compartir o adaptar estos datos, da crédito a **Midvash** con un enlace a [midvash.com](https://midvash.com), enlaza la licencia e indica si hiciste cambios.

## Proyectos relacionados

- **[bible-data](https://github.com/midvash/bible-data)** — 32 versiones bíblicas abiertas, mismo esquema de `bookId`.
- **[Midvash](https://midvash.com)** — el lector bíblico y la plataforma de estudio que este dataset impulsa.

## El ecosistema Midvash

Parte de [**Midvash**](https://midvash.com) — una plataforma gratuita de lectura y estudio bíblico. Todo es abierto y se interconecta:

| | |
|---|---|
| 📖 **Lector (web)** | [midvash.com](https://midvash.com) — 9 idiomas |
| 📱 **App iOS** | [midvash.com/ios](https://midvash.com/ios) |
| 🔌 **API** | [api.midvash.com](https://api.midvash.com) · [`bible-api`](https://github.com/midvash/bible-api) |
| 🤖 **Servidor MCP** | [mcp.midvash.com](https://mcp.midvash.com) · [`bible-mcp`](https://github.com/midvash/bible-mcp) |
| 🧩 **Plugin de WordPress** | [midvash.com/wordpress-plugin](https://midvash.com/wordpress-plugin) · [`bible-wordpress-plugin`](https://github.com/midvash/bible-wordpress-plugin) |
| 🧩 **Plugin de EmDash** | [midvash.com/emdash-plugin](https://midvash.com/emdash-plugin) · [`bible-emdash-plugin`](https://github.com/midvash/bible-emdash-plugin) |
| 🌐 **Extensión de Chrome** | [midvash.com/chrome-extension](https://midvash.com/chrome-extension) · [`bible-chrome-extension`](https://github.com/midvash/bible-chrome-extension) |
| 📦 **Datos abiertos** | [`bible-data`](https://github.com/midvash/bible-data) · [`bible-data-js`](https://github.com/midvash/bible-data-js) · [`bible-cross-references`](https://github.com/midvash/bible-cross-references) |

<sub>Gratuito y abierto, hecho por [Midvash](https://midvash.com)</sub>
