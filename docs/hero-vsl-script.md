# Hero VSL script

**No target length.** An earlier version of this doc capped it at 3:00 to 3:30, which was
wrong. The recorded call runs 2 minutes 35 seconds and the length is the argument: nobody
believes an AI holds a real conversation until they have sat through one. Cutting it to
hit a number would remove the only thing on the page that cannot be argued with.

Structure follows a demo call, because a demo call converts by letting the owner hear the
thing work before anyone asks them for anything.

The recorded call is the asset. Everything else is framing around it. Pick the best real
after-hours call you have, with permission to use it.

## What is actually built

`Artifact-AI-Solutions/echo-video`, branch `vsl/fill-dead-air`, composition `HeroVSL`.
Runtime 4:20. Timings below are the real ones, taken from the transcript rather than
estimated.

| time | picture | source |
| --- | --- | --- |
| 0:00 – 0:24 | cold open, waveform and the 11:47 PM reveal | `VSL-ColdOpen` |
| 0:24 – 0:42 | Darien to camera | export footage |
| 0:42 – 0:57 | van B-roll, with the call-log card at 0:50 | export + `VSL-StatCallLog` |
| 0:57 – 3:32 | the call, 155s, capture panel filling 9 of 9 | `CallTranscript` |
| 3:32 – 4:11 | the three questions | `VSL-Objections` |
| 4:11 – 4:20 | the close | `VSL-Close` |

---

## 0:00 to 0:15 | Cold open, no talking head

**Screen:** black, then a waveform moving. No logo, no title card, no music bed.

**Audio:** the real call. One ring, then Grace answering. Let it run about 10 seconds,
enough for the caller to say what is broken and hear a human-sounding reply.

**Darien, voice over the tail of it:**

> That call came in at 11:47 at night. Nobody at the shop was awake for it. It booked.

**Why this open:** most VSLs start with a name and a promise. Starting with the product
working means an owner who bounces at 8 seconds still heard the pitch.

---

## 0:15 to 0:35 | Reveal

**Screen:** cut to Darien on camera.

> I'm Darien. I build AI receptionists for HVAC and plumbing shops. What you just heard
> is one of ours picking up a real call for a real client, after hours, with the whole
> team at home.
>
> I'm going to play you the rest of that call, then show you exactly what happened on the
> back end while it was going on. About three minutes.

**Why:** setting the runtime up front lowers the bounce rate. People stay when they know
what they signed up for.

---

## 0:35 to 1:00 | Their world, not your product

**Screen:** Darien on camera, or B-roll of a van and a tech on a roof.

> Your phone rings while your guys are in an attic. Or it's 8pm. Or it's Saturday
> afternoon. Nobody picks up, that customer calls the next name on the list, and you
> never find out it happened.
>
> Most shops I talk to are missing somewhere between a fifth and a third of their inbound
> calls. You can check yours tonight. Pull your call log and count everything under
> fifteen seconds. That's your number.

**Why:** giving them a way to verify their own pain, without you, is the strongest trust
move in the whole video. It says you are not afraid of what they will find.

---

## 1:00 to 2:00 | The demo, played straight

**Screen:** the call transcript building line by line as the audio plays. Highlight each
piece of information as it gets captured.

**Audio:** the full call, start to finish. Do not cut it for time. The length is the point.

**Darien voice over, dropped in over the gaps, not talking across the caller:**

> She's not reading a script at him. She's collecting what your dispatcher would collect.

> That's the address confirmed back to him, so it lands in the system right.

> And that's the job going on the schedule while he's still on the phone.

**Why:** an owner's real objection is that AI phone bots are obviously bots. You cannot
argue someone out of that. You can only let them listen.

---

## 2:00 to 2:30 | What happened while the call was running

**Screen:** screen recording of Command HQ. Show the call landing, the ticket, the board.

> By the time he hung up, the job was on the board. Trade tagged, ticket attached, ready
> for whoever's dispatching in the morning. Nobody on your team typed a word.
>
> Every call gets logged the same way, whether it books or not. So Monday morning you can
> see what actually came in over the weekend instead of guessing.

---

## 2:30 to 2:55 | The three questions everyone asks

**Screen:** back on camera. Keep this fast and flat, no graphics.

> Three things owners ask me every time, so let me get ahead of them.
>
> Does it replace my CSRs. No. Every client we have kept their team. It takes the
> overflow and the after-hours, so your people aren't answering the phone at nine at night.
>
> Does it sound like a robot. You just heard it. We build a custom voice for every client
> and match it to your market.
>
> Does it work with my CRM. ServiceTitan, Service Fusion, Housecall Pro. We check what
> your API actually supports before you commit to anything, not after.

**Why:** handling objections before the call means the call is about fit and pricing
instead of skepticism. Shorter sales cycle.

---

## 2:55 to 3:10 | Proof

**Screen:** client logos, or a clip from the JD Nesmith case study.

> JD's Prompt has had this on their after-hours since go live. Every call answered.
> None missed.
>
> Bruce Thornton AC booked their first ever overnight job in the first month. [VERIFY
> TICKET VALUE BEFORE RECORDING] at 11:47pm, from a call that used to go to voicemail.

---

## 3:10 to 3:30 | Close

**Screen:** Darien on camera. Booking calendar visible behind or beside him.

> If you want to know what your phone is costing you, book a call. Thirty minutes.
> We'll look at your call volume together and I'll tell you straight whether Echo would
> catch enough to be worth paying for.
>
> If it wouldn't, I'll say so on the call.

**Why the last line:** volunteering that you might disqualify them is the single highest
trust signal available, and it filters out the calls you did not want anyway.

---

## On length

This doc used to carry a 90-second cut. It is gone, because the length cap it existed to
serve is gone.

If a short version is ever needed for an ad, cut a separate asset from the same footage
rather than shortening this one. A 90-second edit and a hero VSL are different jobs: the
short one buys a click, this one has to survive a skeptical owner watching the whole
thing before booking. Trimming the call to fit an ad length would gut the only section
that answers "does it actually sound like a person".

---

## Production notes

- Shoot the talking-head parts in one sitting, same shirt, same framing, so cuts between
  sections do not jump.
- Record the screen captures at 1920x1080 and slow the cursor down. Fast cursor movement
  reads as nervous.
- Get written permission from the client whose call you use before this goes public,
  including the caller if their name or number is audible. Bleep the phone number.
- No music under the call audio. Music under a demo makes people assume it is staged.
- Transcode before committing. See README for the ffmpeg settings and the 100MB ceiling.

## Open items

- **The close has no voiceover.** It is the one section never recorded. The audio bed ends
  around 4:11 and the card currently plays silent to 4:20. The words are in the Close
  section above, roughly fifteen seconds of read.
- **The lower third is burned into the export.** Plain white text over a bright pool,
  crossing his hands. It cannot be replaced without the raw intro clip. `VSL-LowerThird`
  is built and waiting for that clip.
- **Sarah vs Grace.** The recording says Grace. The `SarahHero` composition in echo-video
  says Sarah. One of them is wrong on a customer-facing asset.
- **Three accent colours** across the repo: `#006494` on the funnel and the VSL scenes,
  `#0284c7` in `sarah/tokens.ts`, amber `#FFB000` in `kinetic/tokens.ts`.
- **BTAC ticket value is unconfirmed.** The anti-slop rules say $600+, `artifact-ai-os/CLAUDE.md`
  says $400. Confirm before recording, then fix it in both places so this does not
  resurface.
