One match: competition, two teams, time or score, and a status badge. You provide the match data and which teams the person follows.

Show kickoff in the person's timezone in `data-m`, with the day in `body-s`. Followed teams carry the saffron seed (`accent`, 9px) after the name, which replaces a star icon everywhere. A live match gets the `live` inset outline, a LIVE badge and the score in `data-l` style. Crests are the club's own images; the coloured initials here are only a stand-in.

- Never show a countdown and a score together. A finished match shows FULL TIME and the score.
- Team names truncate with an ellipsis; the time and score never wrap.
- The whole card is one tap target that opens the match.
