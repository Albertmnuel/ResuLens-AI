import React, { useState } from 'react';
import { MessageSquarePlus, Send, Loader2, CheckCircle2 } from 'lucide-react';

export default function FeedbackSection() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('feedback');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mrpgwvva', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          category,
          email,
          message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-6 my-8 text-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquarePlus className="w-5 h-5 text-indigo-600" />
        <h3 className="text-base font-bold text-gray-900">Send Feedback & Complaints</h3>
      </div>

      {submitted ? (
        <div className="flex flex-col items-center justify-center py-6 text-center space-y-2">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          <p className="text-sm font-semibold text-gray-800">Thank you for your feedback!</p>
          <p className="text-xs text-gray-500">Your message has been sent successfully.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 text-xs text-indigo-600 font-semibold hover:underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Feedback Type</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-600 outline-none"
            >
              <option value="feedback">General Feedback</option>
              <option value="complaint">Complaint / Bug Report</option>
              <option value="feature">Feature Request</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Your Email (Optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Message / Improvement Idea</label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you like or how we can improve..."
              className="w-full text-xs border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-600 outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Feedback</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}