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

Os IDs de livro seguem o cânon protestante de 1–66 usado pelo [bible-data](https://github.com/midvash/bible-data).

## Como difere do OpenBible.info

O [OpenBible.info](https://www.openbible.info/labs/cross-references/) publica ~340.000 referências cruzadas extraídas algoritmicamente sob CC-BY. Ótimo para completude, péssimo para precisão — a maioria das entradas são associações fracas.

Este dataset é **curado, tematizado e rotulado**: cada referência tem uma descrição escrita por humanos sobre qual tema conecta os versículos. 453 entradas em vez de 340 mil, mas cada uma é selecionada à mão.

Os dois se complementam.

## Licença

Distribuído sob **CC-BY 4.0**. Atribuição à **Midvash** (com um link para [midvash.com](https://midvash.com)) ao redistribuir ou construir em cima destes dados.

## Projetos relacionados

- **[bible-data](https://github.com/midvash/bible-data)** — 33 versões bíblicas em domínio público, mesmo esquema de `bookId`.
- **[Midvash](https://midvash.com)** — o leitor bíblico e plataforma de estudo que este dataset alimenta.

## O ecossistema Midvash

Faz parte do [**Midvash**](https://midvash.com) — uma plataforma gratuita de leitura e estudo bíblico. Tudo é aberto e se interliga:

| | |
|---|---|
| 📖 **Leitor (web)** | [midvash.com](https://midvash.com) — 9 idiomas |
| 📱 **App iOS** | [midvash.app/ios](https://midvash.app/ios) |
| 🔌 **API** | [api.midvash.com](https://api.midvash.com) · [`bible-api`](https://github.com/midvash/bible-api) |
| 🤖 **Servidor MCP** | [mcp.midvash.com](https://mcp.midvash.com) · [`bible-mcp`](https://github.com/midvash/bible-mcp) |
| 🧩 **Plugin WordPress** | [midvash.app/wordpress-plugin](https://midvash.app/wordpress-plugin) · [`bible-wordpress-plugin`](https://github.com/midvash/bible-wordpress-plugin) |
| 🧩 **Plugin EmDash** | [midvash.app/emdash-plugin](https://midvash.app/emdash-plugin) · [`emdash-plugin-bible`](https://github.com/midvash/emdash-plugin-bible) |
| 🌐 **Extensão Chrome** | [midvash.app/chrome-extension](https://midvash.app/chrome-extension) · [`bible-chrome-extension`](https://github.com/midvash/bible-chrome-extension) |
| 📦 **Dados abertos** | [`bible-data`](https://github.com/midvash/bible-data) · [`bible-data-js`](https://github.com/midvash/bible-data-js) · [`bible-cross-references`](https://github.com/midvash/bible-cross-references) |

<sub>Gratuito e aberto, feito pela [Midvash](https://midvash.com) · [midvash.com](https://midvash.com) · [midvash.app](https://midvash.app)</sub>
