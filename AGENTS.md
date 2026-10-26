<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Services live only in src/lib/services.ts (one registry; routes are `/$service`, active nav derives from the URL) — avoids duplicated service lists.
- Demo content lives in src/lib/demo-data.ts and is labeled "Demo" in the UI — the app is frontend-only with no backend or external APIs.

- Homepage and service pages share the portal-grid utility; primary service shortcuts derive from the registry and additional services remain in All Services — keeps layout and navigation consistent.
- Generated demo contact-sheet media is registered with demo data and cropped through reusable media utilities — keeps fabricated content and its assets centralized.
