# Oklahoma Film Solutions — website

A single-page marketing site for Oklahoma Film Solutions ("Your one-stop film shop"), built as
plain HTML/CSS/JS — no build step required.

## Structure

```
index.html        page markup
css/styles.css     all styling (dark theme, amber accent, bento grid, animations)
js/main.js         nav state, scroll-reveal, mobile menu, form validation
images/            generated hero + supporting photography (JPEG, optimized)
```

## Before this goes live, replace the placeholders

Search the project for these and swap in the real values:

- **Phone number** — currently `(405) 555-0142` / `tel:+14055550142` (nav, hero, CTA banner,
  contact section, footer).
- **Email** — currently `dispatch@oklahomafilmsolutions.com` (contact section, footer, and the
  form's mailto target in `js/main.js`).
- **Service area** — currently "Statewide across Oklahoma, based out of the OKC metro."
- **License badge text** — currently generic "Licensed / Insured / Bonded" pills. If you want to
  cite an actual license number or issuing board, add it near the badges in the Contact section.

## The contact form

It currently validates fields client-side and then opens the visitor's email client via a
`mailto:` link pre-filled with their details. That works with zero backend, but it depends on the
visitor having a mail client configured, and you won't get a copy unless they hit send. For a real
launch, swap it for a proper form backend — e.g. a Formspree/Netlify Forms endpoint, or a small
serverless function that emails you and stores a copy. Say the word and this can be wired up.

## Running it locally

Any static file server works, e.g.:

```bash
npx serve .
```

## Deploying

This is a static site, so it deploys as-is to Vercel, Netlify, GitHub Pages, or similar with no
build configuration. If you want it pushed to GitHub and deployed to Vercel the way the other
Finchum Family sites are set up, just ask.
