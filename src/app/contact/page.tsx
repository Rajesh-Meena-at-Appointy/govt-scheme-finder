'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API endpoint
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Have questions or suggestions? We'd love to hear from you. Get in touch with our team.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Get in Touch</h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Email</h3>
                <p className="text-slate-600">contact@govtschemefinder.com</p>
                <p className="text-sm text-slate-500">We respond within 24-48 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Location</h3>
                <p className="text-slate-600">India</p>
                <p className="text-sm text-slate-500">Serving citizens across all states</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Response Time</h3>
                <p className="text-slate-600">Monday - Friday</p>
                <p className="text-sm text-slate-500">9:00 AM - 6:00 PM IST</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
            <h3 className="font-semibold text-slate-900 mb-2">Quick Help</h3>
            <p className="text-slate-600 text-sm mb-4">
              For immediate assistance with scheme information, check our FAQ or browse schemes by category.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/faq" className="text-sm text-blue-600 hover:text-blue-700">
                View FAQ →
              </Link>
              <Link href="/categories" className="text-sm text-blue-600 hover:text-blue-700">
                Browse Categories →
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Message Sent!</h3>
              <p className="text-slate-600 mb-4">
                Thank you for contacting us. We'll get back to you soon.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Send a Message</h2>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="scheme">Scheme Information</option>
                  <option value="suggestion">Suggest a Scheme</option>
                  <option value="feedback">Feedback</option>
                  <option value="report">Report an Issue</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-colors resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                <Send className="h-5 w-5" />
                Send Message
              </button>

              <p className="text-xs text-slate-500 text-center">
                By submitting this form, you agree to our Privacy Policy and Terms of Service.
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
