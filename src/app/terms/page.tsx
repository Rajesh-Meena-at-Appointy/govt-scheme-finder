'use client';

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Terms of Service</h1>

      <div className="prose prose-slate max-w-none space-y-6">
        <p className="text-slate-600">Last updated: February 2026</p>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Acceptance of Terms</h2>
          <p className="text-slate-600">
            By accessing and using Govt Scheme Finder ("the Website"), you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Description of Service</h2>
          <p className="text-slate-600">
            Govt Scheme Finder is a free online platform that helps Indian citizens discover government welfare schemes, scholarships, and benefits they may be eligible for. We provide information about government programs but do not guarantee eligibility or application success.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">3. User Responsibilities</h2>
          <p className="text-slate-600 mb-3">You agree to:</p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>Provide accurate and complete information</li>
            <li>Use the website for lawful purposes only</li>
            <li>Not attempt to gain unauthorized access to any part of the website</li>
            <li>Not interfere with the proper working of the website</li>
            <li>Verify all information with official government sources before applying</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Information Accuracy</h2>
          <p className="text-slate-600">
            While we strive to provide accurate and up-to-date information about government schemes, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or availability of the information. Users must verify all details with official government portals before taking any action.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">5. External Links</h2>
          <p className="text-slate-600">
            Our website may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Intellectual Property</h2>
          <p className="text-slate-600">
            The content, design, and graphics on this website are protected by copyright and other intellectual property rights. You may not copy, reproduce, or distribute any content without our written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">7. User Submissions</h2>
          <p className="text-slate-600">
            When you submit scheme information to our website, you grant us the right to use, modify, and display such content. You represent that you have all necessary rights to submit such content.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">8. Limitation of Liability</h2>
          <p className="text-slate-600">
            Govt Scheme Finder shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the website. We are not responsible for any decisions made based on the information provided on this website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">9. Disclaimer</h2>
          <p className="text-slate-600">
            This website is for informational purposes only. We do not represent any government agency. Always verify eligibility criteria, application deadlines, and other details on the official government portals before applying for any scheme.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">10. Termination</h2>
          <p className="text-slate-600">
            We reserve the right to terminate or suspend access to our website without prior notice for any violation of these terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">11. Governing Law</h2>
          <p className="text-slate-600">
            These terms shall be governed by and construed in accordance with the laws of India.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">12. Changes to Terms</h2>
          <p className="text-slate-600">
            We reserve the right to modify these terms at any time. Your continued use of the website after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">13. Contact Information</h2>
          <p className="text-slate-600">
            For questions about these Terms of Service, please contact us through our contact page.
          </p>
        </section>
      </div>
    </main>
  );
}
