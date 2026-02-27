# Govt Scheme Finder (MVP)

## Run locally
```bash
npm i
npm run dev
```

## Pages
- `/` Home (wizard)
- `/results` Results (from query params)
- `/scheme/[slug]` Scheme detail (SEO)
- `/state/[state]` State landing page (SEO template)
- `/category/[category]` Category landing page (SEO template)
- `/admin/rules` Admin Lite rule builder (generates JSON)

## Sitemap
- Auto sitemap: `src/app/sitemap.ts`
- Set `NEXT_PUBLIC_SITE_URL` in env for production, e.g.
```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Excel → JSON Importer
Place an Excel file at:
- `scripts/input/schemes.xlsx`

Then run:
```bash
pip install openpyxl
npm run import:excel
```

It will generate:
- `scripts/output/schemes.json`

### Expected Excel columns (Row 1 headers)
- id (optional)
- slug (optional)
- name
- summary
- category
- states (comma separated or `all`)
- tags (comma separated)
- benefits (use `|` to separate items OR newline inside cell)
- documents (use `|` to separate items OR newline inside cell)
- applyLink
- minAge
- incomeMax (empty allowed)
- gender (any/male/female/other)

After generating, copy the JSON into:
- `src/data/schemes.json`

## Notes
This is a demo MVP. Before going live:
- Add proper content (FAQs + how-to-apply) on state/category pages
- Add FAQ schema markup
- Add analytics for "Apply" click tracking
- Add caching / ISR if you move to DB
