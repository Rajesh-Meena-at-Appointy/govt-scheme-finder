import { getAllSchemes, getCategoriesIndex } from "@/lib/schemes";
import { formatSlugLabel } from "@/lib/eligibility";
import Link from "next/link";

export const config = { amp: true };

export async function generateStaticParams() {
  return getCategoriesIndex().map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const label = formatSlugLabel(category);
  return {
    title: `${label} Government Schemes - Govt Scheme Finder`,
    description: `Find ${label} government schemes in India. Check eligibility and apply online.`,
  };
}

const categoryInfo: Record<string, { desc: string }> = {
  student: { desc: 'Student government schemes provide financial assistance for education including scholarships and grants.' },
  farmer: { desc: 'Farmer welfare schemes provide income support, subsidies, and insurance to agricultural workers.' },
  health: { desc: 'Health schemes provide medical coverage, insurance, and healthcare benefits to citizens.' },
  women: { desc: 'Women welfare schemes provide financial assistance and welfare programs for women.' },
  senior: { desc: 'Senior citizen schemes provide pension, healthcare, and welfare for elderly citizens.' },
  jobs: { desc: 'Employment schemes provide job opportunities, skill training, and self-employment support.' },
};

export default async function AmpCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const label = formatSlugLabel(category);
  const schemes = getAllSchemes().filter((s) => s.category === category);
  const info = categoryInfo[category] || { desc: `Explore government ${label} schemes.` };

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
          <p>{info.desc}</p>
          <p className="stats">{schemes.length} schemes available</p>
        </section>

        <section className="section">
          <h2>How to Apply</h2>
          <ol className="steps">
            <li>Visit the official government portal</li>
            <li>Register with your Aadhaar number</li>
            <li>Fill in the required details</li>
            <li>Upload necessary documents</li>
            <li>Submit and note application ID</li>
          </ol>
        </section>

        <section className="section">
          <h2>Required Documents</h2>
          <ul className="docs">
            <li>Aadhaar Card</li>
            <li>Bank Account</li>
            <li>Income Certificate</li>
            <li>Passport Size Photo</li>
          </ul>
        </section>

        <section className="section">
          <h2>All {label} Schemes</h2>
          <div className="list">
            {schemes.map((scheme) => (
              <a key={scheme.id} href={`/amp/scheme/${scheme.slug}`} className="list-item">
                <h3>{scheme.name}</h3>
                <p>{scheme.summary}</p>
                <div className="meta">
                  <span className="tag">{scheme.category}</span>
                  <span className="benefit">{scheme.benefits[0]}</span>
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
        .stats { margin-top: 12px; font-weight: 600; color: #2563eb; }
        .section { margin-bottom: 24px; }
        .section h2 { font-size: 18px; margin-bottom: 12px; color: #1e293b; }
        .steps { padding-left: 20px; }
        .steps li { margin-bottom: 8px; color: #475569; }
        .docs { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; }
        .docs li { padding: 8px 16px; background: #eff6ff; color: #2563eb; border-radius: 6px; font-size: 14px; }
        .list { display: flex; flex-direction: column; gap: 12px; }
        .list-item { display: block; padding: 16px; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; text-decoration: none; }
        .list-item h3 { font-size: 16px; color: #1e293b; margin-bottom: 4px; }
        .list-item p { font-size: 14px; color: #64748b; margin-bottom: 8px; }
        .meta { display: flex; gap: 8px; flex-wrap: wrap; }
        .tag { padding: 4px 8px; background: #eff6ff; color: #2563eb; font-size: 12px; border-radius: 4px; }
        .benefit { padding: 4px 8px; background: #f0fdf4; color: #16a34a; font-size: 12px; border-radius: 4px; }
        .footer { text-align: center; padding: 24px; color: #94a3b8; font-size: 14px; }
      `} />
    </>
  );
}
