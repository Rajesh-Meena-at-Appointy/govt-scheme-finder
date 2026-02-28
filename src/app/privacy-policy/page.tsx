'use client';

import { useI18n } from "@/lib/i18n";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  const { t } = useI18n();

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>

      <div className="prose prose-slate max-w-none space-y-6">
        <p className="text-slate-600">Last updated: February 2026</p>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Introduction</h2>
          <p className="text-slate-600">
            Govt Scheme Finder ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Information We Collect</h2>
          <p className="text-slate-600 mb-3">We may collect the following types of information:</p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li><strong>Personal Information:</strong> Name, email address, and phone number when you submit a scheme or contact us</li>
            <li><strong>Usage Data:</strong> Pages visited, time spent on pages, and other analytics</li>
            <li><strong>Device Information:</strong> Browser type, IP address, and device identifiers</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">3. How We Use Your Information</h2>
          <p className="text-slate-600 mb-3">We use the information we collect to:</p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>Provide and improve our services</li>
            <li>Respond to your inquiries and requests</li>
            <li>Send you relevant updates about government schemes</li>
            <li>Analyze website usage and optimize user experience</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Information Sharing</h2>
          <p className="text-slate-600">
            We do not sell, trade, or otherwise transfer your personal information to outside parties. We may share information with:
          </p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-2">
            <li>Service providers who assist in our operations</li>
            <li>Government agencies as required by law</li>
            <li>Analytics partners for website improvement</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Cookies and Tracking Technologies</h2>
          <p className="text-slate-600">
            We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Third-Party Services</h2>
          <p className="text-slate-600">
            Our website may contain links to third-party websites, services, or applications that are not operated by us. We are not responsible for the privacy practices of these third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Data Security</h2>
          <p className="text-slate-600">
            We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">8. Your Rights</h2>
          <p className="text-slate-600 mb-3">You have the right to:</p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your personal information</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">9. Children's Privacy</h2>
          <p className="text-slate-600">
            Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">10. Changes to This Policy</h2>
          <p className="text-slate-600">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">11. Contact Us</h2>
          <p className="text-slate-600">
            If you have any questions about this Privacy Policy, please contact us at the contact page.
          </p>
        </section>
      </div>
    </main>
  );
}
