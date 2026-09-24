import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Bookmark,
  Check,
  ChevronDown,
  FileAudio,
  ListChecks,
  Menu,
  Play,
  Search,
  Sparkles,
  UploadCloud,
  X,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import './marketing-next.css';

const waveform = [
  18, 30, 16, 43, 66, 38, 25, 56, 75, 47, 24, 40, 65, 82, 58, 35, 68, 51, 25,
  45, 72, 38, 20, 55, 74, 46, 28, 61, 39, 17, 32, 52, 25, 14,
];
const moments = [
  {
    time: '08:12',
    line: 'We should make the onboarding steps easier to find.',
    speaker: 'Maya',
    point: 18,
  },
  {
    time: '12:47',
    line: 'I’ll send the revised proposal by Friday.',
    speaker: 'Sarah',
    point: 42,
  },
  {
    time: '18:42',
    line: 'Let’s review the customer feedback together next week.',
    speaker: 'Jordan',
    point: 70,
  },
];
const perspectives = [
  {
    key: 'General',
    eyebrow: 'MEETING RECAP',
    title: 'A clear picture of what happened.',
    body: 'The team reviewed onboarding friction, confirmed the proposal needs revision, and agreed to review customer feedback together next week.',
    detail: 'Next step · Send a revised proposal by Friday.',
  },
  {
    key: 'Sales / Customer',
    eyebrow: 'CUSTOMER VIEW',
    title: 'The commitment and the context.',
    body: 'The proposal requires a revision before the customer can evaluate the next step. The conversation also surfaced onboarding clarity as a concern.',
    detail: 'Follow-up · Share the revised proposal by Friday.',
  },
  {
    key: 'Recruiting / Interview',
    eyebrow: 'INTERVIEW VIEW',
    title: 'The discussion, organized for review.',
    body: 'The conversation included how the team approaches onboarding, feedback reviews, and follow-through on commitments.',
    detail: 'Review note · Revisit the responses at their source timestamps.',
  },
] as const;
const searches = [
  {
    meeting: 'Customer conversation',
    time: '08:12',
    text: 'We should make the onboarding steps easier to find.',
  },
  {
    meeting: 'Product planning',
    time: '14:08',
    text: 'The revised proposal should explain onboarding more clearly.',
  },
  {
    meeting: 'Weekly review',
    time: '22:36',
    text: 'Let’s bring customer feedback into next week’s planning.',
  },
];
const useCases = [
  {
    title: 'Customer calls',
    kicker: 'KEEP THE CUSTOMER’S WORDS',
    heading: 'Understand the request without losing the context.',
    body: 'Find the concern, read the surrounding exchange, and bring the right follow-up into the next conversation.',
    tags: [
      'Searchable transcript',
      'Source-linked actions',
      'Shareable moments',
    ],
  },
  {
    title: 'Sales conversations',
    kicker: 'SEE THE NEXT STEP',
    heading: 'Keep commitments connected to what was said.',
    body: 'Switch to the customer summary view, review objections in the transcript, and return to the exact point behind each action.',
    tags: ['Customer summary', 'Action items', 'Evidence timestamps'],
  },
  {
    title: 'Interviews',
    kicker: 'REVISIT THE RESPONSE',
    heading: 'Review the answer, not just a note about it.',
    body: 'Use the interview-oriented summary to organize the conversation, then go back to the timestamped response for nuance.',
    tags: ['Interview summary', 'Timestamped transcript', 'Playback'],
  },
  {
    title: 'Team planning',
    kicker: 'MAKE DECISIONS FINDABLE',
    heading: 'Carry the useful part into the work ahead.',
    body: 'Search previous discussions, keep important moments, and share the precise context a teammate needs.',
    tags: ['Cross-meeting search', 'Highlights', 'Sharing'],
  },
] as const;
const faqs = [
  {
    question: 'What does Tavrex do with a recording?',
    answer:
      'Tavrex processes a supported meeting file into a timestamped transcript, three summary views, and action items linked to source moments. You can review the result in the same workspace.',
  },
  {
    question: 'Which files can I upload?',
    answer:
      'The current upload flow accepts MP4, MOV, WebM, MP3, M4A, and WAV files. The current limit is 25 MB and 10 minutes per recording.',
  },
  {
    question: 'Can I jump from a summary back to the meeting?',
    answer:
      'Yes. Source timestamps in Tavrex take you to the relevant point in the recording and transcript, so you can check the surrounding context.',
  },
  {
    question: 'Can I search across meetings?',
    answer:
      'Yes. Search finds relevant meeting titles, summaries, and transcript passages across the meetings in your workspace.',
  },
  {
    question: 'Can I share just one moment?',
    answer:
      'Yes. Save a highlight and create a focused public link for that moment. Tavrex also supports sharing a full meeting when you choose to.',
  },
  {
    question: 'What are the three summary views?',
    answer:
      'General, Sales / Customer, and Recruiting / Interview. They organize the same conversation for different review needs; they do not change the original transcript.',
  },
  {
    question: 'Do I need a credit card to start?',
    answer:
      'No. Tavrex is free to use in this assessment experience, and account creation does not ask for payment details.',
  },
];

function Brand() {
  return (
    <Link className="marketing-brand" to="/" aria-label="Tavrex home">
      <span className="marketing-brand-mark">
        <AudioLines size={20} strokeWidth={2.2} />
      </span>
      <span>
        tavrex<sup>AI</sup>
      </span>
    </Link>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  const close = () => setOpen(false);
  return (
    <header className={`marketing-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="marketing-container marketing-nav-inner">
        <Brand />
        <nav
          className={`marketing-nav-links ${open ? 'is-open' : ''}`}
          aria-label="Marketing navigation"
        >
          <a href="#product" onClick={close}>
            Product
          </a>
          <a href="#evidence" onClick={close}>
            Why Tavrex
          </a>
          <a href="#use-cases" onClick={close}>
            Use cases
          </a>
          <a href="#how-it-works" onClick={close}>
            How it works
          </a>
          <div className="marketing-mobile-actions">
            <Link to="/login" onClick={close}>
              Sign in
            </Link>
            <Link
              className="marketing-button primary"
              to="/signup"
              onClick={close}
            >
              Get started free <ArrowRight size={16} />
            </Link>
          </div>
        </nav>
        <div className="marketing-nav-actions">
          <ThemeToggle />
          <Link to="/login">Sign in</Link>
          <Link className="marketing-button primary" to="/signup">
            Get started free <ArrowRight size={16} />
          </Link>
        </div>
        <ThemeToggle className="marketing-theme-mobile" />
        <button
          className="marketing-menu-toggle"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}

function Waveform({ active = false }: { active?: boolean }) {
  return (
    <div
      className={`source-waveform ${active ? 'is-active' : ''}`}
      aria-hidden="true"
    >
      {waveform.map((height, index) => (
        <i
          key={index}
          style={{ height: `${height}%`, animationDelay: `${index * 28}ms` }}
        />
      ))}
    </div>
  );
}

function useVisibleCycle() {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (
      !ref.current ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    let timer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && timer === undefined)
          timer = window.setInterval(
            () => setPhase((value) => (value + 1) % 4),
            3000,
          );
        else if (!entry.isIntersecting && timer !== undefined) {
          window.clearInterval(timer);
          timer = undefined;
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (timer !== undefined) window.clearInterval(timer);
    };
  }, []);
  return { ref, phase };
}

function HeroArt() {
  const { ref, phase } = useVisibleCycle();
  return (
    <section
      className="hero-art"
      ref={ref}
      data-phase={phase}
      aria-label="Illustration of a Tavrex meeting becoming sourced intelligence"
    >
      <div className="art-topline">
        <span>
          <span className="art-live-dot" /> ILLUSTRATIVE TAVREX VIEW
        </span>
        <span>CONVERSATION / 24:08</span>
      </div>
      <div className="art-recording">
        <div className="art-recording-head">
          <span className="art-mini-icon">
            <AudioLines size={18} />
          </span>
          <div>
            <small>RECORDING</small>
            <strong>Customer conversation</strong>
          </div>
          <span className="art-playing">
            <Play size={13} fill="currentColor" /> Source
          </span>
        </div>
        <Waveform active />
        <div className="art-timeline">
          <span>00:00</span>
          <div>
            <i />
          </div>
          <span>24:08</span>
        </div>
      </div>
      <div className="art-source-line" aria-hidden="true">
        <span />
        <i />
        <span />
      </div>
      <div className="art-bottom">
        <div className="art-transcript">
          <small>TRANSCRIPT / 12:47</small>
          <b>Sarah</b>
          <p>“I’ll send the revised proposal by Friday.”</p>
          <span>Original words, ready to revisit</span>
        </div>
        <div className="art-intelligence">
          <small>
            <Sparkles size={14} /> TAVREX INTELLIGENCE
          </small>
          <b>Send the revised proposal</b>
          <p>
            Owner · Sarah <span>Due · Friday</span>
          </p>
          <strong>
            Source <ArrowUpRight size={13} /> 12:47
          </strong>
        </div>
      </div>
      <div className="art-foot">
        <span>01 / RECORDING</span>
        <span>02 / TRANSCRIPT</span>
        <span>03 / ACTION</span>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="marketing-hero">
      <div className="marketing-container hero-grid">
        <div className="marketing-hero-copy">
          <span className="marketing-eyebrow">
            <i /> MEETING INTELLIGENCE, WITH THE SOURCE ATTACHED
          </span>
          <h1>
            The meeting ends.
            <br />
            <em className="hero-emphasis">The meaning stays.</em>
          </h1>
          <p>
            Upload a conversation. Tavrex brings back a searchable transcript,
            focused summaries, and next steps you can trace to the exact moment
            they were said.
          </p>
          <div className="marketing-hero-actions">
            <Link className="marketing-button primary large" to="/signup">
              Get started free <ArrowRight size={18} />
            </Link>
            <a className="marketing-button subtle large" href="#product">
              See how it works <ArrowDown size={17} />
            </a>
          </div>
          <div className="hero-note">
            <span className="hero-note-line" />
            <span>No bot in the call. Start with a recording.</span>
          </div>
        </div>
        <HeroArt />
      </div>
      <div className="marketing-container hero-index">
        <span>CONVERSATIONS, MADE USEFUL</span>
        <span>
          SCROLL TO EXPLORE <ArrowDown size={14} />
        </span>
      </div>
    </section>
  );
}

function CapabilityStrip() {
  return (
    <div className="capability-strip">
      <div className="marketing-container">
        <span>UPLOAD A RECORDING</span>
        <span>TIMESTAMPED WORDS</span>
        <span>THREE SUMMARY VIEWS</span>
        <span>SOURCE-LINKED ACTIONS</span>
        <span>SHAREABLE MOMENTS</span>
      </div>
    </div>
  );
}

function Opening() {
  return (
    <section className="opening-section marketing-section">
      <div className="marketing-container opening-grid">
        <div>
          <span className="marketing-eyebrow">
            <i /> THE PROBLEM
          </span>
          <h2>
            Most meetings
            <br />
            end twice.
          </h2>
        </div>
        <div className="opening-copy">
          <p>
            Once when the call stops. Again when everyone tries to remember what
            was decided, who promised what, and where that detail came from.
          </p>
          <div className="opening-thread">
            <span>“I think we covered that…”</span>
            <i />
            <strong>Find the original moment.</strong>
          </div>
          <p>
            Tavrex keeps the recording, the words, and the useful next steps
            connected. You can move from an answer back to its source instead of
            trusting a detached note.
          </p>
        </div>
      </div>
    </section>
  );
}

const stages = [
  {
    label: 'Recording',
    title: 'Bring the conversation.',
    body: 'Upload a supported audio or video recording. Tavrex gives the meeting a place in your workspace.',
    icon: UploadCloud,
  },
  {
    label: 'Transcript',
    title: 'Read what was said.',
    body: 'Follow timestamped passages and move directly between the words and their position in the recording.',
    icon: FileAudio,
  },
  {
    label: 'Intelligence',
    title: 'Understand the shape of it.',
    body: 'Review saved summaries in General, Sales / Customer, or Recruiting / Interview views.',
    icon: Sparkles,
  },
  {
    label: 'Action',
    title: 'Keep the next step.',
    body: 'Find action items and jump back to the source timestamp before you move forward.',
    icon: ListChecks,
  },
] as const;
function Transformation() {
  const [active, setActive] = useState(0);
  return (
    <section className="transformation marketing-section" id="product">
      <div className="marketing-container">
        <div className="section-heading split">
          <span className="marketing-eyebrow">
            <i /> FROM RECORDING TO CLARITY
          </span>
          <h2>
            One conversation.
            <br />
            <em>More than a file.</em>
          </h2>
          <p>
            A single source thread runs through everything Tavrex creates.
            Explore the four parts of the workflow.
          </p>
        </div>
        <div className="transform-grid">
          <div className="transform-steps">
            {stages.map((stage, index) => (
              <button
                key={stage.label}
                type="button"
                className={active === index ? 'is-active' : ''}
                aria-pressed={active === index}
                onClick={() => setActive(index)}
              >
                <small>
                  0{index + 1} / {stage.label.toUpperCase()}
                </small>
                <strong>{stage.title}</strong>
                <span>{stage.body}</span>
              </button>
            ))}
          </div>
          <div className="transform-stage" aria-live="polite">
            <div className="transform-stage-top">
              <span>THE SOURCE THREAD</span>
              <span>0{active + 1} / 04</span>
            </div>
            <div className="transform-art" key={active}>
              <div
                className={`transform-visual transform-visual-${active}`}
                aria-hidden="true"
              >
                {active === 0 && (
                  <div className="visual-recording">
                    <FileAudio size={29} />
                    <span>
                      <b>Customer conversation.mp4</b>
                      <small>24:08 · ready to process</small>
                    </span>
                    <i>
                      <span />
                    </i>
                  </div>
                )}
                {active === 1 && (
                  <div className="visual-transcript">
                    <span>
                      <small>08:12</small>
                      <i />
                    </span>
                    <span className="is-source">
                      <small>12:47</small>
                      <b>“I’ll send the revised proposal…”</b>
                    </span>
                    <span>
                      <small>18:42</small>
                      <i />
                    </span>
                  </div>
                )}
                {active === 2 && (
                  <div className="visual-summary">
                    <small>MEETING RECAP</small>
                    <b>What mattered</b>
                    <span>
                      01 <i>Onboarding needs clarity</i>
                    </span>
                    <span>
                      02 <i>Proposal needs revision</i>
                    </span>
                  </div>
                )}
                {active === 3 && (
                  <div className="visual-action">
                    <Check size={19} />
                    <span>
                      <b>Send revised proposal</b>
                      <small>Sarah · Friday</small>
                    </span>
                    <em>12:47 ↗</em>
                  </div>
                )}
              </div>
              <div className="transform-object">
                <small>
                  {stages[active].label.toUpperCase()} / ILLUSTRATIVE
                </small>
                <strong>
                  {active === 0
                    ? 'Customer conversation.mp4'
                    : active === 1
                      ? 'Sarah · 12:47'
                      : active === 2
                        ? 'Proposal and next steps'
                        : 'Send revised proposal'}
                </strong>
                <p>
                  {active === 0
                    ? 'A meeting enters Tavrex.'
                    : active === 1
                      ? '“I’ll send the revised proposal by Friday.”'
                      : active === 2
                        ? 'The team agreed to revise the proposal and review customer feedback next week.'
                        : 'Owner Sarah · Due Friday · Source 12:47'}
                </p>
              </div>
            </div>
            <div className="transform-stage-bottom">
              <span>RECORDING</span>
              <ArrowRight size={16} />
              <span>TRANSCRIPT</span>
              <ArrowRight size={16} />
              <span>INTELLIGENCE</span>
              <ArrowRight size={16} />
              <span>ACTION</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TranscriptStory() {
  const [selected, setSelected] = useState(1);
  return (
    <section className="transcript-story marketing-section">
      <div className="marketing-container transcript-grid">
        <div className="section-heading">
          <span className="marketing-eyebrow">
            <i /> LISTEN WITH CONTEXT
          </span>
          <h2>The words and the recording stay together.</h2>
          <p>
            Follow the conversation as it unfolds, or select a timestamp to
            return to the exact passage. A long recording becomes something you
            can navigate.
          </p>
          <span className="story-caption">
            ILLUSTRATIVE INTERACTION · SELECT A TIMESTAMP
          </span>
        </div>
        <div className="transcript-demo">
          <div className="transcript-media">
            <div className="transcript-media-meta">
              <span>
                <AudioLines size={16} /> Customer conversation
              </span>
              <span>24:08</span>
            </div>
            <Waveform active />
            <div className="transcript-seek">
              <span>
                <Play size={12} fill="currentColor" /> {moments[selected].time}
              </span>
              <div>
                <i style={{ width: `${moments[selected].point}%` }} />
              </div>
              <span>24:08</span>
            </div>
          </div>
          <div className="transcript-rows">
            {moments.map((moment, index) => (
              <button
                key={moment.time}
                type="button"
                className={selected === index ? 'is-active' : ''}
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
              >
                <span>{moment.time}</span>
                <div>
                  <strong>{moment.speaker}</strong>
                  <p>{moment.line}</p>
                </div>
                <ArrowUpRight size={15} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryStory() {
  const [selected, setSelected] = useState(0);
  const content = perspectives[selected];
  return (
    <section className="summary-story marketing-section">
      <div className="marketing-container summary-grid">
        <div className="section-heading">
          <span className="marketing-eyebrow">
            <i /> THREE WAYS TO READ IT
          </span>
          <h2>
            Same conversation.
            <br />
            <em>The view you need.</em>
          </h2>
          <p>
            Every meeting has more than one useful reading. Switch between
            Tavrex’s three saved summary views without changing the original
            words.
          </p>
        </div>
        <div className="summary-demo">
          <div
            className="summary-demo-tabs"
            role="group"
            aria-label="Illustrative summary view"
          >
            {perspectives.map((item, index) => (
              <button
                key={item.key}
                type="button"
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
              >
                {item.key}
              </button>
            ))}
          </div>
          <article
            key={content.key}
            className="summary-demo-copy"
            aria-live="polite"
          >
            <small>{content.eyebrow} / ILLUSTRATIVE</small>
            <h3>{content.title}</h3>
            <p>{content.body}</p>
            <div>
              <Check size={17} />
              <span>{content.detail}</span>
            </div>
          </article>
          <div className="summary-demo-foot">
            <span>GENERAL</span>
            <span>SALES / CUSTOMER</span>
            <span>RECRUITING / INTERVIEW</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function EvidenceStory() {
  const [connected, setConnected] = useState(false);
  return (
    <section className="evidence-story marketing-section" id="evidence">
      <div className="marketing-container">
        <div className="evidence-heading">
          <span className="marketing-eyebrow">
            <i /> CONTEXT, NOT BLACK-BOX ANSWERS
          </span>
          <h2>
            Every useful answer
            <br />
            has a <em>way back.</em>
          </h2>
          <p>
            Source timestamps connect Tavrex’s output to the conversation that
            produced it. Select the source below to see how a next step points
            to the original words.
          </p>
        </div>
        <div className={`evidence-scene ${connected ? 'is-connected' : ''}`}>
          <div className="evidence-action">
            <span>
              <ListChecks size={17} /> ACTION ITEM
            </span>
            <h3>Send the revised proposal</h3>
            <p>Sarah · Friday</p>
            <button
              type="button"
              onClick={() => setConnected(!connected)}
              aria-pressed={connected}
            >
              Source · 12:47 <ArrowUpRight size={15} />
            </button>
          </div>
          <div className="evidence-thread" aria-hidden="true">
            <i />
            <span>12:47</span>
            <i />
          </div>
          <div className="evidence-original">
            <span>
              <AudioLines size={17} /> ORIGINAL CONVERSATION
            </span>
            <div>
              <small>Sarah · 12:47</small>
              <p>“I’ll send the revised proposal by Friday.”</p>
            </div>
            <div className="evidence-original-progress">
              <i />
            </div>
          </div>
        </div>
        <p className="evidence-footnote">
          An illustration of source navigation in Tavrex. In the app, the
          timestamp seeks the recording and transcript.
        </p>
      </div>
    </section>
  );
}

function highlight(text: string, query: string) {
  const index = text.toLocaleLowerCase().indexOf(query.toLocaleLowerCase());
  if (index < 0 || !query) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark>{text.slice(index, index + query.length)}</mark>
      {text.slice(index + query.length)}
    </>
  );
}
function SearchStory() {
  const [query, setQuery] = useState('onboarding');
  const filtered = searches.filter((item) =>
    `${item.meeting} ${item.text}`
      .toLocaleLowerCase()
      .includes(query.trim().toLocaleLowerCase()),
  );
  return (
    <section className="search-story marketing-section">
      <div className="marketing-container search-grid">
        <div className="section-heading">
          <span className="marketing-eyebrow">
            <i /> SEARCH THE CONVERSATION
          </span>
          <h2>
            Find the thought.
            <br />
            <em>Not just the file.</em>
          </h2>
          <p>
            Search across your meetings to find a topic in the title, summary,
            or transcript. Results bring the surrounding words and their
            timestamps into view.
          </p>
          <span className="story-caption">
            ILLUSTRATIVE SEARCH · TRY “PROPOSAL”
          </span>
        </div>
        <div className="search-demo">
          <label htmlFor="marketing-search">
            <Search size={20} />
            <input
              id="marketing-search"
              aria-label="Search conversations"
              value={query}
              maxLength={40}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search conversations"
            />
            <kbd>SEARCH</kbd>
          </label>
          <div className="search-demo-results" aria-live="polite">
            {!query.trim() ? (
              <p>Type a topic to explore the example conversations.</p>
            ) : filtered.length ? (
              filtered.map((item) => (
                <article key={item.meeting}>
                  <div>
                    <span>{item.meeting}</span>
                    <small>TRANSCRIPT · {item.time}</small>
                  </div>
                  <p>“{highlight(item.text, query.trim())}”</p>
                </article>
              ))
            ) : (
              <p>
                No example conversations match “{query}”. Try “proposal” or
                “customer”.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function MomentsStory() {
  const [previewShare, setPreviewShare] = useState(false);
  return (
    <section className="moments-story marketing-section">
      <div className="marketing-container moments-grid">
        <div className={`moments-art ${previewShare ? 'is-sharing' : ''}`}>
          <div className="moments-line">
            <span>00:00</span>
            <i />
            <b>12:47</b>
            <i />
            <span>24:08</span>
          </div>
          <div
            className="moments-actions"
            role="group"
            aria-label="Illustrative moment view"
          >
            <button
              type="button"
              aria-pressed={!previewShare}
              onClick={() => setPreviewShare(false)}
            >
              Saved moment
            </button>
            <button
              type="button"
              aria-pressed={previewShare}
              onClick={() => setPreviewShare(true)}
            >
              Shared view <ArrowUpRight size={13} />
            </button>
          </div>
          <div className="moments-selection">
            <span>
              <Bookmark size={15} /> SAVED MOMENT
            </span>
            <strong>The proposal commitment</strong>
            <small>12:47–13:14 · From the original meeting</small>
          </div>
          <div className="moments-public">
            <span>
              PUBLIC MOMENT VIEW <ArrowUpRight size={14} />
            </span>
            <p>One focused moment, with its meeting context attached.</p>
            <span className="moments-public-line" />
          </div>
          <small>ILLUSTRATIVE TAVREX VIEW</small>
        </div>
        <div className="section-heading">
          <span className="marketing-eyebrow">
            <i /> KEEP WHAT MATTERS
          </span>
          <h2>
            Share the moment.
            <br />
            <em>Keep the context.</em>
          </h2>
          <p>
            Save a highlight from the meeting and share a focused public view.
            The recipient can see the relevant moment without searching through
            the whole recording.
          </p>
          <p>
            When the whole conversation is useful, Tavrex also lets you share
            the full meeting.
          </p>
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  const [selected, setSelected] = useState(0);
  const item = useCases[selected];
  return (
    <section className="use-cases marketing-section" id="use-cases">
      <div className="marketing-container">
        <div className="section-heading use-cases-heading">
          <span className="marketing-eyebrow">
            <i /> WHERE CONTEXT COUNTS
          </span>
          <h2>
            Different conversations.
            <br />
            <em>One place to return.</em>
          </h2>
          <p>
            Tavrex applies the same recording, transcript, search, and
            source-linked review to the conversations your work depends on.
          </p>
        </div>
        <div className="use-cases-grid">
          <div
            className="use-cases-tabs"
            role="group"
            aria-label="Explore use cases"
          >
            {useCases.map((caseItem, index) => (
              <button
                key={caseItem.title}
                type="button"
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
              >
                <span>0{index + 1}</span>
                {caseItem.title}
                <ArrowUpRight size={17} />
              </button>
            ))}
          </div>
          <div className="use-cases-panel" key={item.title}>
            <span>{item.kicker}</span>
            <h3>{item.heading}</h3>
            <p>{item.body}</p>
            <div>
              {item.tags.map((tag) => (
                <small key={tag}>{tag}</small>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="philosophy marketing-section">
      <div className="marketing-container philosophy-grid">
        <div>
          <span className="marketing-eyebrow">
            <i /> THE TAVREX APPROACH
          </span>
          <h2>
            Make the conversation
            <br />
            <em>usable afterward.</em>
          </h2>
        </div>
        <div className="philosophy-list">
          <article>
            <span>01</span>
            <div>
              <h3>The original words matter.</h3>
              <p>
                A summary is a starting point. Timestamps let you inspect what
                was actually said.
              </p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>Clarity beats more notes.</h3>
              <p>
                Three deliberate summary views help you read the same meeting
                for the question at hand.
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>Context should travel.</h3>
              <p>
                Save the useful moment and share it with enough surrounding
                information to be understood.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Steps() {
  return (
    <section className="steps-section marketing-section" id="how-it-works">
      <div className="marketing-container">
        <div className="section-heading">
          <span className="marketing-eyebrow">
            <i /> A SIMPLE WAY IN
          </span>
          <h2>
            From file to
            <br />
            <em>follow-through.</em>
          </h2>
          <p>
            No meeting bot or calendar setup. Start with a supported recording
            and review it in your Tavrex workspace.
          </p>
        </div>
        <div className="steps-line">
          {[
            {
              n: '01',
              icon: UploadCloud,
              title: 'Create an account',
              body: 'Get your own Tavrex workspace.',
            },
            {
              n: '02',
              icon: FileAudio,
              title: 'Add a recording',
              body: 'Upload supported audio or video.',
            },
            {
              n: '03',
              icon: Sparkles,
              title: 'Review the meeting',
              body: 'Read the transcript and summary views.',
            },
            {
              n: '04',
              icon: ArrowUpRight,
              title: 'Use what matters',
              body: 'Find actions, search, and share context.',
            },
          ].map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.n}>
                <span className="steps-number">{step.n}</span>
                <Icon size={22} />
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            );
          })}
        </div>
        <Link className="marketing-text-link" to="/signup">
          Get started free <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="faq-section marketing-section" id="faq">
      <div className="marketing-container faq-grid">
        <div className="section-heading">
          <span className="marketing-eyebrow">
            <i /> GOOD TO KNOW
          </span>
          <h2>
            A little more
            <br />
            <em>about Tavrex.</em>
          </h2>
          <p>Clear answers before you bring in your first recording.</p>
        </div>
        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.question}>
              <summary>
                {item.question}
                <ChevronDown size={19} />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="marketing-close">
      <div className="marketing-container close-grid">
        <div>
          <span className="marketing-eyebrow">
            <i /> TAVREX AI
          </span>
          <h2>
            The meeting ends.
            <br />
            <em>The context shouldn’t.</em>
          </h2>
          <p>
            Bring the recording. Keep the words, the decisions, and the next
            step within reach.
          </p>
          <Link className="marketing-button primary large" to="/signup">
            Get started free <ArrowRight size={18} />
          </Link>
        </div>
        <div className="close-art" aria-hidden="true">
          <span className="close-orbit close-orbit-outer" />
          <span className="close-orbit close-orbit-inner" />
          <div className="close-core">
            <small>FROM THE RECORDING</small>
            <strong>12:47</strong>
            <span>“I’ll send the revised proposal.”</span>
          </div>
          <div className="close-trail">
            <span>WORDS</span>
            <i />
            <span>CONTEXT</span>
            <i />
            <strong>WHAT’S NEXT</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="marketing-footer">
      <div className="marketing-container">
        <div className="footer-top">
          <div>
            <Brand />
            <p>Meeting intelligence with the source attached.</p>
          </div>
          <div className="footer-links">
            <div>
              <strong>Explore</strong>
              <a href="#product">Product</a>
              <a href="#evidence">Why Tavrex</a>
              <a href="#use-cases">Use cases</a>
              <a href="#how-it-works">How it works</a>
              <a href="#faq">FAQ</a>
            </div>
            <div>
              <strong>Account</strong>
              <Link to="/signup">Get started free</Link>
              <Link to="/login">Sign in</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Tavrex AI</span>
          <span>From conversation to context.</span>
        </div>
      </div>
    </footer>
  );
}

export function MarketingHome() {
  useEffect(() => {
    document.title = 'Tavrex AI — Keep what the meeting meant';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        'Upload a meeting and keep the conversation searchable: timestamped transcript, three summary views, sourced action items, and moments to share.',
      );
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = `${location.origin}/`;
    document.head.append(canonical);
    return () => canonical.remove();
  }, []);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const sections = document.querySelectorAll<HTMLElement>(
      '.marketing-section, .marketing-close',
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
      },
      { threshold: 0.04, rootMargin: '0px 0px -24px 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    document.querySelector('.marketing-page')?.classList.add('has-motion');
    return () => observer.disconnect();
  }, []);
  return (
    <div className="marketing-page">
      <a className="skip-link" href="#marketing-main">
        Skip to content
      </a>
      <Navigation />
      <main id="marketing-main">
        <Hero />
        <CapabilityStrip />
        <Opening />
        <Transformation />
        <TranscriptStory />
        <SummaryStory />
        <EvidenceStory />
        <SearchStory />
        <MomentsStory />
        <UseCases />
        <Philosophy />
        <Steps />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
