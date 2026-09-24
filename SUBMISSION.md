# Tavrex AI product review

- **Live application:** https://tavrex-ai.pages.dev
- **Repository:** https://github.com/zeddspear/tavrex-ai (public access needs verification;
  unauthenticated HTTP 404 during the September 24 audit).

The live URL opens a public product page. **Get started free** opens signup, then the real `/app` workspace. Reviewers can also open `/app` directly, where one permissioned, sanitized real recording appears without a login. Synthetic seed records remain stored but are excluded from meeting discovery. The real recording's imported timestamped transcript and prepared summaries
are disclosed as demo output. New private uploads use live transcription and
analysis. Both public seeds and private recordings use Supabase persistence.

## What to try

1. Sign up from the landing page or visit `/app` directly. From the dashboard, open **From conversation to recording**. Play the real
   media, click transcript timestamp `1:37`, and confirm that playback seeks to
   the participant's source turn.
2. Switch among **General**, **Sales / Customer**, and **Recruiting / Interview**.
   Follow an action-item source, then search the transcript for `recording`.
3. Save a transcript moment and open its standalone public view. Then use
   **Share meeting** to open the complete read-only meeting in a clean browser.
4. Return to the dashboard, search `video is not getting recorded`, and open the
   contextual cross-meeting result at its source time.
5. Open **Upload recording** for the live private ingestion flow. A completed
   upload supports playback, transcript search, manual speaker rename, export,
   revocable sharing, and owner-only deletion.

## Reviewer notes

- The public landing, direct `/app` workspace, moment, and full-meeting share pages need no credentials. Landing CTAs lead to signup, which immediately enters `/app` because email confirmation is disabled for this assessment. The confirmation callback remains available for a later custom-SMTP setup. The reviewer demo does not depend on signup. An account can retain uploaded meetings across browsers. Guest-uploaded meetings require the seven-day browser cookie until linked to an account; incognito visitors can see one only after its owner creates a full-meeting link. The owner can revoke that link from the owning workspace.
- The public moment route works only for the permissioned public seeded recording.
- File limits are 25 MB and ten minutes. Provider and workspace quotas are bounded;
  processing uses a foreground request with check/resume and retry states.
- The app has no live conferencing bot or calendar integration. The real public
  recording's transcript and summaries are imported/prepared; private uploads run
  live Whisper and Llama models.
- The responsive showcase path is verified at 1920, 1440, 1280, 1024, 768, and 390 pixels.
  Safari and physical-device testing are not claimed.
- [Final hardening audit](docs/final-audit.md), [checkpoint verification](docs/checkpoints.md), [architecture](docs/architecture.md),
  and [private ingestion setup](docs/ingestion-setup.md) provide implementation evidence.

The assessment brief lists a camera-on walkthrough of five minutes or less as a
required hand-in artifact. The candidate has chosen to omit it and focus this
review on the live product and public implementation. This leaves that official
submission requirement unmet.
