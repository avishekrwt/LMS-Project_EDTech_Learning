import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { 
  BookOpen, 
  Users, 
  Target, 
  Shield, 
  Zap, 
  Globe, 
  BarChart3,
  Award,
  Clock,
  Heart
} from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      
  {/* Hero Section */}
  <section className="relative bg-gradient-to-br from-muted to-accent py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              We Believe in the <span className="text-primary">Power of Learning</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              At TechZone LMS, we're transforming education through technology that connects, 
              empowers, and inspires learners and educators worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="default">
                Start Your Journey
              </Button>
              <Button variant="outline" size="lg">
                Meet Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
                <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2018, TechZone LMS began as a small team of educators and technologists 
                  who saw the need for more engaging, accessible learning platforms.
                </p>
                <p>
                  We noticed that traditional learning management systems were often clunky, 
                  impersonal, and difficult to use. So we set out to build something better—a platform 
                  that puts people first.
                </p>
                <p>
                  Today, we serve over 120 institutions and 25,000 learners worldwide, but our mission 
                  remains the same: to make quality education accessible to everyone, everywhere.
                </p>
              </div>
            </div>
            <div className="rounded-2xl p-8 lg:p-12 bg-muted">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-card rounded-lg shadow-sm border border-border">
                  <div className="text-3xl font-bold text-primary mb-2">25k+</div>
                  <div className="text-muted-foreground">Active Learners</div>
                </div>
                <div className="text-center p-6 bg-card rounded-lg shadow-sm border border-border">
                  <div className="text-3xl font-bold text-primary mb-2">120+</div>
                  <div className="text-muted-foreground">Partner Institutions</div>
                </div>
                <div className="text-center p-6 bg-card rounded-lg shadow-sm border border-border">
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <div className="text-muted-foreground">Satisfaction Rate</div>
                </div>
                <div className="text-center p-6 bg-card rounded-lg shadow-sm border border-border">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-muted-foreground">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground">
              These principles guide everything we do and every decision we make.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ValueCard 
              icon={<Users className="h-8 w-8" />}
              title="Learner First"
              description="Every feature, every update, every decision starts with one question: how does this help our learners succeed?"
            />
            <ValueCard 
              icon={<Zap className="h-8 w-8" />}
              title="Innovation"
              description="We constantly explore new technologies and methodologies to enhance the learning experience."
            />
            <ValueCard 
              icon={<Shield className="h-8 w-8" />}
              title="Trust & Security"
              description="Your data's security and privacy are non-negotiable. We build with the highest security standards."
            />
            <ValueCard 
              icon={<Globe className="h-8 w-8" />}
              title="Accessibility"
              description="Education should be available to everyone, regardless of location, ability, or background."
            />
            <ValueCard 
              icon={<Heart className="h-8 w-8" />}
              title="Passion for Education"
              description="We genuinely care about education and believe in its power to transform lives and communities."
            />
            <ValueCard 
              icon={<Target className="h-8 w-8" />}
              title="Excellence"
              description="We strive for excellence in everything we do, from customer support to platform performance."
            />
          </div>
        </div>
      </section>

  {/* What We Offer */}
  <section className="py-16 lg:py-24 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive tools designed to make teaching and learning more effective and enjoyable.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<BookOpen className="h-6 w-6" />}
              title="Course Management"
              description="Create, organize, and deliver engaging content with our intuitive course builder."
            />
            <FeatureCard 
              icon={<BarChart3 className="h-6 w-6" />}
              title="Advanced Analytics"
              description="Track progress, engagement, and outcomes with clear, actionable insights."
            />
            <FeatureCard 
              icon={<Award className="h-6 w-6" />}
              title="Certification"
              description="Automate certificate issuance and track achievements with verified credentials."
            />
            <FeatureCard 
              icon={<Users className="h-6 w-6" />}
              title="Collaboration Tools"
              description="Foster interaction with discussion forums, group projects, and peer reviews."
            />
            <FeatureCard 
              icon={<Clock className="h-6 w-6" />}
              title="Flexible Scheduling"
              description="Adapt to different learning paces with self-paced and scheduled course options."
            />
            <FeatureCard 
              icon={<Shield className="h-6 w-6" />}
              title="Enterprise Security"
              description="Bank-level security protocols to protect your institutional and learner data."
            />
          </div>
        </div>
      </section>

      {/* Team Spotlight */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Meet Our Leaders
            </h2>
            <p className="text-lg text-muted-foreground">
              The passionate individuals driving our mission forward.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamCard 
              name="Sarah Chen"
              role="CEO & Founder"
              bio="Former educator with 15+ years experience in curriculum development and educational technology."
            />
            <TeamCard 
              name="Marcus Johnson"
              role="Chief Technology Officer"
              bio="Software engineer passionate about building scalable, user-friendly learning platforms."
            />
            <TeamCard 
              name="Elena Rodriguez"
              role="Head of Learning Experience"
              bio="Learning designer focused on creating engaging, effective educational experiences."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Learning?
          </h2>
          <p className="text-xl text-primary-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of educators and institutions using TechZone LMS to create exceptional learning experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="default">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

// Component for Value Cards
function ValueCard({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) {
  return (
    <div className="p-8 rounded-2xl shadow-sm border border-border text-center hover:shadow-md transition-shadow bg-card">
      <div className="flex justify-center mb-4">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent text-accent-foreground">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

// Component for Feature Cards
function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) {
  return (
    <Card className="h-full hover:shadow-md transition-shadow border-border">
      <CardHeader>
        <div className="flex items-center gap-4 mb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            {icon}
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

// Component for Team Cards
function TeamCard({ name, role, bio }: { 
  name: string; 
  role: string; 
  bio: string; 
}) {
  return (
    <div className="rounded-2xl p-8 text-center shadow-sm border border-border bg-card">
      <div className="w-24 h-24 bg-gradient-to-br from-accent to-primary rounded-full mx-auto mb-6 flex items-center justify-center text-accent-foreground font-bold text-xl">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-1">{name}</h3>
      <div className="text-primary font-medium mb-4">{role}</div>
      <p className="text-muted-foreground">{bio}</p>
    </div>
  );
}