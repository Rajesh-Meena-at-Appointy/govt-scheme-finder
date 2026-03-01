import { getAllSchemes, getStatesIndex } from "@/lib/schemes";
import { formatSlugLabel } from "@/lib/eligibility";

export const config = { amp: true };

export async function generateStaticParams() {
  return getStatesIndex().map((state) => ({ state }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const label = formatSlugLabel(state);
  return {
    title: `${label} Government Schemes - Govt Scheme Finder`,
    description: `Find government schemes available in ${label}. Check eligibility and apply online.`,
  };
}

const stateInfo: Record<string, { capital: string }> = {
  'rajasthan': { capital: 'Jaipur' },
  'uttar-pradesh': { capital: 'Lucknow' },
  'maharashtra': { capital: 'Mumbai' },
  'madhya-pradesh': { capital: 'Bhopal' },
  'karnataka': { capital: 'Bengaluru' },
  'tamil-nadu': { capital: 'Chennai' },
  'gujarat': { capital: 'Gandhinagar' },
  'west-bengal': { capital: 'Kolkata' },
  'delhi': { capital: 'New Delhi' },
  'punjab': { capital: 'Chandigarh' },
};

export default async function AmpStatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const label = formatSlugLabel(state);
  const schemes = getAllSchemes().filter((s) => s.states.includes("all") || s.states.includes(state));
  const info = stateInfo[state] || { capital: '' };

  return (
    <>
      <header className="header">
        <div className="container">
          <a href="/" className="logo">Govt Scheme Finder</a>
        </div>
      </header>

      <main className="main">
        <nav className="breadcrumb">
          <a href="/">Home</a> / <span>{label} Schemes</span>
        </nav>

        <section className="hero">
          <h1>{label} Government Schemes</h1>
          <p>Find government schemes available in {label}. Check eligibility and apply online.</p>
          {info.capital && <p className="capital">Capital: {info.capital}</p>}
          <p className="stats">{schemes.length} schemes available</p>
        </section>

        <section className="section">
          <h2>Browse by Category</h2>
          <div className="tags">
            {['student', 'farmer', 'health', 'women', 'senior', 'jobs'].map((cat) => (
              <a key={cat} href={`/amp/category/${cat}`} className="tag">{cat}</a>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>All Schemes in {label}</h2>
          <div className="list">
            {schemes.map((scheme) => (
              <a key={scheme.id} href={`/amp/scheme/${scheme.slug}`} className="list-item">
                <h3>{scheme.name}</h3>
                <p>{scheme.summary}</p>
                <div className="meta">
                  <span className="cat">{scheme.category}</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 Govt Scheme Finder</p>
      </footer>

      <style amp-custom={`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 16px; }
        .header { background: #fff; border-bottom: 1px solid #e5e7eb; padding: 16px 0; }
        .logo { font-size: 20px; font-weight: 700; color: #2563eb; text-decoration: none; }
        .main { max-width: 800px; margin: 0 auto; padding: 24px 16px; }
        .breadcrumb { font-size: 14px; color: #64748b; margin-bottom: 16px; }
        .breadcrumb a { color: #2563eb; text-decoration: none; }
        .hero { padding: 24px; background: #f8fafc; border-radius: 12px; margin-bottom: 24px; }
        .hero h1 { font-size: 24px; margin-bottom: 8px; text-transform: capitalize; }
        .hero p { color: #64748b; }
        .capital { margin-top: 8px; font-weight: 600; }
        .stats { margin-top: 12px; font-weight: 600; color: #2563eb; }
        .section { margin-bottom: 24px; }
        .section h2 { font-size: 18px; margin-bottom: 12px; }
        .tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .tag { padding: 8px 16px; background: #eff6ff; color: #2563eb; text-decoration: none; border-radius: 6px; font-size: 14px; text-transform: capitalize; }
        .list { display: flex; flex-direction: column; gap: 12px; }
        .list-item { display: block; padding: 16px; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; text-decoration: none; }
        .list-item h3 { font-size: 16px; color: #1e293b; margin-bottom: 4px; }
        .list-item p { font-size: 14px; color: #64748b; margin-bottom: 8px; }
        .cat { display: inline-block; padding: 4px 8px; background: #eff6ff; color: #2563eb; font-size: 12px; border-radius: 4px; text-transform: capitalize; }
        .footer { text-align: center; padding: 24px; color: #94a3b8; font-size: 14px; }
      `} />
    </>
  );
}
