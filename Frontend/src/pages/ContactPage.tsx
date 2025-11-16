import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Simulate API call - replace with your actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Form submission logic here
      console.log("Form submitted:", formData);

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      setSubmitStatus("error");
      console.error("Form submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 pt-20 pb-10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Get in <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Reach out to our team and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info Cards */}
            <ContactInfoCard
              icon={<Mail className="w-6 h-6" />}
              title="Email"
              content="support@techzone.edu"
              subtext="We'll respond within 24 hours"
              href="mailto:support@techzone.edu"
            />
            <ContactInfoCard
              icon={<Phone className="w-6 h-6" />}
              title="Phone"
              content="+1 (555) 123-4567"
              subtext="Mon-Fri from 9AM to 6PM"
              href="tel:+15551234567"
            />
            <ContactInfoCard
              icon={<MapPin className="w-6 h-6" />}
              title="Office"
              content="123 Education Street"
              subtext="New York, NY 10001"
              href="#"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border/50 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-semibold text-foreground">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-11 bg-background border-border/60 focus:border-primary transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-semibold text-foreground">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-11 bg-background border-border/60 focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-semibold text-foreground">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="h-11 bg-background border-border/60 focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold text-foreground">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="bg-background border-border/60 focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <div className="flex items-center gap-3 p-4 bg-primary/10 border border-primary/30 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-sm font-medium text-primary">
                        Message sent successfully! We'll get back to you soon.
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                      <p className="text-sm font-medium text-destructive">
                        Something went wrong. Please try again.
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-11 bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 text-foreground font-semibold"
                  >
                    {submitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>

                <div className="space-y-6">
                  <FAQItem
                    question="What is your response time?"
                    answer="We typically respond to all inquiries within 24 business hours during weekdays."
                  />
                  <FAQItem
                    question="How can I schedule a demo?"
                    answer="You can schedule a demo by selecting a time slot after submitting the contact form or by calling our sales team directly."
                  />
                  <FAQItem
                    question="Do you offer technical support?"
                    answer="Yes, we provide 24/7 technical support for all our premium members. Standard support is available during business hours."
                  />
                  <FAQItem
                    question="Can I request a custom solution?"
                    answer="Absolutely! Contact our enterprise team to discuss custom solutions tailored to your institution's needs."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary/10 to-accent/10 border-t border-border/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join TechZone?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start your learning journey today and transform your educational experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300"
            >
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border/60 hover:bg-muted transition-colors"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

// Contact Info Card Component
function ContactInfoCard({
  icon,
  title,
  content,
  subtext,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
  subtext: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group block bg-card border border-border/50 rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-lg font-medium text-primary mt-1 group-hover:translate-x-1 transition-transform">
            {content}
          </p>
          <p className="text-sm text-muted-foreground mt-2">{subtext}</p>
        </div>
      </div>
    </a>
  );
}

// FAQ Item Component
function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border/30 pb-6 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between gap-4 hover:text-primary transition-colors text-left group"
      >
        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {question}
        </h4>
        <span
          className={`flex-shrink-0 w-5 h-5 text-primary transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
          {answer}
        </p>
      )}
    </div>
  );
}
