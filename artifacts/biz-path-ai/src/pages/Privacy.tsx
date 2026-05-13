import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay },
});

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us when you use BizPath AI, including:

• **Assessment data:** Capital range, educational background, skills, passions, and country of residence you enter during the assessment wizard.
• **Account information:** Name and email address if you create an account or contact us.
• **Usage data:** Pages visited, features used, and interactions with the platform — collected anonymously via analytics tools.
• **Communications:** Any messages you send us via the contact form or email.

We do not collect payment card information, government IDs, or sensitive personal data.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:

• Generate personalised business recommendations and roadmaps tailored to your profile.
• Improve the accuracy of our AI matching algorithms over time.
• Communicate with you about your account, updates, and new features.
• Analyse aggregate, anonymised usage patterns to improve the platform.
• Comply with legal obligations.

We do not sell your personal data to third parties, ever.`,
  },
  {
    title: "3. Data Sharing",
    content: `We share your data only in the following limited circumstances:

• **Service providers:** Trusted third-party providers who help us operate the platform (e.g. hosting, analytics). These providers are bound by strict confidentiality agreements.
• **Legal requirements:** If required by Ethiopian law, court order, or government regulation.
• **Business transfers:** In the event of a merger or acquisition, your data may transfer to the acquiring entity under the same privacy protections.

We never share your assessment profile or business recommendations with advertisers or data brokers.`,
  },
  {
    title: "4. Data Storage & Security",
    content: `Your data is stored on secure cloud infrastructure hosted within compliant data centres. We implement industry-standard security measures including:

• Encryption of data in transit (TLS 1.3) and at rest.
• Access controls limiting data access to authorised team members only.
• Regular security audits and vulnerability assessments.

While we take every reasonable precaution, no system is 100% secure. We encourage you to use a strong, unique password if you create an account.`,
  },
  {
    title: "5. Your Rights",
    content: `You have the following rights regarding your personal data:

• **Access:** Request a copy of the personal data we hold about you.
• **Correction:** Ask us to correct inaccurate or incomplete data.
• **Deletion:** Request deletion of your data at any time by contacting us at hello@bizpath.ai.
• **Portability:** Request your data in a structured, machine-readable format.
• **Objection:** Object to processing of your data for marketing purposes.

To exercise any of these rights, email us at hello@bizpath.ai with the subject line "Data Request".`,
  },
  {
    title: "6. Cookies",
    content: `BizPath AI uses cookies and similar technologies to:

• Keep you signed in between sessions.
• Remember your assessment progress.
• Collect anonymised analytics data to improve the platform.

You can control cookies through your browser settings. Disabling cookies may affect some platform functionality. We do not use third-party advertising cookies.`,
  },
  {
    title: "7. Children's Privacy",
    content: `BizPath AI is intended for users who are 18 years of age or older. We do not knowingly collect personal data from individuals under 18. If you believe a minor has provided us with personal data, please contact us immediately and we will delete it promptly.`,
  },
  {
    title: "8. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of material changes by posting the new policy on this page with an updated "Last updated" date. Your continued use of BizPath AI after changes are posted constitutes your acceptance of the updated policy.`,
  },
  {
    title: "9. Contact Us",
    content: `If you have questions, concerns, or requests regarding this Privacy Policy, please contact our Data Protection Officer:

**Email:** privacy@bizpath.ai
**Address:** BizPath AI, Bole Sub-City, Addis Ababa, Ethiopia
**Phone:** +251 91 234 5678

We aim to respond to all privacy-related inquiries within 5 business days.`,
  },
];

function formatContent(text: string) {
  return text.split("\n").map((line, i) => {
    if (line.startsWith("• ")) {
      const content = line.slice(2);
      const parts = content.split(/\*\*(.*?)\*\*/g);
      return (
        <li key={i} className="flex gap-2 text-sm text-muted-foreground">
          <span className="text-primary mt-1.5 shrink-0">•</span>
          <span>
            {parts.map((part, j) =>
              j % 2 === 1 ? <strong key={j} className="text-foreground font-semibold">{part}</strong> : part
            )}
          </span>
        </li>
      );
    }
    if (line.trim() === "") return <br key={i} />;
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <p key={i} className="text-sm text-muted-foreground leading-relaxed">
        {parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j} className="text-foreground font-semibold">{part}</strong> : part
        )}
      </p>
    );
  });
}

export default function Privacy() {
  return (
    <div className="min-h-[80vh] py-16 px-4 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-10">
          <Badge variant="outline" className="glass mb-4 py-1 px-3">
            <Shield className="w-3 h-3 mr-1.5 text-primary" />
            Legal
          </Badge>
          <h1 className="text-4xl font-bold font-['Space_Grotesk'] mb-3">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: May 13, 2026</p>
        </motion.div>

        {/* Intro */}
        <motion.div {...fadeUp(0.05)}>
          <Card className="glass border-primary/20 shadow-lg shadow-black/20 mb-8 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary/10" />
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                At BizPath AI, we take your privacy seriously. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our platform. By using BizPath AI, you agree to the practices described in this document. If you do not agree, please do not use our services.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, i) => (
            <motion.div key={i} {...fadeUp(0.05 + i * 0.04)}>
              <Card className="glass border-border/50 shadow-lg shadow-black/20">
                <CardContent className="p-6">
                  <h2 className="text-base font-semibold mb-3 text-foreground">{section.title}</h2>
                  <ul className="space-y-1.5">{formatContent(section.content)}</ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
