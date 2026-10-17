import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import sealed from "@/assets/sealed-backdrop.jpg";
import hero from "@/assets/hero-backdrop.jpg";
import seal from "@/assets/wax-seal.png";
import paper from "@/assets/paper-texture.jpg";

const WEDDING = new Date("2027-02-14T18:00:00+05:30");

const EVENTS = [
  { name: "Mehendi", time: "2027-02-12T16:00:00+05:30", place: "The Courtyard Garden", note: "Henna, marigolds and folk music at dusk." },
  { name: "Sangeet", time: "2027-02-13T19:30:00+05:30", place: "The Grand Pavilion Lawns", note: "An evening of song, dance and lanterns." },
  { name: "Pheras", time: "2027-02-14T18:00:00+05:30", place: "The Grand Pavilion", note: "Seven vows beneath the mandap." },
  { name: "Reception", time: "2027-02-14T21:00:00+05:30", place: "The Grand Pavilion Durbar Hall", note: "Dinner and celebration under the stars." },
];

const fmtDate = (iso: string | Date, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", ...opts }).format(new Date(iso));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aarav & Anaya — 14 February 2027" },
      { name: "description", content: "You are invited to celebrate the wedding of Aarav & Anaya at The Grand Pavilion, 14 February 2027." },
      { property: "og:title", content: "Aarav & Anaya — Wedding Invitation" },
      { property: "og:description", content: "Join us at The Grand Pavilion on 14 February 2027." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

function Invitation() {
  const [opened, setOpened] = useState(false);
  const [breaking, setBreaking] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("locked", !opened);
    return () => document.body.classList.remove("locked");
  }, [opened]);

  const open = () => {
    if (breaking) return;
    setBreaking(true);
    setTimeout(() => setOpened(true), 1100);
  };

  return (
    <main style={{ ["--paper-img" as string]: `url(${paper})` }} className="paper-ground min-h-screen">
      {!opened && <Sealed breaking={breaking} onOpen={open} />}
      <Hero />
      <Section eyebrow="Together with their families" title="An Invitation">
        <p className="mx-auto max-w-xl text-center font-display text-xl leading-relaxed text-foreground/85 sm:text-2xl">
          request the honour of your presence as they begin their forever, in the warm stone courtyards of Rajasthan, among
          marigolds, music and the people they love most.
        </p>
      </Section>
      <Section eyebrow="Reveal the day" title="Scratch the Foil">
        <ScratchCard />
      </Section>
      <Section eyebrow="Until we say yes" title="Counting Down">
        <Countdown />
      </Section>
      <Section eyebrow="Three days of celebration" title="The Festivities">
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {EVENTS.map((e) => (
            <article key={e.name} className="framed-card reveal p-8 text-center">
              <Corners />
              <p className="label-caps text-tint">{fmtDate(e.time, { weekday: "long", day: "numeric", month: "long" })}</p>
              <h3 className="mt-3 font-display text-4xl text-accent">{e.name}</h3>
              <Divider small />
              <p className="label-caps text-ink">{fmtDate(e.time, { hour: "numeric", minute: "2-digit" })} IST</p>
              <p className="mt-2 font-display text-lg text-foreground/80">{e.place}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{e.note}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Where" title="The Grand Pavilion">
        <div className="framed-card reveal mx-auto max-w-xl p-10 text-center">
          <Corners />
          <p className="font-display text-2xl text-foreground/85">The Grand Pavilion</p>
          <p className="mt-2 text-sm text-muted">Amer Road, Jaipur, Rajasthan</p>
          <a
            href="https://maps.google.com/?q=Jaipur"
            target="_blank"
            rel="noreferrer"
            className="label-caps mt-8 inline-block border border-highlight px-8 py-3 text-accent transition-colors hover:bg-accent hover:text-surface"
          >
            Open in Maps
          </a>
        </div>
      </Section>
      <Section eyebrow="Kindly reply by 14 January 2027" title="RSVP">
        <Rsvp />
      </Section>
      <footer className="pb-16 pt-4 text-center">
        <Divider />
        <p className="font-display text-3xl gold-text">Aarav & Anaya</p>
        <p className="label-caps mt-3 text-muted">14 · 02 · 2027</p>
      </footer>
      <RevealObserver />
    </main>
  );
}

function Sealed({ breaking, onOpen }: { breaking: boolean; onOpen: () => void }) {
  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-foreground transition-opacity duration-1000 ${breaking ? "opacity-0 delay-300" : "opacity-100"}`}
    >
      <img src={sealed} alt="" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,color-mix(in_srgb,var(--foreground)_55%,transparent))]" />
      <button
        onClick={onOpen}
        aria-label="Break the seal to open the invitation"
        className={`absolute left-1/2 top-[48%] w-[38vmin] max-w-[240px] min-w-[150px] ${breaking ? "animate-seal-break" : "animate-seal"}`}
        style={{ transform: "translate(-50%,-50%)" }}
      >
        <img src={seal} alt="" width={816} height={816} className="w-full drop-shadow-[0_14px_18px_rgba(40,15,10,.55)]" />
        <span className="absolute inset-0 flex items-center justify-center font-display text-[9vmin] italic leading-none text-paper-light/90 [text-shadow:0_-1px_0_rgba(0,0,0,.35),0_1px_0_rgba(255,255,255,.25)] sm:text-[3.4rem]">
          A<span className="mx-1 text-[0.55em] not-italic">&</span>A
        </span>
      </button>
      <p className="label-caps absolute bottom-[8%] left-0 right-0 text-center text-paper-light/90">Tap the seal to open</p>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
      <img src={hero} alt="" width={1536} height={1024} className="animate-kenburns absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--paper-light)_45%,transparent),transparent_65%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-paper" />
      <div className="relative text-center">
        <p className="label-caps animate-rise text-accent [animation-delay:.3s]">The wedding of</p>
        <h1 className="animate-rise mt-5 font-display text-[clamp(3.2rem,13vw,9rem)] font-medium leading-[0.9] text-accent [animation-delay:.5s] [text-shadow:0_2px_30px_color-mix(in_srgb,var(--paper-light)_90%,transparent)]">
          Aarav
          <span className="block font-display text-[0.45em] italic text-highlight">&</span>
          Anaya
        </h1>
        <div className="framed-card animate-rise mx-auto mt-8 inline-block px-8 py-4 [animation-delay:.8s]">
          <p className="label-caps text-ink">{fmtDate(WEDDING, { weekday: "long" })}</p>
          <p className="mt-1 font-display text-2xl text-foreground">{fmtDate(WEDDING, { day: "numeric", month: "long", year: "numeric" })}</p>
          <p className="label-caps mt-1 text-muted">The Grand Pavilion</p>
        </div>
      </div>
    </section>
  );
}

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="px-5 py-20 sm:py-28">
      <header className="reveal mb-12 text-center">
        <p className="label-caps text-tint">{eyebrow}</p>
        <div className="mx-auto mt-4 flex max-w-md items-center gap-4">
          <span className="gold-rule flex-1" />
          <h2 className="font-display text-4xl text-accent sm:text-5xl">{title}</h2>
          <span className="gold-rule flex-1" />
        </div>
        <Divider />
      </header>
      <div className="reveal">{children}</div>
    </section>
  );
}

function Divider({ small }: { small?: boolean }) {
  return (
    <svg viewBox="0 0 240 24" aria-hidden className={`mx-auto ${small ? "my-4 w-32" : "my-6 w-48"} text-highlight`}>
      <path d="M0 12h92M148 12h92" stroke="currentColor" strokeWidth=".8" />
      <path d="M120 2c6 5 6 15 0 20c-6-5-6-15 0-20z" fill="currentColor" />
      <path d="M104 12c4-5 10-5 14 0c-4 5-10 5-14 0zM136 12c-4-5-10-5-14 0c4 5 10 5 14 0z" fill="none" stroke="currentColor" strokeWidth=".9" />
      <circle cx="96" cy="12" r="1.6" fill="currentColor" />
      <circle cx="144" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

function Corners() {
  const c = (
    <svg viewBox="0 0 48 48" className="h-10 w-10 text-highlight" aria-hidden>
      <path d="M2 30V8a6 6 0 0 1 6-6h22" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M8 22c0-8 6-14 14-14M14 8c0 4-2 6-6 6M20 4q4 6 0 10q-4-4 0-10z" fill="none" stroke="currentColor" strokeWidth=".9" />
      <circle cx="8" cy="8" r="2" fill="currentColor" />
    </svg>
  );
  return (
    <>
      <span className="absolute left-2 top-2">{c}</span>
      <span className="absolute right-2 top-2 -scale-x-100">{c}</span>
      <span className="absolute bottom-2 left-2 -scale-y-100">{c}</span>
      <span className="absolute bottom-2 right-2 -scale-100">{c}</span>
    </>
  );
}

function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, WEDDING.getTime() - (now ?? WEDDING.getTime()));
  const parts = [
    ["Days", Math.floor(diff / 864e5)],
    ["Hours", Math.floor(diff / 36e5) % 24],
    ["Minutes", Math.floor(diff / 6e4) % 60],
    ["Seconds", Math.floor(diff / 1e3) % 60],
  ] as const;
  return (
    <div className="mx-auto grid max-w-2xl grid-cols-4 gap-2 sm:gap-5">
      {parts.map(([l, v]) => (
        <div key={l} className="framed-card px-1 py-6 text-center">
          <p className="font-display text-3xl tabular-nums text-accent sm:text-5xl">{now === null ? "—" : String(v).padStart(2, "0")}</p>
          <p className="label-caps mt-2 !text-[0.55rem] text-muted sm:!text-[0.68rem]">{l}</p>
        </div>
      ))}
    </div>
  );
}

function ScratchCard() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const c = canvas.current!;
    const ctx = c.getContext("2d")!;
    const css = getComputedStyle(document.documentElement);
    const foil = css.getPropertyValue("--scratch-foil").trim();
    const light = css.getPropertyValue("--highlight").trim();
    const r = c.getBoundingClientRect();
    c.width = r.width * 2;
    c.height = r.height * 2;
    const g = ctx.createLinearGradient(0, 0, c.width, c.height);
    g.addColorStop(0, foil);
    g.addColorStop(0.5, light);
    g.addColorStop(1, foil);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, c.width, c.height);
    for (let i = 0; i < 2500; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.12})`;
      ctx.fillRect(Math.random() * c.width, Math.random() * c.height, 2, 2);
    }
    ctx.globalCompositeOperation = "destination-out";
    let down = false;
    const scratch = (e: PointerEvent) => {
      if (!down) return;
      const b = c.getBoundingClientRect();
      ctx.beginPath();
      ctx.arc((e.clientX - b.left) * 2, (e.clientY - b.top) * 2, 44, 0, Math.PI * 2);
      ctx.fill();
    };
    const check = () => {
      down = false;
      const d = ctx.getImageData(0, 0, c.width, c.height).data;
      let clear = 0;
      for (let i = 3; i < d.length; i += 64) if (d[i] === 0) clear++;
      if (clear / (d.length / 64) > 0.45) setDone(true);
    };
    const start = (e: PointerEvent) => { down = true; c.setPointerCapture(e.pointerId); scratch(e); };
    c.addEventListener("pointerdown", start);
    c.addEventListener("pointermove", scratch);
    c.addEventListener("pointerup", check);
    return () => {
      c.removeEventListener("pointerdown", start);
      c.removeEventListener("pointermove", scratch);
      c.removeEventListener("pointerup", check);
    };
  }, []);
  return (
    <div className="framed-card mx-auto max-w-sm p-8 text-center">
      <Corners />
      <div className="relative mx-auto aspect-[3/2] w-full overflow-hidden rounded-sm">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-paper-light">
          <p className="label-caps text-tint">Save the date</p>
          <p className="mt-2 font-display text-5xl text-ink">14 · 02 · 27</p>
          <p className="label-caps mt-2 text-muted">Six in the evening</p>
        </div>
        <canvas
          ref={canvas}
          aria-label="Scratch to reveal the date"
          className={`absolute inset-0 h-full w-full touch-none cursor-pointer transition-opacity duration-700 ${done ? "pointer-events-none opacity-0" : ""}`}
        />
      </div>
      <p className="label-caps mt-5 text-muted">{done ? "We can't wait to see you" : "Scratch the gold with your finger"}</p>
    </div>
  );
}

function Rsvp() {
  const [sent, setSent] = useState(false);
  const field = "w-full border-b border-border bg-transparent py-3 font-display text-xl outline-none placeholder:text-muted/60 focus:border-highlight";
  return (
    <div className="framed-card mx-auto max-w-lg p-8 sm:p-12">
      <Corners />
      {sent ? (
        <div className="py-10 text-center">
          <p className="font-display text-3xl text-accent">Thank you</p>
          <p className="mt-3 text-sm text-muted">Your reply has been received with joy.</p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-6">
          <input required placeholder="Your full name" className={field} />
          <select className={field} defaultValue="Joyfully accepts">
            <option>Joyfully accepts</option>
            <option>Regretfully declines</option>
          </select>
          <input type="number" min={1} max={6} defaultValue={2} aria-label="Number of guests" className={field} />
          <textarea rows={2} placeholder="A note for the couple" className={field} />
          <button className="label-caps w-full bg-accent py-4 text-surface transition-colors hover:bg-ink">Send reply</button>
        </form>
      )}
    </div>
  );
}

function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
