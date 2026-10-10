# Product learnings

Decisions the owner and Claude settled while building Kickoff (web, iPhone, Mac, marketing site), written as rules so every other page and product follows the same consensus. Each rule says why. Added in 1.3.1, extended in 1.3.2 with the marketing site. When a new decision is made in any project, add it here in the same session.

## Look and feel

1. **Classic, calm, premium.** Restraint reads as expensive. Remove before adding. (Owner: "very, very, very important: high end, premium feel.") The material direction in `material-language.md` is the current expression of this.
2. **The theme follows the system.** Light or dark comes from `prefers-color-scheme`. A manual toggle may override it and is remembered on the device. No page forces a theme. Both are designed.
3. **A calmer orange.** The ember accent is soft and slightly desaturated (same hue). It is never neon, and it is spent once per screen.
4. **Do not clone a reference.** Raycast was the first benchmark and then read as "too copied". Take the principles (near-black ground, hairlines) and leave the signature moves (floating glass nav as the hero, diagonal light streaks, glow button). Each product keeps its own signature: for Kickoff, the dotted pitch and the ring.
5. **One subject, one spark, one flourish.** First screen: one object, the accent once, at most one serif phrase.

## Content and empty states

6. **Never show "none listed".** If something is missing, say what it means and offer the next step ("No broadcaster known for your country yet").
7. **Never bounce people to a Google search** as a fallback. Link to a specific destination or say nothing is available.
8. **Highlights never autoplay.** Video starts only on a tap. Autoplay surprises people and costs data.
9. **Clubs and countries without a logo get a monogram or flag**, never a generic icon. Crests come from the data; where they are missing or a licence is in doubt, the monogram badge is the design, not a hack.
10. **Timezones are explicit.** Show the zone with every time ("Sat, Oct 10, 9:30 AM EDT").

## Lists and pickers

11. **Ticked items come first.** In any pick list (leagues, clubs, countries, players), selected rows sit at the top in their own group ("Following · n"), then the rest. Order inside a group is stable.
12. **Show only what is relevant.** After ticking leagues, list the clubs of ticked leagues, not every club that exists. A group with nothing left to show disappears.
13. **Choosing fills the next list at once.** Ticking a league loads its clubs in real time. No "load" button, no waiting screen.
14. **"Following" is the seed, not a star.** The Teams tab icon is a club shield (`shield.lefthalf.filled` on Apple). Stars, hearts and bells are not used for following. Open question: the small star markers on match rows still exist and may move to the seed.

## Navigation and layout

15. **Search sits at the top and is always visible.** On iPhone it is a navigation-bar drawer (`displayMode: .always`), never tucked under a floating control.
16. **A floating dock must not hide content.** Give scroll content a bottom inset equal to the dock height. Check every screen with the dock showing.
17. **iPad supports all four orientations** (App Store validation requires it).
18. **Liquid Glass where available.** Use the OS glass effect on iOS 26 and later, with a translucent material fallback. The dock puck slides between tabs (matched geometry), slowly and without bounce.
19. **Desktop marketing pages fit one screen.** Hero, one product window, one strip of platform links and one promise line. Below that, plain pages (pricing, privacy, terms) share the same tokens.

## Privacy as design

20. **Self-host everything.** Fonts and images come from the same origin. No Google Fonts, no third-party scripts.
21. **Never claim "no tracking" while loading something that tracks.** The claim and the page must agree. If a Google resource is needed (sign-in), say so next to it.
22. **Optional sign-in explains itself in one sentence** ("syncs your teams; reads only the account's unique id").

## Sharing and assets

23. **The link-preview image matches the current design.** 1200 by 630, rendered from HTML with headless Chrome, with a versioned URL (`og.png?v=N`) to defeat social caches. Web app and marketing site carry the same Open Graph and Twitter tags. Regenerate it whenever the look changes.
24. **Diagrams are minimal.** Boxes and arrows in lanes (clients, services, data, automation). The one accent colour marks the single path that matters (for Kickoff, `claude -p`). A short caption states the security boundary.
25. **Icons.** The brand mark is the football. SF Symbols on Apple platforms, 24px 1.75 stroke elsewhere.

## Process

26. **Verify visually in both themes** before calling a design change done: headless Chrome screenshots (light and dark) for the web, simulator screenshots for iPhone, device install for the final check.
27. **Tokens, not literals.** Change the language here, run `dl check`, `dl bump`, `dl sync`, then rebuild each project. Never hand-edit generated files.
28. **Prose rules apply to UI copy too:** no em dashes, en dashes or double hyphens; sentence case; name the result on buttons.

## Marketing site (added in 1.3.2, from kickoff.codesavory.dev)

Learned while building and reworking the Kickoff marketing site between 7 and 10 October 2026 (about 40 commits). Rules 29 to 33 are about the look, 34 to 37 about launch honesty, 38 to 40 about legal pages and Google review, 41 to 43 about shipping details, and the last block lists things still to fix.

### Look and motion

29. **The first screen proves the product, alive.** The demo window is built from the real components (same match card, ring and crests), with a real countdown, a live match minute and a score that changes. It is hidden from assistive tech (`aria-hidden`) because it is decoration, and it stops moving when reduced motion is on. A mockup image goes stale the day the app changes; a built one follows the tokens.
30. **Mirror the app, do not invent a second look.** The page drifted into its own style (floodlights, light streaks, a glow button, then a soft glow background) and was pulled back so the demo window matches the app ("classic look everywhere"). Marketing pages share the product's tokens, so a visitor sees what they will get.
31. **Motion is rare and settles.** A ball that bounced forever was removed; the calm version drops in once and rests. The only things that loop are the live demo, the competitions ticker and one pulse dot. One global rule turns all animation and transitions off under `prefers-reduced-motion`.
32. **No palette picker for visitors.** The accent is the brand's to choose. The top bar holds a light and dark switch and nothing else, and its icon shows what a click will give, not the current state.
33. **Fit one desktop screen by sizing in viewport height.** From 901px up, the hero uses `min-height: min(900px, 100svh)` and type, ring, padding and gaps use `clamp(min, N vh, max)`. Below 900px nothing is forced: it flows and stacks. Check at 1280 by 720, 1440 by 800, 1920 by 1080 and a phone. This is how rule 19 is met.

### Launch honesty

34. **A download button is never a dead link.** Before the app exists it says "Soon" and a tap shows a short toast. All download addresses live in one small file (`downloads.js`), and a button turns itself on the moment its address is filled in. No other edit is needed to launch.
35. **A platform with no app gets an honest sign-up, not a fake button.** Android became an email form that stores only the address and the platform in our own database (no third-party list), with a mail to the owner at signup milestones. Say plainly what is stored and that we write once.
36. **Say what you are not.** The footer states the trademark and copyright, where it is made, and "Not affiliated with any league or club".
37. **Keep the pricing page and the product in step.** If a plan cannot be bought yet, the pricing page says so (a "coming soon" line) rather than showing a price as if it were live. See the open items below.

### Legal pages and Google review

38. **Legal pages are part of the design system.** Privacy, terms and pricing use the same header, theme and tokens, link to each other from the footer of every page, and live on the same domain as the home page.
39. **Legal URLs answer with HTTP 200, never a redirect.** `/privacy` and `/terms` serve the page directly. Crawlers and brand reviewers fail on redirects.
40. **Write the page for the reviewer when Google sign-in is used.** Put a visible "About" section on the home page that states what the app does and why sign-in is offered. Name privacy headings after the topics Google checks ("Google user data: what the app accesses", "how it is used", "who it is shared with", "how it is protected", "retention and deletion"). Name the exact scope ("openid" only: no email, name or photo), say the data is never sold or shared or used to train AI, and make the home page, the privacy page and the consent screen say the same thing.

### Shipping details

41. **Carry the theme between sites once, then clean the address.** The marketing site adds `?theme=` to links into the web app. The app reads it, stores it on the device and removes the parameter from the address bar. Nothing else (no palette) is passed.
42. **Hostnames and DNS.** Use one-level names (`kickoff.codesavory.dev`, `kickoff-web.codesavory.dev`): the free certificate covers one level only. A Workers custom domain creates an IPv6-only record, so add a proxied `A` record too or IPv4-only networks cannot resolve it. Keep DNS-only (not proxied) where the host needs the visitor's country, as Vercel does for its country header.
43. **Settle the direction before polishing.** The history shows the look changing direction several times in three days (a Raycast-like page, then its own pitch look, then glow, then classic). Agree one screenshot of one screen first, then build, so polish is not thrown away. This is rule 4 applied to process.

### Open items found while writing this (as of 2026-10-10)

- **"No tracking" versus the analytics beacon.** The marketing site loads Cloudflare Web Analytics (cookie-free page counts, and the privacy page says so), but the home page and its description still say "No ads, no tracking". Rule 21 applies: either say "no ads, no cookies, cookie-free page counts" or remove the beacon.
- **Stale cache-busting numbers.** The home and pricing pages load `tokens.css?v=49` and `styles.css?v=56`, but the privacy and terms pages still load `?v=10`, so returning visitors may see old styling on the legal pages. Bump the number on every page in one change, or derive it from the file hash.
- **Prices before billing is live.** The pricing page shows $19.99 a year for Plus while Plus limits are wired but switched off. Either label it "coming soon" or hide the price until the subscription can be bought (rule 37).
