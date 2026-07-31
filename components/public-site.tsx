"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { artImages, categories, competitions, downloads, gallery, news } from "@/lib/public-data";
import { cn } from "@/lib/utils";
import { Icon } from "./icons";

type PublicPage = "competitions" | "gallery" | "downloads" | "contact" | "verify-certificate" | "track-registration" | "news" | "about" | "terms" | "privacy";

const nav = [
  ["Home", "/"],
  ["Competitions", "/competitions"],
  ["Gallery", "/gallery"],
  ["Winners", "/gallery"],
  ["News", "/news"],
  ["Resources", "/downloads"],
  ["Contact", "/contact"],
];

export function HomePage() {
  return (
    <Shell homeOnly>
      <section className="home-hero">
        <img className="hero-art" src={artImages.hero} alt="" aria-hidden="true" />
        <div className="hero-copy">
          <h1>International<br />Art Championship 2026</h1>
          <p>Showcase your talent on a global platform</p>
          <Link href="/register" className="btn-primary">Register Now</Link>
        </div>
        <Countdown compact />
      </section>
      <section className="home-stats">
        {[
          ["25+", "Competitions", "award"],
          ["18,560", "Participants", "users"],
          ["65", "Countries", "globe"],
          ["$250,000+", "Prize Pool", "dollar"],
        ].map(([value, label, icon]) => (
          <div key={label}>
            <Icon name={icon} />
            <b>{value}</b>
            <span>{label}</span>
          </div>
        ))}
      </section>
      <section className="home-competitions" id="competitions">
        <CompetitionListing />
      </section>
    </Shell>
  );
}

export function PublicPageView({ page }: { page: PublicPage }) {
  return (
    <Shell pageNo={pageLabels[page].no}>
      {page === "competitions" && <CompetitionListing />}
      {page === "gallery" && <GalleryPage />}
      {page === "downloads" && <DownloadsPage />}
      {page === "contact" && <ContactPage />}
      {page === "verify-certificate" && <VerifyCertificate />}
      {page === "track-registration" && <TrackStatus />}
      {page === "news" && <NewsListing />}
      {page === "about" && <AboutPage />}
      {page === "terms" && <TermsPage />}
      {page === "privacy" && <PrivacyPage />}
    </Shell>
  );
}

export function CompetitionDetails({ slug }: { slug: string }) {
  const competition = competitions.find((item) => item.slug === slug) || competitions[0];
  return (
    <Shell pageNo="03. Competition Details">
      <PageTitle title="International Art Championship 2026" crumb="Home > Competition Details/international-art-championship-2026" small="Featured" />
      <section className="detail-layout">
        <main className="detail-main">
          <img className="detail-image" src={artImages.city} alt={competition.title} />
          <h2>International Art Championship 2026</h2>
          <p className="muted">Join artists from around the world in our premier annual art competition. Showcase your creativity, gain international recognition, and win exciting prizes.</p>
          <div className="tabs">
            {["Overview", "Categories", "Prizes", "Important Dates", "Rules", "Contact"].map((tab, index) => <button className={index === 0 ? "active" : ""} key={tab}>{tab}</button>)}
          </div>
          <p className="body-text">The International Art Championship 2026 invites artists from around the world to demonstrate their creativity and technical skill through original artwork.</p>
          <ul className="check-list">
            <li>Open to all artists worldwide</li>
            <li>Multiple categories and age groups</li>
            <li>Online exhibition for selected works</li>
            <li>Exciting cash prizes and certificates</li>
          </ul>
        </main>
        <aside className="register-card">
          <h3>Registration Ends</h3>
          <Countdown />
          <div className="fee-row"><span>Entry Fee</span><b>$25</b></div>
          <button className="btn-primary full">Register Now</button>
          <button className="btn-outline full">Download Brochure</button>
          {[
            ["Start Date", "Apr 20, 2026"],
            ["Last Date", "May 30, 2026"],
            ["Result Date", "Jun 10, 2026"],
            ["Exhibition", "Jul 01, 2026"],
            ["Venue", "Online Exhibition"],
          ].map(([label, value]) => <div className="side-line" key={label}><span>{label}</span><b>{value}</b></div>)}
        </aside>
      </section>
    </Shell>
  );
}

export function BlogDetails({ slug }: { slug: string }) {
  const post = news.find((item) => item.slug === slug) || news[0];
  return (
    <Shell pageNo="12. News & Blog - Detail">
      <PageTitle title="International Art Championship 2026 Announced" crumb="Home > News & Articles" small="News" />
      <section className="article-layout">
        <article className="article-card">
          <h2>{post.title}</h2>
          <div className="meta">Apr 20, 2026 &nbsp;&nbsp; By Admin &nbsp;&nbsp; News</div>
          <img src={artImages.brushes} alt={post.title} />
          <p>We are thrilled to announce the International Art Championship 2026, a global platform for artists to showcase their creativity and talent.</p>
          <p>Our annual competition celebrates visual art across traditional and digital mediums. Participants from across the globe are invited to submit their finest original works.</p>
          <div className="share-row">Share <span>f</span><span>x</span><span>in</span><span>p</span></div>
        </article>
        <BlogSidebar />
      </section>
    </Shell>
  );
}

export function AuthPage({ mode }: { mode: "login" | "register" }) {
  return (
    <AuthShell pageNo={mode === "register" ? "04. Register" : "05. Login"}>
      <section className="auth-card-shot">
        <div className="auth-art-shot"><img src={artImages.brushes} alt="Paint brushes" /></div>
        <AuthForm mode={mode} />
      </section>
    </AuthShell>
  );
}

export function NotFoundPublic() {
  return (
    <Shell pageNo="404 Page">
      <section className="empty-state">
        <b>404</b>
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link className="btn-primary" href="/">Back to Home</Link>
      </section>
    </Shell>
  );
}

function Shell({ children, pageNo, homeOnly = false }: { children: React.ReactNode; pageNo?: string; homeOnly?: boolean }) {
  return (
    <div className={cn("shot-shell", homeOnly && "home-only")}>
      <Header />
      <main className="shot-main">{children}</main>
      {pageNo && <div className="shot-caption">{pageNo}</div>}
    </div>
  );
}

function AuthShell({ children, pageNo }: { children: React.ReactNode; pageNo: string }) {
  return (
    <div className="shot-shell auth-shot-shell">
      <Header />
      <main className="shot-main">{children}</main>
      <div className="shot-caption">{pageNo}</div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="shot-header">
      <Link href="/" className="logo"><span></span>ArtCompete</Link>
      <nav className={cn("shot-nav", open && "open")}>{nav.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}</nav>
      <div className="header-actions">
        <Link className="login-btn" href="/login">Login</Link>
        <Link className="register-btn" href="/register">Register</Link>
        <button className="menu-button" aria-label="Menu" onClick={() => setOpen(!open)}><Icon name={open ? "x" : "menu"} /></button>
      </div>
    </header>
  );
}

function PageTitle({ title, crumb, small }: { title: string; crumb: string; small?: string }) {
  return (
    <div className="page-title">
      {small && <span>{small}</span>}
      <h1>{title}</h1>
      <p>{crumb}</p>
    </div>
  );
}

function Countdown({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("shot-countdown", compact && "hero-countdown")}>
      {["15", "08", "42", "36"].map((value, index) => <div key={index}><b>{value}</b><span>{["Days", "Hours", "Minutes", "Seconds"][index]}</span></div>)}
    </div>
  );
}

function CompetitionListing() {
  return (
    <>
      <PageTitle title="Competitions" crumb="Home > Competitions" />
      <div className="filters">
        <input placeholder="Search competition..." />
        <select><option>All Categories</option></select>
        <select><option>All Status</option></select>
        <select><option>All Countries</option></select>
      </div>
      <div className="competition-list-grid">
        {competitions.map((item) => <CompetitionCard item={item} key={item.slug} />)}
      </div>
    </>
  );
}

function CompetitionCard({ item }: { item: (typeof competitions)[number] }) {
  return (
    <article className="shot-comp-card">
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>{item.category}</p>
        <small><Icon name="pin" /> {item.date}</small>
        <b>{item.entryFee}</b>
        <div className="comp-actions">
          <Link href={`/competitions/${item.slug}`} className="btn-ghost" aria-label={`${item.title} details`}><Icon name="card" /></Link>
          <Link href="/register" className="btn-primary mini">{item.button}</Link>
        </div>
      </div>
    </article>
  );
}

function GalleryPage() {
  return (
    <>
      <PageTitle title="Gallery" crumb="Home > Gallery" />
      <div className="gallery-tabs">{["Premium Exhibition", "Current Exhibition", "Award Winning"].map((tab, index) => <button className={index === 0 ? "active" : ""} key={tab}>{tab}</button>)}</div>
      <section className="shot-gallery">{gallery.map(([image], index) => <img src={image} alt={`Gallery artwork ${index + 1}`} key={index} />)}</section>
    </>
  );
}

function DownloadsPage() {
  return (
    <>
      <PageTitle title="Downloads" crumb="Home > Downloads" />
      <section className="download-card">
        {downloads.map(([title, meta, tone]) => (
          <article key={title}>
            <span className={String(tone)}><Icon name="file" /></span>
            <div><b>{title}</b><p>{meta}</p></div>
            <button>Download</button>
          </article>
        ))}
      </section>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageTitle title="Contact Us" crumb="Home > Contact" />
      <section className="contact-shot">
        <aside>
          <h3>Get In Touch</h3>
          <p>We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.</p>
          <InfoLine icon="mail" title="Email" text="info@artcompete.com" />
          <InfoLine icon="phone" title="Phone" text="+1 234 567 8900" />
          <InfoLine icon="pin" title="Address" text="123 Art Street, Creative City, CA 90001, USA" />
          <div className="socials"><span>f</span><span>i</span><span>x</span><span>p</span><span>in</span></div>
        </aside>
        <form>
          <div className="two"><input placeholder="Your Name" /><input placeholder="Email Address" /></div>
          <input placeholder="Subject" />
          <textarea placeholder="Your Message" rows={5} />
          <button className="btn-primary full">Send Message</button>
        </form>
      </section>
      <img className="map-shot" src={artImages.map} alt="Map" />
    </>
  );
}

function VerifyCertificate() {
  return (
    <>
      <PageTitle title="Verify Certificate" crumb="Home > Verify Certificate" />
      <section className="verify-card">
        <div className="verify-icon"><Icon name="shield" /></div>
        <h3>Verify the authenticity of certificate</h3>
        <p>Enter certificate number to verify</p>
        <select><option>Certificate Number</option></select>
        <button className="btn-primary full">Verify</button>
        <div className="qr-sep">Or Scan QR Code</div>
        <div className="qr-box"><Icon name="grid" /><span>Click to scan</span></div>
      </section>
    </>
  );
}

function TrackStatus() {
  return (
    <>
      <PageTitle title="Track Your Status" crumb="Home > Track Status" />
      <p className="status-intro">Enter your details to check your registration and submission status.</p>
      <section className="status-card">
        <div className="status-tabs">{["By Registration Number", "By Email", "By Mobile Number"].map((tab, index) => <button className={index === 0 ? "active" : ""} key={tab}>{tab}</button>)}</div>
        <label>Registration Number</label>
        <div className="search-row"><input placeholder="Enter registration number" /><button className="btn-primary">Search</button></div>
        <div className="status-art"><Icon name="card" /></div>
      </section>
    </>
  );
}

function NewsListing() {
  return (
    <>
      <PageTitle title="News & Articles" crumb="Home > News & Articles" />
      <section className="news-layout">
        <main>
          <div className="news-filters"><input placeholder="Search news..." /><select><option>All Categories</option></select></div>
          {news.map((post) => <Link href={`/news/${post.slug}`} className="news-row" key={post.slug}><img src={post.image} alt={post.title} /><div><h3>{post.title}</h3><p>{post.date} · {post.category}</p></div></Link>)}
        </main>
        <BlogSidebar />
      </section>
    </>
  );
}

function BlogSidebar() {
  return (
    <aside className="blog-side">
      <div><h3>Categories</h3>{categories.map((cat) => <a key={cat}>{cat}</a>)}</div>
      <div><h3>Recent Posts</h3>{news.slice(0, 3).map((post) => <a className="recent" key={post.slug}><img src={post.image} alt="" /><span>{post.title}</span></a>)}</div>
    </aside>
  );
}

function AboutPage() {
  return (
    <>
      <PageTitle title="About Us" crumb="Home > About Us" />
      <section className="about-card">
        <div>
          <h3>Who We Are</h3>
          <p>ArtCompete is a global platform dedicated to promoting art and creativity. We host thematic global competitions and exhibitions that help artists showcase their work.</p>
          <InfoLine icon="award" title="Our Mission" text="Promote creativity and provide artists a platform where talent meets wider audiences." />
          <InfoLine icon="file" title="Our Vision" text="Make art competitions accessible to everyone from the future." />
          <InfoLine icon="shield" title="Our Values" text="Creativity, transparency and fair evaluation." />
        </div>
        <img src={artImages.easel} alt="Artist painting" />
      </section>
      <section className="mini-stats">{[["25+", "Competitions"], ["18K+", "Participants"], ["65+", "Countries"], ["10+", "Years Experience"]].map(([a, b]) => <div key={b}><b>{a}</b><span>{b}</span></div>)}</section>
    </>
  );
}

function TermsPage() {
  return <Policy title="Terms & Conditions" crumb="Home > Terms & Conditions" items={["Introduction", "Eligibility", "Submission", "Copyright"]} />;
}

function PrivacyPage() {
  return <Policy title="Privacy Policy" crumb="Home > Privacy Policy" items={["Information We Collect", "How We Use Information", "Data Protection", "Cookies"]} />;
}

function Policy({ title, crumb, items }: { title: string; crumb: string; items: string[] }) {
  return (
    <>
      <PageTitle title={title} crumb={crumb} />
      <section className="policy-shot">
        {items.map((item, index) => <article key={item}><h3>{index + 1}. {item}</h3><p>These terms describe the rules and responsibilities for participating in ArtCompete events and using the public competition platform.</p></article>)}
      </section>
    </>
  );
}

function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [loading, setLoading] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => setLoading(false), 700);
  }
  return (
    <form className="auth-form-shot" onSubmit={submit}>
      <h1>{mode === "register" ? "Create Your Account" : "Welcome Back!"}</h1>
      <p>{mode === "register" ? "" : "Login to your account"}</p>
      {mode === "register" && <Field label="Full Name" />}
      <Field label="Email Address" type="email" />
      {mode === "login" && <Field label="Password" type="password" />}
      {mode === "register" && <Field label="Mobile Number" />}
      {mode === "register" && <Field label="Password" type="password" />}
      {mode === "register" && <Field label="Confirm Password" type="password" />}
      <div className="auth-options">
        <label><input type="checkbox" /> {mode === "register" ? "I agree to the Terms & Conditions and Privacy Policy" : "Remember Me"}</label>
        {mode === "login" && <Link href="/contact">Forgot Password?</Link>}
      </div>
      <button className="btn-primary full" disabled={loading}>{loading ? "Please wait..." : mode === "register" ? "Register" : "Login"}</button>
      <div className="or-line"><span>Or register with</span></div>
      <div className="social-auth"><button>G</button><button>f</button><button>A</button></div>
      <p className="switch-auth">{mode === "register" ? "Already have an account?" : "Don't have an account?"} <Link href={mode === "register" ? "/login" : "/register"}>{mode === "register" ? "Login" : "Register"}</Link></p>
    </form>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return <label className="field-shot"><span>{label}</span><input required type={type} /></label>;
}

function InfoLine({ icon, title, text }: { icon: string; title: string; text: string }) {
  return <div className="info-line"><Icon name={icon} /><div><b>{title}</b><p>{text}</p></div></div>;
}

const pageLabels: Record<PublicPage, { no: string }> = {
  competitions: { no: "02. Competition Listing" },
  gallery: { no: "Gallery" },
  downloads: { no: "Downloads" },
  contact: { no: "Contact Us" },
  "verify-certificate": { no: "Verify Certificate" },
  "track-registration": { no: "15. CMS Page - Status" },
  news: { no: "11. News & Blog - Listing" },
  about: { no: "13. CMS Page - About Us" },
  terms: { no: "14. CMS Page - Terms & Conditions" },
  privacy: { no: "CMS Page - Privacy Policy" },
};
