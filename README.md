# Classon v2

A playful early-learning app for young children: letters, numbers, songs, tracing and a parents' view.

This is a **2026 rebuild in React** of the original Classon prototype, which was hand-written HTML and CSS in 2022
([BrainClasson/Classon](https://github.com/BrainClasson/Classon)). It shares the idea and the name; the code is new.

**Live demo:** https://d4mz3y.github.io/classon-react/

## What it does

- **Diction:** all 26 letters. Each letter has four activities: *Watch* (animated scene and spoken word), *Sing* (a generated tune with bouncing words), *Trace* (draw the letter on a canvas) and *Read* (a page-turning flip-book).
- **Numeracy:** numbers 1 to 10, each with a tap-to-count activity and a quiz.
- **Unlocking:** finish every activity in a lesson to open the next one.
- **Tracing is checked, not faked:** the app measures how much of the letter your strokes cover and how much of your drawing stays on it, so scribbling or a single dot does not pass.
- **Parents' view:** counts letters, numbers and activities finished, with a calendar of active days, all taken from real activity in the app.

## Built with

React 19, Vite, Tailwind CSS v4, Framer Motion and React Router (hash routing, so deep links work on GitHub Pages).

## No third-party media

Pictures are emoji and SVG, spoken words use the browser's built-in speech voices, and the songs are generated with the
Web Audio API. Nothing recorded or copyrighted is bundled.

## Limits worth knowing

- Progress is stored in the browser's `localStorage` on one device. There is no backend and no real account system, so "sign in" just remembers a first name.
- Story and Moral are placeholders ("coming soon"); only Diction and Numeracy have content.
- Speech quality depends on the voices installed on the device.

## Run it

```bash
npm install
npm run dev
```

Build for GitHub Pages:

```bash
BASE_PATH=/classon-react/ npm run build
```
