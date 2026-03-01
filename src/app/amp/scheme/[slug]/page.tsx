import { getSchemeBySlug, getAllSchemes } from "@/lib/schemes";
import { notFound } from "next/navigation";

export const config = { amp: true };

export async function generateStaticParams() {
  const schemes = getAllSchemes();
  return schemes.map((scheme) => ({ slug: scheme.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scheme = getSchemeBySlug(slug);
  if (!scheme) return { title: 'Scheme Not Found' };
  return {
    title: `${scheme.name} - Eligibility, Documents & How to Apply`,
    description: scheme.summary,
  };
}

export default async function AmpSchemePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scheme = getSchemeBySlug(slug);
  if (!scheme) return notFound();

  return (
    <>
      <header className="header">
        <div className="container">
          <a href="/" className="logo">Govt Scheme Finder</a>
        </div>
      </header>

      <main className="main">
        <nav className="breadcrumb">
          <a href="/">Home</a> / <a href={`/amp/category/${scheme.category}`}>{scheme.category}</a> / <span>{scheme.name}</span>
        </nav>

        <article>
          <header className="hero">
            <span className="badge">{scheme.category}</span>
            <h1>{scheme.name}</h1>
            <p>{scheme.summary}</p>
            <a href={scheme.applyLink} className="btn">Apply Now →</a>
          </header>

          <section className="section">
            <h2>Benefits</h2>
            <ul className="benefits">
              {scheme.benefits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
          </section>

          <section className="section">
            <h2>Eligibility Criteria</h2>
            <div className="grid">
              <div className="grid-item">
                <span className="label">Minimum Age</span>
                <span className="value">{scheme.rules.minAge || 18} years</span>
              </div>
              <div className="grid-item">
                <span className="label">Income Limit</span>
                <span className="value">{scheme.rules.incomeMax ? `₹${scheme.rules.incomeMax.toLocaleString()}` : 'Not specified'}</span>
              </div>
              <div className="grid-item">
                <span className="label">Gender</span>
                <span className="value capitalize">{scheme.rules.gender === 'any' ? 'All' : scheme.rules.gender}</span>
              </div>
              <div className="grid-item">
                <span className="label">Coverage</span>
                <span className="value">{scheme.states.includes('all') ? 'All India' : scheme.states.length + ' States'}</span>
              </div>
            </div>
          </section>

          <section className="section">
            <h2>Required Documents</h2>
            <ul className="docs">
              {scheme.documents.map((doc, i) => (
                <li key={i}>{doc}</li>
              ))}
            </ul>
          </section>

          <section className="section">
            <h2>How to Apply</h2>
            <ol className="steps">
              <li>Visit the official website: <a href={scheme.applyLink}>{scheme.applyLink}</a></li>
              <li>Register with your mobile number and Aadhaar</li>
              <li>Fill in required details and upload documents</li>
              <li>Submit the application and note the application ID</li>
              <li>Track status online</li>
            </ol>
          </section>

          <section className="section">
            <h2>Quick Info</h2>
            <div className="info">
              <p><strong>Category:</strong> <span className="capitalize">{scheme.category}</span></p>
              <p><strong>Documents:</strong> {scheme.documents.length}+ required</p>
              <p><strong>Apply Mode:</strong> Online</p>
              <p><strong>Coverage:</strong> {scheme.states.includes('all') ? 'All India' : scheme.states.join(', ')}</p>
            </div>
          </section>
        </article>

        <aside className="cta">
          <a href={scheme.applyLink} className="btn-full">Apply for {scheme.name} →</a>
        </aside>
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
        .main { max-width: 700px; margin: 0 auto; padding: 24px 16px; }
        .breadcrumb { font-size: 14px; color: #64748b; margin-bottom: 16px; }
        .breadcrumb a { color: #2563eb; text-decoration: none; }
        .hero { padding: 24px; background: #f8fafc; border-radius: 12px; margin-bottom: 24px; }
        .badge { display: inline-block; padding: 4px 12px; background: #2563eb; color: #fff; font-size: 12px; border-radius: 4px; text-transform: capitalize; }
        .hero h1 { font-size: 24px; margin: 12px 0 8px; }
        .hero p { color: #64748b; margin-bottom: 16px; }
        .btn { display: inline-block; padding: 12px 24px; background: #2563eb; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; }
        .section { margin-bottom: 24px; }
        .section h2 { font-size: 18px; margin-bottom: 12px; color: #1e293b; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
        .benefits, .docs { list-style: none; }
        .benefits li, .docs li { padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
        .benefits li:before { content: "✓ "; color: #16a34a; }
        .docs li:before { content: "• "; color: #2563eb; }
        .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .grid-item { padding: 12px; background: #f8fafc; border-radius: 8px; }
        .grid-item .label { display: block; font-size: 12px; color: #64748b; }
        .grid-item .value { font-weight: 600; }
        .steps { padding-left: 20px; }
        .steps li { margin-bottom: 12px; color: #475569; }
        .steps a { color: #2563eb; }
        .info p { padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
        .capitalize { text-transform: capitalize; }
        .cta { margin-top: 24px; }
        .btn-full { display: block; padding: 16px; background: #2563eb; color: #fff; text-align: center; text-decoration: none; border-radius: 8px; font-weight: 600; }
        .footer { text-align: center; padding: 24px; color: #94a3b8; font-size: 14px; margin-top: 32px; }
      `} />
    </>
  );
}
