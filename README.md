# Echo sales funnel

Static landing page for Echo (Artifact AI Solutions). No build step, no dependencies —
`index.html`, `styles.css`, `script.js`, plus `assets/` and `videos/`. Deploys off `master`.

Preview it locally:

```bash
python -m http.server 4173 --directory .
```

## Adding the hero video

The hero currently shows a placeholder frame. To swap in the real VSL:

1. Put the file at `videos/hero.mp4` (transcode it first — see below).
2. In `index.html`, replace the block marked `<!-- TODO: swap this placeholder for the hero VSL -->` with:

```html
<div class="video-frame">
  <video controls preload="metadata" playsinline poster="assets/hero-poster.jpg">
    <source src="videos/hero.mp4" type="video/mp4" />
    Your browser doesn't support embedded video.
  </video>
</div>
```

A `poster` image is worth adding — without one the player shows a black rectangle until
the first frame decodes, which is the first thing a visitor sees. Grab one with:

```bash
ffmpeg -ss 3 -i videos/hero.mp4 -frames:v 1 -q:v 3 assets/hero-poster.jpg
```

## Transcoding video before committing

**GitHub rejects any single file over 100 MB**, and camera exports blow past that fast —
the JD case study arrived as a 133 MB 4K master. Nothing on this page renders wider than
about 900 px, so 4K is pure download cost for the visitor.

Settings used for the existing clip (133 MB → 28.6 MB, no visible loss at display size):

```bash
ffmpeg -i input.mp4 -vf "scale=1920:1080:flags=lanczos" -c:v libx264 -preset slow -crf 27 -profile:v high -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart -y videos/hero.mp4
```

`+faststart` matters: it moves the moov atom ahead of the media data so the video starts
playing before it finishes downloading. Without it a visitor waits for the whole file.

Keep full-resolution masters **out** of the repo — `.gitignore` already excludes the photo
and logo originals. Commit only the web derivative.

## Booking

Every "book a call" control is driven by one constant at the top of `script.js`:

```js
var BOOKING_URL = 'https://link.infinitygm.no/widget/bookings/discovery-callz-2026';
```

It opens in an iframe modal so visitors never leave the funnel. The iframe `src` is set on
first open, so the third-party widget costs nothing for visitors who never click. The
anchors keep a real `href`, so no-JS and ctrl/middle-click still work.

Change the URL in that one place. If you switch providers, check the new host doesn't send
`X-Frame-Options` or a `frame-ancestors` CSP, or the modal will render blank — in that case
fall back to opening the link in a new tab.

## Things to keep honest

- The three proof figures are a **projection**, not results — five agents over a year,
  built from one measured client (33 calls/week). The heading and the note under the cards
  say so. Don't move them under a "what we've delivered" framing without real totals.
- The dashboard in the product section is marked "Product view, sample data."
- Testimonials are real quotes from real clients. Don't add invented ones, and check
  client-vs-prospect status before attributing anything.
