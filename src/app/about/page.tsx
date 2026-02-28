'use client';

import { useI18n } from "@/lib/i18n";
import Link from "next/link";
import { ArrowLeft, Target, Shield, Users, FileText, Heart, Sparkles, CheckCircle } from "lucide-react";

export default function About() {
  const { t } = useI18n();

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">About Govt Scheme Finder</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          India's most comprehensive platform for discovering government welfare schemes, scholarships, and benefits you're eligible for.
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Our Mission</h2>
          <p className="text-slate-600 mb-4">
            At Govt Scheme Finder, we believe that no eligible citizen should miss out on government welfare benefits. Our mission is to make government schemes accessible to every Indian citizen by providing accurate, up-to-date information in multiple languages.
          </p>
          <p className="text-slate-600">
            We bridge the gap between citizens and government programs, ensuring that welfare reaches those who need it most.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Personalized Matching</h3>
              </div>
              <p className="text-slate-600 text-sm">Our eligibility wizard helps you find schemes you qualify for based on your profile.</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Verified Information</h3>
              </div>
              <p className="text-slate-600 text-sm">All scheme information is sourced from official government portals and regularly updated.</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Free & Secure</h3>
              </div>
              <p className="text-slate-600 text-sm">Our service is completely free. We never ask for payment or store sensitive information.</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Multilingual Support</h3>
              </div>
              <p className="text-slate-600 text-sm">Access information in English, Hindi, and 10 other Indian languages.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Why Choose Us</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-slate-900">Comprehensive Coverage</h3>
                <p className="text-slate-600">We cover schemes from central government, state governments, and various government agencies.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-slate-900">Easy Application Links</h3>
                <p className="text-slate-600">Direct links to official application portals save your time and effort.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-slate-900">Community Driven</h3>
                <p className="text-slate-600">Users can submit new schemes, helping us keep our database comprehensive and up-to-date.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
              <Heart className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Transparency</h3>
              <p className="text-slate-600 text-sm">We provide honest, accurate information without any hidden agenda.</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Trust</h3>
              <p className="text-slate-600 text-sm">Building trust through accurate information and ethical practices.</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <Sparkles className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Innovation</h3>
              <p className="text-slate-600 text-sm">Continuously improving our platform to serve citizens better.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Important Disclaimer</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <p className="text-slate-700">
              <strong> Govt Scheme Finder is an independent platform</strong> and is not affiliated with any government department or agency. We provide information for educational purposes only. Always verify eligibility criteria, application deadlines, and required documents on the official government portals before applying for any scheme. We are not responsible for any decisions made based on the information provided on this website.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Join Our Mission</h2>
          <p className="text-slate-600 mb-4">
            Help us help more citizens! If you know about a government scheme that's not on our platform, please submit it. Together, we can ensure no eligible citizen misses out on government benefits.
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Submit a Scheme
          </Link>
        </section>
      </div>
    </main>
  );
}
