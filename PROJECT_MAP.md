# My-Pharmacy — Medicine Information Website

## [TECH_STACK]

| Layer | Technology | Version |
|-------|-----------|---------|
| Runtime | Node.js | v24.15.0 |
| Web Framework | Express | 5.2.1 |
| Database | SQLite (better-sqlite3) | 12.11.1 |
| Templating | EJS | 6.0.1 |
| HTTP Logger | Morgan | ^1.10.0 |
| Slugify | slugify | ^1.6.6 |
| Frontend | Vanilla JS + CSS Custom Properties | — |

## [SYSTEM_FLOW]

```
Browser ──GET /──→ Express ──SQL──→ SQLite
  ↑                      │
  │                 rendered EJS
  │                      │
  └──────────────────────┘

Live Search:
Browser ──GET /api/search?q=X──→ Express ──LIKE %X%──→ SQLite
  ↑                                                            │
  └──────────── JSON [{id, name, group}] ──────────────────────┘
```

## [ARCHITECTURE]

```
server.js  ←──  routes/index.js
                     ├── groups.js    (GET /api/groups, POST /api/groups)
                     ├── medicines.js (GET /api/medicines, POST /api/medicines, GET /medicine/:id)
                     └── search.js    (GET /api/search)
db/index.js  ←──  routes/*.js
views/       ←──  routes/*.js
public/{css,js}  ←──  Browser
```

## [ORPHANS & PENDING]

- [ ] ملف `.gitignore` (node_modules, data/*.db, .env)
- [ ] فولدر `data/` مع `.gitkeep` (لإنشاء قاعدة البيانات)
- [ ] تحقق من تصدير `express` في v5 (قد يختلف عن v4)
- [ ] تحقق من توافق `better-sqlite3` مع Node v24
- [ ] تحقق من `morgan` و `slugify` في npm registry
