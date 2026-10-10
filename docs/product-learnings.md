# Product learnings

Decisions the owner and Claude settled while building Kickoff (web, iPhone, Mac, marketing site), written as rules so every other page and product follows the same consensus. Each rule says why. Added in 1.3.1. When a new decision is made in any project, add it here in the same session.

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
