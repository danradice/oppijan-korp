# Oppijan Korp

A simple web app for finding real Finnish example sentences. It searches the
[Kielipankki Korp](https://korp.csc.fi/) corpora and returns randomised,
readable example sentences — useful for language learners and teachers looking
for authentic usage of a word, form, or construction.

The interface is in Finnish.

## Features

- **Two corpora**: *Uutiset* (Yle News, 2011–2021) and *Keskustelupalsta*
  (Suomi24 discussion forum, 2017–2023). Forum text is unmoderated.
- **Learner-friendly query shortcuts** that compile down to CQP (Corpus Query
  Processor) syntax — no need to learn CQP itself:

  | Shortcut | Meaning | Example |
  |---|---|---|
  | `?` | any string of characters | `?puoli`, `mega?`, `paras ? ikinä` |
  | `-word` | search by lemma (any inflected form) | `-tehdä hyvää` |
  | `'Case` | search by grammatical case | `rakastaa 'Acc` |
  | `!Pos` | search by part of speech | `!Adv vihainen` |
  | `...N` | up to N words in between | `mennä ...2 kauppaan` |
  | `[...]` | raw CQP, passed through unchanged | `[lemma = "koira"]` |

  Regular expressions work inside search terms (e.g. `leikepöy(tään|dälle)`),
  and the first letter of a search is automatically matched case-insensitively.
- **Adjustable settings**: minimum sentence length, maximum results (capped at
  50), and results per page.
- **Progressive results** — sentences appear as each corpus year returns,
  rather than after the whole search completes.
- **Deduplication and length filtering** of results, plus a built-in rate limit
  of one search every 2 seconds to avoid hammering the Korp API.
- **Two build targets** from one codebase: a standalone site and a WordPress
  plugin.

## Tech stack

React 19 · TypeScript · Vite 6 · Tailwind CSS 4 · react-markdown

## Getting started

```bash
npm install
npm run dev          # dev server at http://localhost:5173
```

No API key or backend is required — the app calls the public Korp API
(`https://www.kielipankki.fi/korp/cgi-bin/korp/korp.cgi`) directly from the
browser.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build the standalone app → `dist/` |
| `npm run build:wordpress` | Build the WordPress plugin → `oppijan-korp-wp/dist/` |
| `npm run preview` | Preview the standalone build |
| `npm run preview:wordpress` | Preview the WordPress build |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── api/korpApi.ts             # Korp API URL building and fetch
├── components/                # Form, Sentence, ContentBox, StatsBox, modals
├── config/
│   ├── corpora.ts             # Corpus definitions and helpers
│   └── index.ts               # Environment-based config (mount element ID)
├── content/instructions.md    # Front-page instructions (markdown)
├── hooks/useRateLimiter.ts    # Search rate limiting
├── utils/
│   ├── cqpQueryBuilder.ts     # Search shortcuts → CQP query
│   ├── korpSearch.ts          # Multi-corpus search with progress callback
│   └── sentenceExtractor.ts   # Extract, filter, and dedupe sentences
├── App.tsx                    # Coordinates state and search
└── main.tsx                   # Entry point
oppijan-korp-wp/               # WordPress plugin (PHP wrapper + built assets)
```

## WordPress deployment

The same codebase builds a WordPress plugin. The only difference is the mount
element ID and asset base path, set per build mode via `.env.production` and
`.env.wordpress`.

```bash
npm run build:wordpress
cp -r oppijan-korp-wp /path/to/wordpress/wp-content/plugins/oppijan-korp
```

Activate the plugin in the WordPress admin, then place the `[oppijan-korp]`
shortcode on any page or post. Assets load only on pages using the shortcode.
See [oppijan-korp-wp/README.md](oppijan-korp-wp/README.md) and
[MONOREPO_SETUP.md](MONOREPO_SETUP.md) for details.

## Data source and licence

Corpus data comes from [Kielipankki – The Language Bank of Finland](https://www.kielipankki.fi/)
via the Korp API. Please respect the terms of use of the underlying corpora.

This project is licensed under the GNU General Public License v3.0 — see
[LICENSE](LICENSE).
