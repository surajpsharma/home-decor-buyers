"use client";

import { useState } from "react";
import { Search, Mail, MapPin, Building2, Star, Send, X, Loader2 } from "lucide-react";

export default function Home() {
  const [location, setLocation] = useState("");
  const [term, setTerm] = useState("Home Decor");
  const [loading, setLoading] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [error, setError] = useState(null);

  // Email Modal State
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [emailSubject, setEmailSubject] = useState("Partnership Opportunity: Premium Home Decor Supplies");
  const [emailMessage, setEmailMessage] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!location) return;
    
    setLoading(true);
    setError(null);
    setBusinesses([]);
    
    try {
      const res = await fetch(`/api/find-buyers?location=${encodeURIComponent(location)}&term=${encodeURIComponent(term)}`);
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to fetch buyers");
      
      setBusinesses(data.businesses || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openEmailModal = (buyer) => {
    setSelectedBuyer(buyer);
    setEmailMessage(`Hi ${buyer.name} team,\n\nI came across your store in ${buyer.location?.city || 'your area'} and love your collection! We supply premium home decor items and believe our products would be a great fit for your customers.\n\nLet's connect!\n\nBest regards,\n[Your Name]`);
    setEmailSuccess(false);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setSendingEmail(true);
    
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: selectedBuyer.email,
          subject: emailSubject,
          message: emailMessage,
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send email");
      
      setEmailSuccess(true);
      setTimeout(() => {
        setSelectedBuyer(null);
      }, 2000);
    } catch (err) {
      alert("Error sending email: " + err.message);
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          Home Decor B2B Leads
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Instantly discover and connect with retail stores and interior designers across the United States.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-16">
        <div className="glass p-2 rounded-2xl flex flex-col md:flex-row gap-2">
          <div className="flex-1 relative">
            <Building2 className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Niche (e.g., Home Decor, Furniture)"
              className="w-full glass-input rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-400"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              required
            />
          </div>
          <div className="flex-1 relative">
            <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="City, State (e.g., Los Angeles, CA)"
              className="w-full glass-input rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-400"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="glass-button px-8 py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <Search className="h-5 w-5" />}
            Find Buyers
          </button>
        </div>
      </form>

      {/* Error State */}
      {error && (
        <div className="max-w-3xl mx-auto mb-8 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-center">
          {error}
        </div>
      )}

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((buyer) => (
          <div key={buyer.id} className="glass-card p-6 flex flex-col group hover:border-indigo-500/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                {buyer.name}
              </h3>
              {buyer.rating && (
                <span className="flex items-center gap-1 text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-lg text-sm font-medium">
                  <Star className="h-4 w-4 fill-current" />
                  {buyer.rating}
                </span>
              )}
            </div>
            
            <div className="space-y-3 mb-6 flex-1 text-slate-300 text-sm">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-500" />
                {buyer.location?.display_address?.join(", ")}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-500" />
                {buyer.email}
              </p>
            </div>

            <button
              onClick={() => openEmailModal(buyer)}
              className="w-full glass-button py-2.5 rounded-xl font-medium flex items-center justify-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Send Outreach
            </button>
          </div>
        ))}
      </div>

      {/* Email Modal */}
      {selectedBuyer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card w-full max-w-lg p-6 relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setSelectedBuyer(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            <h2 className="text-2xl font-bold mb-1 text-white">Email {selectedBuyer.name}</h2>
            <p className="text-sm text-slate-400 mb-6">To: {selectedBuyer.email}</p>

            {emailSuccess ? (
              <div className="py-12 flex flex-col items-center justify-center text-green-400">
                <div className="h-16 w-16 bg-green-400/10 rounded-full flex items-center justify-center mb-4">
                  <Send className="h-8 w-8" />
                </div>
                <p className="text-lg font-medium">Email sent successfully!</p>
              </div>
            ) : (
              <form onSubmit={handleSendEmail} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Subject</label>
                  <input
                    type="text"
                    className="w-full glass-input rounded-xl p-3 text-white"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Message</label>
                  <textarea
                    rows={6}
                    className="w-full glass-input rounded-xl p-3 text-white resize-none"
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={sendingEmail}
                  className="w-full glass-button py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {sendingEmail ? <Loader2 className="animate-spin h-5 w-5" /> : <Send className="h-5 w-5" />}
                  {sendingEmail ? "Sending..." : "Send Email"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
