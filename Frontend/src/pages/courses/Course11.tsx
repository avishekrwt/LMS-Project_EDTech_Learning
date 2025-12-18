import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Star, Users, Clock, ArrowLeft } from 'lucide-react'

const course = {
  id: 11,
  title: 'English Literature',
  dept: 'Humanities',
  description: 'Study classic and contemporary texts with guided analysis to develop critical reading and writing skills.',
  tags: ['new'],
  image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&h=800&auto=format&fit=crop',
  rating: 4.4,
  students: 950,
  duration: '12 weeks',
}

export default function Course11() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-700 opacity-90"></div>
        <img
          src={course.image}
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{course.title}</h1>
            <p className="text-xl mb-2">{course.dept}</p>
            <div className="flex items-center justify-center gap-4 text-lg">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span>{course.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-5 h-5" />
                <span>{course.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-5 h-5" />
                <span>{course.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link to="/courses">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Button>
        </Link>
      </div>

      {/* Course Details */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Course</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{course.description}</p>
              </CardContent>
            </Card>

            {/* Syllabus Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Course Syllabus</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Introduction to Literary Analysis</li>
                  <li>• Classic British Literature</li>
                  <li>• American Literature</li>
                  <li>• Contemporary Fiction</li>
                  <li>• Poetry and Poetic Devices</li>
                  <li>• Literary Criticism and Theory</li>
                  <li>• Writing Literary Essays</li>
                </ul>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Course Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">$99</div>
                    <div className="text-sm text-muted-foreground">One-time payment</div>
                  </div>
                  <Button className="w-full" size="lg">
                    Enroll Now
                  </Button>
                  <div className="text-xs text-muted-foreground text-center">
                    30-day money-back guarantee
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Students:</span>
                  <span>{course.students.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rating:</span>
                  <span>{course.rating}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Department:</span>
                  <span>{course.dept}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
