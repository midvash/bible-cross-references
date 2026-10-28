# bible-cross-references

> 🌐 [English](./README.md) · **Português (BR)** · [Español](./README.es.md)

**453 referências cruzadas temáticas curadas em toda a Bíblia** — cada uma conecta um versículo de origem a passagens relacionadas com uma descrição curta.

Útil para estudo bíblico, snippets de mecanismos de busca e qualquer app que queira destacar "versículos sobre o mesmo tema" sem ingerir o dataset bem maior, porém não curado, do OpenBible.info.

Rótulos multilíngues: **inglês, português, espanhol**.

> Alimenta o recurso de referências cruzadas em [midvash.com](https://midvash.com).

---

## Início rápido

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
// Busca pelo versículo de origem (`indexed.bySource`):
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

Os IDs de livro seguem o cânon protestante de 1–66 usado pelo [bible-data](https://github.com/midvash/bible-data).

## Como difere do OpenBible.info

O [OpenBible.info](https://www.openbible.info/labs/cross-references/) publica ~340.000 referências cruzadas extraídas algoritmicamente sob CC-BY. Ótimo para completude, péssimo para precisão — a maioria das entradas são associações fracas.

Este dataset é **curado, tematizado e rotulado**: cada referência tem uma descrição escrita por humanos sobre qual tema conecta os versículos. 453 entradas em vez de 340 mil, mas cada uma é selecionada à mão.

Os dois se complementam.

## Licença

Licenciado sob a [Creative Commons Atribuição 4.0 Internacional](https://creativecommons.org/licenses/by/4.0/deed.pt-br) (CC BY 4.0); texto legal completo em [LICENSE](./LICENSE).

Copyright (c) 2026 Midvash. Ao compartilhar ou adaptar estes dados, dê crédito à **Midvash** com link para [midvash.com](https://midvash.com), link para a licença e indique se fez alterações.

## Projetos relacionados

- **[bible-data](https://github.com/midvash/bible-data)** — 32 versões bíblicas abertas, mesmo esquema de `bookId`.
- **[Midvash](https://midvash.com)** — o leitor bíblico e plataforma de estudo que este dataset alimenta.

## O ecossistema Midvash

Faz parte do [**Midvash**](https://midvash.com) — uma plataforma gratuita de leitura e estudo bíblico. Tudo é aberto e se interliga:

| | |
|---|---|
| 📖 **Leitor (web)** | [midvash.com](https://midvash.com) — 9 idiomas |
| 📱 **App iOS** | [midvash.com/ios](https://midvash.com/ios) |
| 🔌 **API** | [api.midvash.com](https://api.midvash.com) · [`bible-api`](https://github.com/midvash/bible-api) |
| 🤖 **Servidor MCP** | [mcp.midvash.com](https://mcp.midvash.com) · [`bible-mcp`](https://github.com/midvash/bible-mcp) |
| 🧩 **Plugin WordPress** | [midvash.com/wordpress-plugin](https://midvash.com/wordpress-plugin) · [`bible-wordpress-plugin`](https://github.com/midvash/bible-wordpress-plugin) |
| 🧩 **Plugin EmDash** | [midvash.com/emdash-plugin](https://midvash.com/emdash-plugin) · [`bible-emdash-plugin`](https://github.com/midvash/bible-emdash-plugin) |
| 🌐 **Extensão Chrome** | [midvash.com/chrome-extension](https://midvash.com/chrome-extension) · [`bible-chrome-extension`](https://github.com/midvash/bible-chrome-extension) |
| 📦 **Dados abertos** | [`bible-data`](https://github.com/midvash/bible-data) · [`bible-data-js`](https://github.com/midvash/bible-data-js) · [`bible-cross-references`](https://github.com/midvash/bible-cross-references) |

<sub>Gratuito e aberto, feito pela [Midvash](https://midvash.com)</sub>
