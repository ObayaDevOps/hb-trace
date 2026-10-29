import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "./landing.css";

export const metadata = {
  title: "HB-TRACE | Honey batch verification",
  description: "Check an approved Humble Beeing Honey batch or lot record.",
};

export default function HomePage() {
  return (
    <main className="landing-page">
      <header className="landing-header">
        <Link className="landing-brand" href="/" aria-label="HB-TRACE home">
          <span className="landing-mark" aria-hidden="true">HB</span>
          <span><strong>Humble Beeing</strong><small>HB-TRACE</small></span>
        </Link>
        <nav aria-label="Main navigation" className="landing-nav">
          <Link href="/verify">Verify a batch</Link>
          <Link href="/staff">Staff workspace</Link>
        </nav>
      </header>

      <section className="landing-hero" aria-labelledby="landing-title">
        <div className="landing-hero-copy">
          <p className="landing-eyebrow">Honey and beeswax traceability</p>
          <h1 id="landing-title">A clear record behind every batch.</h1>
          <p className="landing-lede">HB-TRACE connects sourcing, production, quality review and packaging records so staff can act on what needs attention and customers can check an approved batch story.</p>
          <div className="landing-actions">
            <Link className={buttonVariants({ size: "lg", className: "landing-primary" })} href="/verify">Check a batch <ArrowRight aria-hidden="true" data-icon="inline-end" /></Link>
            <Link className={buttonVariants({ variant: "outline", size: "lg", className: "landing-secondary" })} href="/staff">Open staff workspace <ArrowUpRight aria-hidden="true" data-icon="inline-end" /></Link>
          </div>
        </div>

        <section aria-labelledby="landing-lookup-title">
          <Card className="landing-lookup">
            <CardHeader>
              <p className="landing-card-kicker">Public lookup</p>
              <CardTitle><h2 id="landing-lookup-title">Have a batch or lot code?</h2></CardTitle>
              <CardDescription>Use the code printed on the product label to open its approved, privacy-safe publication.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action="/verify" method="get">
                <Label htmlFor="landing-code">Batch or lot code</Label>
                <div className="landing-input-row">
                  <Input id="landing-code" name="code" placeholder="e.g. HB-26-0042" autoComplete="off" />
                  <Button type="submit" size="lg">View record <ArrowRight aria-hidden="true" data-icon="inline-end" /></Button>
                </div>
              </form>
              <p className="landing-hint">Demo code: <Link href="/verify?code=HB-26-0042">HB-26-0042</Link></p>
            </CardContent>
          </Card>
        </section>
      </section>

      <section className="landing-principles" aria-label="HB-TRACE principles">
        <article><span>01</span><h2>Source to batch</h2><p>Direct records preserve the relationships and quantities that make a trace meaningful.</p></article>
        <article><span>02</span><h2>Review before release</h2><p>Quality decisions, evidence and public publication stay separate and auditable.</p></article>
        <article><span>03</span><h2>Useful offline</h2><p>Approved collection commands can be saved on a device and acknowledged after reconnect.</p></article>
      </section>

      <footer className="landing-footer"><span>© Humble Beeing Honey</span><span>Batch/lot codes · privacy-safe public records</span></footer>
    </main>
  );
}
