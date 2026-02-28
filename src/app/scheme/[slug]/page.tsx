import { getSchemeBySlug, getAllSchemes } from "@/lib/schemes";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { notFound, Metadata } from "next/navigation";
import { CheckCircle, FileText, Users, Clock, ArrowRight, ExternalLink } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const scheme = getSchemeBySlug(slug);
  if (!scheme) return { title: 'Scheme Not Found' };

  return {
    title: `${scheme.name} - Eligibility, Documents & How to Apply | Govt Scheme Finder`,
    description: `Learn about ${scheme.name}. Check eligibility criteria, required documents, and how to apply online. Benefits include ${scheme.benefits.join(', ')}`,
    keywords: `${scheme.name}, ${scheme.category} scheme, government scheme, eligibility, documents, how to apply, India government schemes`,
    openGraph: {
      title: scheme.name,
      description: scheme.summary,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  const schemes = getAllSchemes();
  return schemes.map((scheme) => ({ slug: scheme.slug }));
}

// FAQ data for popular schemes
const schemeFAQs: Record<string, { question: string; answer: string }[]> = {
  'pm-kisan': [
    { question: 'PM-KISAN eligibility 2026?', answer: 'All farmer families with landholding up to 2 hectares are eligible. Families should have valid land records.' },
    { question: 'PM-KISAN documents required?', answer: 'Aadhaar card, land records, bank account details, and mobile number are required for registration.' },
    { question: 'PM-KISAN how to apply online?', answer: 'Visit pmkisan.gov.in, click "Farmer Corner", select "New Farmer Registration", fill the form with Aadhaar and bank details.' },
    { question: 'PM-KISAN payment status check?', answer: 'Check status at pmkisan.gov.in under "Beneficiary Status" using your Aadhaar or mobile number.' },
  ],
  'ayushman-bharat-pmjay': [
    { question: 'Ayushman card kaise banaye?', answer: 'Visit your nearest CSC or empanelled hospital with Aadhaar. They will verify eligibility and issue the card.' },
    { question: 'Ayushman Bharat eligibility?', answer: 'Families listed in SECC 2011 data are eligible. Check eligibility at mera.pmjay.gov.in' },
    { question: 'Ayushman card documents required?', answer: 'Aadhaar card, ration card, and any government ID proof are required.' },
    { question: 'Ayushman Bharat hospital list?', answer: 'Visit empanelled hospitals list on pmjay.gov.in or check at your nearest government hospital.' },
  ],
};

export default async function SchemePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scheme = getSchemeBySlug(slug);
  if (!scheme) return notFound();

  const FAQs = schemeFAQs[slug] || [
    { question: `How to apply for ${scheme.name}?`, answer: `Visit the official website and complete the application form with required documents.` },
    { question: `What is the eligibility for ${scheme.name}?`, answer: 'Eligibility varies. Check the official portal for detailed criteria based on your category, income, and state.' },
    { question: `What documents are needed for ${scheme.name}?`, answer: 'Typically requires Aadhaar card, income certificate, category certificate, and passport size photos.' },
  ];

  return (
    <main className="mx-auto max-w-4xl px-3 md:px-4 py-6 md:py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/category/${scheme.category}`} className="hover:text-blue-600 capitalize">{scheme.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{scheme.name}</span>
      </nav>

      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge className="bg-blue-600">{scheme.category}</Badge>
          {scheme.tags.map((t) => (
            <Badge key={t} variant="secondary" className="capitalize">
              {t.replace('-', ' ')}
            </Badge>
          ))}
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{scheme.name}</h1>
        <p className="mt-2 text-slate-600">{scheme.summary}</p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <a href={scheme.applyLink} target="_blank" rel="noreferrer">
              Apply Now <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/category/${scheme.category}`}>Similar Schemes</Link>
          </Button>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-slate-50 rounded-xl p-4 text-center">
          <Users className="h-5 w-5 mx-auto text-blue-600 mb-2" />
          <p className="text-xs text-slate-500">Category</p>
          <p className="font-semibold capitalize">{scheme.category}</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 text-center">
          <FileText className="h-5 w-5 mx-auto text-green-600 mb-2" />
          <p className="text-xs text-slate-500">Documents</p>
          <p className="font-semibold">{scheme.documents.length}+ Required</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 text-center">
          <Clock className="h-5 w-5 mx-auto text-purple-600 mb-2" />
          <p className="text-xs text-slate-500">Apply Mode</p>
          <p className="font-semibold">Online</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 text-center">
          <CheckCircle className="h-5 w-5 mx-auto text-orange-600 mb-2" />
          <p className="text-xs text-slate-500">Coverage</p>
          <p className="font-semibold">{scheme.states.includes('all') ? 'All India' : scheme.states.length + ' States'}</p>
        </div>
      </div>

      {/* Benefits */}
      <Card className="mb-4">
        <CardContent className="p-4 md:p-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Benefits
          </h2>
          <ul className="mt-3 space-y-2">
            {scheme.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-green-600 mt-0.5">✓</span>
                {b}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card className="mb-4">
        <CardContent className="p-4 md:p-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Required Documents
          </h2>
          <ul className="mt-3 space-y-2">
            {scheme.documents.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-blue-600 mt-0.5">•</span>
                {d}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Eligibility */}
      <Card className="mb-4">
        <CardContent className="p-4 md:p-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            Eligibility Criteria
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-slate-500">Minimum Age</p>
              <p className="font-semibold">{scheme.rules.minAge || '18'} years</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-slate-500">Income Limit</p>
              <p className="font-semibold">{scheme.rules.incomeMax ? `₹${scheme.rules.incomeMax.toLocaleString()}` : 'Not specified'}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-slate-500">Gender</p>
              <p className="font-semibold capitalize">{scheme.rules.gender === 'any' ? 'All' : scheme.rules.gender}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-slate-500">States</p>
              <p className="font-semibold">{scheme.states.includes('all') ? 'All India' : scheme.states.join(', ')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How to Apply */}
      <Card className="mb-4">
        <CardContent className="p-4 md:p-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-orange-600" />
            How to Apply
          </h2>
          <ol className="mt-3 space-y-3">
            <li className="flex gap-3 text-sm text-slate-700">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <span>Visit the official website: <a href={scheme.applyLink} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{scheme.applyLink.replace('https://', '')}</a></span>
            </li>
            <li className="flex gap-3 text-sm text-slate-700">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <span>Register with your mobile number and Aadhaar card</span>
            </li>
            <li className="flex gap-3 text-sm text-slate-700">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
              <span>Fill in the required details and upload documents</span>
            </li>
            <li className="flex gap-3 text-sm text-slate-700">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
              <span>Submit the application and note the application ID</span>
            </li>
            <li className="flex gap-3 text-sm text-slate-700">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
              <span>Track status online and download acknowledgement</span>
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-sm text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-sm text-slate-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800">
        <strong>Disclaimer:</strong> This information is for guidance only. Always verify eligibility criteria, documents, and deadlines on the official government portal before applying.
      </div>
    </main>
  );
}
