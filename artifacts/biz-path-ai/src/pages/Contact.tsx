import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, MessageSquare, Phone, Send, CheckCircle } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const contactChannels = [
  { icon: Mail, label: "Email", value: "hello@bizpath.ai", sub: "We respond within 24 hours" },
  { icon: Phone, label: "Phone / WhatsApp", value: "+251 91 234 5678", sub: "Mon–Fri, 9AM–6PM EAT" },
  { icon: MapPin, label: "Office", value: "Bole, Addis Ababa, Ethiopia", sub: "Visit by appointment" },
  { icon: MessageSquare, label: "Telegram", value: "@BizPathAI", sub: "Fastest response channel" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    setSubmitted(true);
  };

  const isValid = form.name.trim() && form.email.trim() && form.message.trim();

  return (
    <div className="min-h-[80vh] py-16 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="text-center mb-12">
          <Badge variant="outline" className="glass mb-4 py-1 px-3">
            <MessageSquare className="w-3 h-3 mr-1.5 text-primary" />
            Get in Touch
          </Badge>
          <h1 className="text-4xl font-bold font-['Space_Grotesk'] mb-3">We would love to hear from you</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Whether you have a question about the platform, need support, or want to partner with us — our team is ready.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Contact Channels */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold mb-4">Contact channels</h2>
            {contactChannels.map((ch, i) => {
              const Icon = ch.icon;
              return (
                <Card key={i} className="glass border-border/50 shadow-lg shadow-black/20 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">{ch.label}</p>
                      <p className="text-sm font-semibold">{ch.value}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{ch.sub}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </motion.div>

          {/* Form */}
          <motion.div {...fadeUp(0.15)} className="lg:col-span-3">
            <Card className="glass border-border/50 shadow-lg shadow-black/20 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-primary/40 to-transparent" />
              <CardContent className="p-6">

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Message sent!</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Thank you for reaching out. We will get back to you within 24 hours.
                    </p>
                    <Button
                      variant="outline"
                      className="border-border/50"
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                      data-testid="button-send-another"
                    >
                      Send another message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-lg font-semibold mb-1">Send us a message</h2>
                    <p className="text-sm text-muted-foreground mb-4">Fill out the form and we will respond promptly.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Full Name *</label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Abebe Girma"
                          data-testid="input-name"
                          className="w-full bg-card border border-border/50 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Email Address *</label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="abebe@example.com"
                          data-testid="input-email"
                          className="w-full bg-card border border-border/50 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Subject</label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        data-testid="select-subject"
                        className="w-full bg-card border border-border/50 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary/50 transition-colors text-foreground"
                      >
                        <option value="">Select a topic...</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Platform Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="press">Press & Media</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Message *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us how we can help you..."
                        data-testid="input-message"
                        className="w-full bg-card border border-border/50 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary/50 transition-colors resize-none placeholder:text-muted-foreground/50"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={!isValid || sending}
                      className="w-full glow-emerald gap-2"
                      data-testid="button-submit"
                    >
                      {sending ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-primary-foreground ai-pulse" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
