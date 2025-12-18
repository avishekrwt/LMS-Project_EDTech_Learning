import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Star,
  Users,
  Clock,
  ArrowLeft,
  CheckCircle,
  BookOpen,
  Award,
  BarChart,
  ShieldCheck,
  Video,
  Download
} from "lucide-react";

const course = {
  id: 1,
  title: "Introduction to Computer Science",
  dept: "Computer Science",
  subtitle: "Master the fundamentals of programming and computational thinking",
  description: "A practical introduction to programming, algorithms, and problem-solving. Build confidence writing code and understanding computation fundamentals. This course is designed for beginners with no prior experience.",
  longDescription: "This comprehensive course covers everything from basic programming concepts to fundamental algorithms. You'll learn through hands-on projects, interactive exercises, and real-world problem-solving. By the end, you'll be able to build your own programs and understand how computers process information.",
  tags: ["featured", "beginner", "programming", "algorithms"],
  image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1120&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  rating: 4.8,
  reviews: 1245,
  students: 2450,
  duration: "8 weeks",
  weeklyEffort: "5-7 hours",
  price: 99,
  discountPrice: 79,
  modules: [
    {
      week: 1,
      title: "Introduction to Programming Concepts",
      lessons: 5,
      duration: "4 hours",
      topics: ["What is programming?", "Basic syntax", "Variables and data types"],
      resources: 3
    },
    {
      week: 2,
      title: "Basic Algorithms and Data Structures",
      lessons: 6,
      duration: "6 hours",
      topics: ["Arrays", "Linked Lists", "Sorting algorithms"],
      resources: 4
    },
    {
      week: 3,
      title: "Problem-Solving Techniques",
      lessons: 4,
      duration: "5 hours",
      topics: ["Algorithmic thinking", "Debugging", "Pseudocode"],
      resources: 2
    },
    {
      week: 4,
      title: "Computational Thinking",
      lessons: 5,
      duration: "5 hours",
      topics: ["Decomposition", "Pattern recognition", "Abstraction"],
      resources: 3
    }
  ],
  prerequisites: ["No prior coding experience required", "Basic computer literacy", "High school math"],
  learningOutcomes: [
    "Write basic programs in Python",
    "Understand fundamental algorithms",
    "Solve problems using computational thinking",
    "Build a simple project from scratch"
  ],
  instructor: {
    name: "Dr. Sarah Chen",
    title: "Professor of Computer Science",
    image: "/instructor_img.png",
    bio: "10+ years teaching computer science. Former software engineer at Google.",
    rating: 4.9
  }
};

export default function CourseDetailPage() {
  const [selectedModule, setSelectedModule] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/courses">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Courses
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <a href="/all_in_one_syllabus.pdf" download>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Syllabus
                </Button>
              </a>

              <Button 
                size="lg" 
                className="gap-2"
                onClick={() => setIsEnrolled(true)}
              >
                {isEnrolled ? "Go to Course" : "Enroll Now"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {course.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium capitalize"
                >
                  {tag}
                </span>
              ))}
              <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-medium flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                Bestseller
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              {course.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6">
              {course.subtitle}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm mb-8">
              <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <img
                  src={course.instructor.image}
                  alt={course.instructor.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-medium">{course.instructor.name}</p>
                  <p className="text-xs text-muted-foreground">{course.instructor.title}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{course.rating}</span>
                <span className="text-muted-foreground">({course.reviews.toLocaleString()} reviews)</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{course.students.toLocaleString()} students</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{course.duration} • {course.weeklyEffort}/week</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">FREE!</span>
                <span className="ml-2 px-2 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded">
                  For Now
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Course Description */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">About This Course</CardTitle>
                <CardDescription>
                  What you'll learn and achieve
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed">
                  {course.description}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {course.longDescription}
                </p>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">What You'll Learn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {course.learningOutcomes.map((outcome, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Curriculum */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Course Curriculum</CardTitle>
                <CardDescription>
                  {course.modules.length} modules • {course.modules.reduce((acc, m) => acc + m.lessons, 0)} lessons
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.modules.map((module, index) => (
                    <div 
                      key={module.week}
                      className={`p-4 rounded-lg border transition-all cursor-pointer hover:border-primary/50 ${
                        selectedModule === index ? 'border-primary bg-primary/5' : ''
                      }`}
                      onClick={() => setSelectedModule(index)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold">Week {module.week}: {module.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {module.lessons} lessons • {module.duration} • {module.resources} resources
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 ml-13">
                            {module.topics.map((topic, i) => (
                              <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instructor */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">About the Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-start gap-6">
                 <img
                    src={course.instructor.image}
                    alt={course.instructor.name}
                    className="w-24 h-24 rounded-full"
                  />
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-bold">{course.instructor.name}</h3>
                      <p className="text-muted-foreground">{course.instructor.title}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{course.instructor.rating}</span>
                      <span className="text-muted-foreground">Instructor Rating</span>
                    </div>
                    <p className="text-muted-foreground">{course.instructor.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <Card className="shadow-xl border-primary/10">
              <CardContent className="p-6 space-y-6">
                <div className="text-center space-y-2">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-primary">FREE</span>
                  </div>
                  <span className="inline-block px-3 py-1 bg-red-500 text-white text-sm font-bold rounded">
                    From your organization
                  </span>
                  <p className="text-sm text-muted-foreground">
                    One-time payment • Lifetime access
                  </p>
                </div>

                <div className="h-px bg-border"></div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Full lifetime access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Access on mobile and TV</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">30-day money-back guarantee</span>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full gap-2"
                  onClick={() => setIsEnrolled(true)}
                >
                  {isEnrolled ? (
                    <>
                      <Video className="w-5 h-5" />
                      Continue Learning
                    </>
                  ) : (
                    <>
                      <Award className="w-5 h-5" />
                      Enroll Now
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 inline mr-1" />
                  Secure payment • 30-day refund policy
                </p>
              </CardContent>
            </Card>

            {/* Course Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="w-5 h-5" />
                  Course Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-medium">{course.duration}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Weekly Effort</p>
                    <p className="font-medium">{course.weeklyEffort}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Skill Level</p>
                    <p className="font-medium">Beginner</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Format</p>
                    <p className="font-medium">Self-paced</p>
                  </div>
                </div>

                <div className="h-px bg-border"></div>

                <div className="space-y-3">
                  <h4 className="font-medium">Prerequisites</h4>
                  <ul className="space-y-2 text-sm">
                    {course.prerequisites.map((req, index) => (
                      <li key={index} className="flex items-center gap-2">
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>


              </CardContent>
            </Card>

            {/* Share Course */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Share this course</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Copy Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}