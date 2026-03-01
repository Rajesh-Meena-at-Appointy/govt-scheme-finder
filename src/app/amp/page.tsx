import { getAllSchemes, getCategoriesIndex, getStatesIndex } from "@/lib/schemes";
import { formatSlugLabel } from "@/lib/eligibility";
import Link from "next/link";

export const config = { amp: true };

export const metadata = {
  title: "Govt Scheme Finder - Find Government Schemes You Qualify For",
  description: "Discover eligible government welfare programs, scholarships, and benefits in India. Free to apply through official government portals.",
};

export default function AmpHome() {
  const schemes = getAllSchemes();
  const states = getStatesIndex();
  const categories = getCategoriesIndex();

  return (
    <>
      <header className="header">
        <div className="container">
          <a href="/" className="logo">Govt Scheme Finder</a>
        </div>
      </header>

      <main className="main">
        <section className="hero">
          <h1>Find Government Schemes You Qualify For</h1>
          <p>Discover eligible government welfare programs, scholarships, and benefits in India.</p>
          <p className="stats">{schemes.length} Schemes • {states.length} States</p>
        </section>

        <section className="section">
          <h2>Browse by Category</h2>
          <div className="grid">
            {categories.map((cat) => (
              <a key={cat} href={`/amp/category/${cat}`} className="card">
                <h3>{formatSlugLabel(cat)}</h3>
                <span className="link">View schemes →</span>
              </a>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Browse by State</h2>
          <div className="grid">
            {states.slice(0, 12).map((state) => (
              <a key={state} href={`/amp/state/${state}`} className="card">
                <h3>{formatSlugLabel(state)}</h3>
                <span className="link">View schemes →</span>
              </a>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Popular Schemes</h2>
          <div className="list">
            {schemes.slice(0, 5).map((scheme) => (
              <a key={scheme.id} href={`/amp/scheme/${scheme.slug}`} className="list-item">
                <h3>{scheme.name}</h3>
                <p>{scheme.summary}</p>
                <span className="tag">{scheme.category}</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 Govt Scheme Finder - For informational purposes only.</p>
      </footer>

      <style amp-custom={`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 16px; }
        .header { background: #fff; border-bottom: 1px solid #e5e7eb; padding: 16px 0; }
        .logo { font-size: 20px; font-weight: 700; color: #2563eb; text-decoration: none; }
        .main { max-width: 800px; margin: 0 auto; padding: 24px 16px; }
        .hero { text-align: center; padding: 32px 0; background: linear-gradient(135deg, #eff6ff, #f5f3ff); border-radius: 12px; margin-bottom: 32px; }
        .hero h1 { font-size: 24px; margin-bottom: 8px; color: #1e293b; }
        .hero p { color: #64748b; }
        .stats { margin-top: 16px; font-weight: 600; color: #2563eb; }
        .section { margin-bottom: 32px; }
        .section h2 { font-size: 20px; margin-bottom: 16px; color: #1e293b; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
        .card { display: block; padding: 16px; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; text-decoration: none; transition: all 0.2s; }
        .card:hover { border-color: #2563eb; transform: translateY(-2px); }
        .card h3 { font-size: 14px; color: #1e293b; text-transform: capitalize; }
        .link { font-size: 12px; color: #2563eb; }
        .list { display: flex; flex-direction: column; gap: 12px; }
        .list-item { display: block; padding: 16px; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; text-decoration: none; }
        .list-item h3 { font-size: 16px; color: #1e293b; margin-bottom: 4px; }
        .list-item p { font-size: 14px; color: #64748b; margin-bottom: 8px; }
        .tag { display: inline-block; padding: 4px 8px; background: #eff6ff; color: #2563eb; font-size: 12px; border-radius: 4px; text-transform: capitalize; }
        .footer { text-align: center; padding: 24px; color: #94a3b8; font-size: 14px; border-top: 1px solid #e5e7eb; margin-top: 32px; }
      `} />
    </>
  );
}
