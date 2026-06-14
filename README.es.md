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

Los IDs de libro siguen el canon protestante de 1–66 usado por [bible-data](https://github.com/midvash/bible-data).

## Cómo se diferencia de OpenBible.info

[OpenBible.info](https://www.openbible.info/labs/cross-references/) publica ~340.000 referencias cruzadas extraídas algorítmicamente bajo CC-BY. Excelente para la exhaustividad, pésimo para la precisión — la mayoría de las entradas son asociaciones débiles.

Este dataset es **curado, tematizado y etiquetado**: cada referencia tiene una descripción escrita por humanos sobre qué tema conecta los versículos. 453 entradas en lugar de 340 mil, pero cada una está seleccionada a mano.

Ambos se complementan.

## Licencia

Publicado bajo **CC-BY 4.0**. Atribución a **Midvash** (con un enlace a [midvash.com](https://midvash.com)) al redistribuir o construir sobre estos datos.

## Proyectos relacionados

- **[bible-data](https://github.com/midvash/bible-data)** — 33 versiones bíblicas de dominio público, mismo esquema de `bookId`.
- **[Midvash](https://midvash.com)** — el lector bíblico y la plataforma de estudio que este dataset impulsa.

## El ecosistema Midvash

Parte de [**Midvash**](https://midvash.com) — una plataforma gratuita de lectura y estudio bíblico. Todo es abierto y se interconecta:

| | |
|---|---|
| 📖 **Lector (web)** | [midvash.com](https://midvash.com) — 9 idiomas |
| 📱 **App iOS** | [midvash.app/ios](https://midvash.app/ios) |
| 🔌 **API** | [api.midvash.com](https://api.midvash.com) · [`bible-api`](https://github.com/midvash/bible-api) |
| 🤖 **Servidor MCP** | [mcp.midvash.com](https://mcp.midvash.com) · [`bible-mcp`](https://github.com/midvash/bible-mcp) |
| 🧩 **Plugin de WordPress** | [midvash.app/wordpress-plugin](https://midvash.app/wordpress-plugin) · [`bible-wordpress-plugin`](https://github.com/midvash/bible-wordpress-plugin) |
| 🧩 **Plugin de EmDash** | [midvash.app/emdash-plugin](https://midvash.app/emdash-plugin) · [`emdash-plugin-bible`](https://github.com/midvash/emdash-plugin-bible) |
| 🌐 **Extensión de Chrome** | [midvash.app/chrome-extension](https://midvash.app/chrome-extension) · [`bible-chrome-extension`](https://github.com/midvash/bible-chrome-extension) |
| 📦 **Datos abiertos** | [`bible-data`](https://github.com/midvash/bible-data) · [`bible-data-js`](https://github.com/midvash/bible-data-js) · [`bible-cross-references`](https://github.com/midvash/bible-cross-references) |

<sub>Gratuito y abierto, hecho por [Midvash](https://midvash.com) · [midvash.com](https://midvash.com) · [midvash.app](https://midvash.app)</sub>
