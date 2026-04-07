# Ravi Restaurant — Premium Hero Video Prompts

Use these prompts with **Runway Gen-3**, **Sora**, **Kling AI**, **Pika**, or **Luma Dream Machine**.
Pick any single prompt below, or combine 2–3 clips into a 10–15 second seamless loop.

---

## HERO BACKGROUND VIDEO (Primary — Pick One)

### Prompt 1 — "The Karahi Shot" (Recommended)
```
Cinematic slow-motion close-up of a sizzling chicken karahi being cooked in a traditional round wok. Golden oil bubbles around tomatoes, green chillies, and ginger. Steam rises elegantly. Warm amber lighting from above. Shallow depth of field. Shot on ARRI Alexa 65. Pakistani restaurant kitchen. Premium food photography aesthetic. No text. No people's faces. 4K. Slow motion 120fps.
```

### Prompt 2 — "The Pour"
```
Ultra slow-motion overhead shot of rich golden curry being ladled from a copper pot into a white ceramic bowl. Thick aromatic gravy with visible whole spices — cardamom, cinnamon, star anise. Steam curls upward. Warm soft lighting. Dark moody background. Shallow depth of field, bokeh. Cinematic food commercial quality. Shot on RED V-Raptor. 4K 120fps.
```

### Prompt 3 — "The Flame & Naan"
```
Cinematic medium shot of fresh naan bread being pulled from a glowing orange tandoor clay oven. Soft flames visible inside the oven. The naan stretches slightly, golden-brown with char spots. Warm fire-lit ambiance. Smoke and steam in the air. Pakistani restaurant kitchen at night. Shallow depth of field. Premium food documentary style. 4K slow motion.
```

### Prompt 4 — "The Table Setting"
```
Smooth cinematic tracking shot across a beautifully set Pakistani dinner table. Karahi dishes, biryani with saffron rice, fresh naan, mint chutney, raita in small bowls. Warm candlelight. Elegant but casual. White tablecloth. Green herbs scattered. Steam rising from dishes. No people. Shot on anamorphic lens. Soft golden hour lighting. 4K.
```

### Prompt 5 — "The Spice Cascade"
```
Extreme slow-motion macro shot of whole spices — turmeric, cumin seeds, dried red chillies, green cardamom pods, black peppercorns — cascading and falling through warm golden light against a pure black background. Each spice tumbles in sharp focus. Dust particles visible in light beams. Premium spice brand commercial quality. 4K 240fps.
```

---

## SECONDARY CLIPS (For the Quote Section or Section Breaks)

### Prompt 6 — "Dubai Night + Restaurant"
```
Cinematic wide shot of a warm glowing restaurant exterior at night in Dubai. Al Satwa street vibes. Warm amber interior light spills onto the sidewalk. Slight motion — cars passing, soft city sounds implied. Palm trees visible. Clear night sky. Pakistani restaurant signage softly lit. No people close up. Shot on Sony Venice 2. Anamorphic. 4K.
```

### Prompt 7 — "The Biryani Reveal"
```
Top-down cinematic shot of a large copper handi (pot) lid being slowly lifted to reveal steaming lamb biryani underneath. Saffron-stained rice, caramelized onions, fresh coriander. Dense aromatic steam billows upward into the camera. Warm lighting. Dark wood table surface. Slow motion. Premium food commercial. 4K.
```

### Prompt 8 — "Hands & Heritage"
```
Cinematic close-up of experienced chef's hands kneading dough on a floured surface. Weathered hands, showing decades of craft. Warm soft lighting from one side. Flour dust floating in the air. Shallow depth of field. Documentary style. Feels authentic, not staged. Pakistani kitchen. 4K slow motion.
```

---

## LOOP-FRIENDLY COMBOS (Edit 2–3 clips into a 12-second loop)

### Combo A — "The Craft" (Best for Hero)
1. Spice cascade (Prompt 5) — 4 seconds
2. Karahi sizzling (Prompt 1) — 4 seconds
3. Naan from tandoor (Prompt 3) — 4 seconds
*Transition: smooth cross-dissolve between each*

### Combo B — "The Experience"
1. Table setting tracking shot (Prompt 4) — 5 seconds
2. Curry pour (Prompt 2) — 4 seconds
3. Biryani reveal (Prompt 7) — 4 seconds
*Transition: slow fade between each*

### Combo C — "Day to Night"
1. Spice cascade macro (Prompt 5) — 4 seconds
2. Chef hands kneading (Prompt 8) — 4 seconds
3. Dubai restaurant exterior night (Prompt 6) — 4 seconds
*Transition: cross-dissolve*

---

## TECHNICAL SPECS FOR HERO VIDEO

| Setting | Value |
|---|---|
| Resolution | 1920x1080 minimum (4K preferred) |
| Format | .mp4 (H.264) or .webm (VP9) |
| Duration | 10–15 seconds (will loop) |
| File size | Under 15MB for fast loading |
| Frame rate | 24fps export (shoot at 120fps for slow-mo) |
| Audio | None (video is muted on site) |
| Aspect ratio | 16:9 landscape |
| Color grade | Warm amber tones, slight desaturation, lifted blacks |

---

## COLOR GRADING NOTES

To match the website's white + green Pakistani luxury palette:
- Warm golden highlights (not orange)
- Slightly desaturated midtones
- Lifted shadows (never crush to pure black)
- Green tint in the shadows (subtle)
- Cream/ivory tone in highlights
- Overall feel: warm, inviting, heritage, premium

---

## HOW TO USE

1. Generate or shoot your video using any prompt above
2. Export as `.mp4` (H.264, under 15MB)
3. Place in your project's `public/` folder
4. Open `src/App.tsx`, find the hero video section
5. Change: `<source src="/hero-video.mp4" type="video/mp4" />`
   To: `<source src="/your-filename.mp4" type="video/mp4" />`
6. Run `npm run dev` — your video plays automatically

---

*Generated by JARVIS Design Intelligence for Ravi Restaurant · ShapesInfinity.tech*
