import React, { useMemo, useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Star, Users, Clock } from 'lucide-react'

export type Course = {
  id: number
  title: string
  dept: string
  description: string
  tags?: string[]
  image?: string
  rating?: number
  students?: number
  duration?: string
}

const SAMPLE_COURSES: Course[] = [
  {
    id: 1,
    title: 'Introduction to Computer Science',
    dept: 'Computer Science',
    description: 'A practical introduction to programming, algorithms, and problem-solving. Build confidence writing code and understanding computation fundamentals.',
    tags: ['featured', 'beginner'],
    image: 'https://images.unsplash.com/photo-1507842217343-583f7270bfbb?w=1200&h=800&auto=format&fit=crop',
    rating: 4.8,
    students: 2450,
    duration: '8 weeks',
  },
  {
    id: 2,
    title: 'Calculus I',
    dept: 'Mathematics',
    description: 'Covers limits, derivatives and integrals with clear examples and problem-solving strategies to build strong mathematical intuition.',
    tags: ['popular'],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=800&auto=format&fit=crop',
    rating: 4.6,
    students: 1890,
    duration: '10 weeks',
  },
  {
    id: 3,
    title: 'Data Structures',
    dept: 'Computer Science',
    description: 'Deep dive into arrays, linked lists, trees, hash tables and graphs with hands-on exercises and complexity analysis.',
    tags: ['intermediate'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&auto=format&fit=crop',
    rating: 4.9,
    students: 3120,
    duration: '12 weeks',
  },
  {
    id: 4,
    title: 'Modern Art Appreciation',
    dept: 'Arts',
    description: 'Explore major movements, techniques, and artists that shaped modern art — with guided critiques and curated examples.',
    tags: ['new'],
    image: 'https://images.unsplash.com/photo-1470752815148-2a4c5f06d8a9?w=1200&h=800&auto=format&fit=crop',
    rating: 4.5,
    students: 890,
    duration: '6 weeks',
  },
  {
    id: 5,
    title: 'Educational Psychology',
    dept: 'Education',
    description: 'Understand how students learn, evidence-based teaching strategies, and assessment design to improve classroom outcomes.',
    tags: ['featured'],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=800&auto=format&fit=crop',
    rating: 4.7,
    students: 1560,
    duration: '8 weeks',
  },
  {
    id: 6,
    title: 'Python Advanced',
    dept: 'Computer Science',
    description: 'Advanced Python concepts including generators, decorators, concurrency, and practical design patterns used in production.',
    tags: ['intermediate', 'popular'],
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&h=800&auto=format&fit=crop',
    rating: 4.8,
    students: 2890,
    duration: '10 weeks',
  },
  {
    id: 7,
    title: 'Web Design Fundamentals',
    dept: 'Computer Science',
    description: 'Build responsive websites using modern HTML and CSS practices, with emphasis on accessibility and performance.',
    tags: ['beginner', 'new'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&auto=format&fit=crop&ixlib=rb-4.0.3&q=80',
    rating: 4.6,
    students: 2200,
    duration: '9 weeks',
  },
  {
    id: 8,
    title: 'Linear Algebra',
    dept: 'Mathematics',
    description: 'Vectors, matrices, and transformations with real applications to engineering and computer science.',
    tags: ['intermediate'],
    image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1200&h=800&auto=format&fit=crop',
    rating: 4.7,
    students: 1450,
    duration: '11 weeks',
  },
  {
    id: 9,
    title: 'Digital Marketing Strategy',
    dept: 'Business',
    description: 'Practical strategies for SEO, social media, paid campaigns and analytics to grow real businesses.',
    tags: ['featured', 'popular'],
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1200&h=800&auto=format&fit=crop',
    rating: 4.9,
    students: 3450,
    duration: '8 weeks',
  },
  {
    id: 10,
    title: 'Business Analytics',
    dept: 'Business',
    description: 'Learn to turn raw data into actionable insights using Excel, SQL, and visualization tools.',
    tags: ['popular'],
    image: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=1200&h=800&auto=format&fit=crop',
    rating: 4.5,
    students: 2100,
    duration: '10 weeks',
  },
  {
    id: 11,
    title: 'English Literature',
    dept: 'Humanities',
    description: 'Study classic and contemporary texts with guided analysis to develop critical reading and writing skills.',
    tags: ['new'],
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&h=800&auto=format&fit=crop',
    rating: 4.4,
    students: 950,
    duration: '12 weeks',
  },
  {
    id: 12,
    title: 'History of Science',
    dept: 'Humanities',
    description: 'Trace the development of scientific ideas and the cultural contexts that shaped them.',
    tags: ['featured'],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=800&auto=format&fit=crop',
    rating: 4.6,
    students: 1320,
    duration: '10 weeks',
  },
  {
    id: 13,
    title: 'Machine Learning Basics',
    dept: 'Computer Science',
    description: 'A hands-on introduction to supervised and unsupervised learning, model evaluation, and practical workflows.',
    tags: ['advanced', 'featured'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&auto=format&fit=crop',
    rating: 4.9,
    students: 3890,
    duration: '14 weeks',
  },
  {
    id: 14,
    title: 'UX/UI Design',
    dept: 'Computer Science',
    description: 'Human-centered design techniques, prototyping, and usability testing to craft delightful interfaces.',
    tags: ['intermediate', 'new'],
    image: 'https://images.unsplash.com/photo-1527153908020-7d9b3c7afb17?w=1200&h=800&auto=format&fit=crop',
    rating: 4.7,
    students: 2340,
    duration: '9 weeks',
  },
]

function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Image */}
      {course.image && (
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop'
            }}
          />
          {course.tags && course.tags[0] && (
            <div className="absolute top-3 right-3">
              <span className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-full">
                {course.tags[0]}
              </span>
            </div>
          )}
        </div>
      )}

      <CardHeader className="flex-1">
        <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
        <CardDescription className="mt-1 text-xs font-medium">{course.dept}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>

        {/* Meta info */}
        <div className="mt-4 space-y-2 text-xs text-muted-foreground">
          {course.rating && (
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating} ({course.students?.toLocaleString() || 0} students)</span>
            </div>
          )}
          {course.duration && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {course.tags && course.tags.length > 1 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {course.tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full"
              >
                {t}
              </span>
            ))}
            {course.tags.length > 2 && (
              <span className="text-xs text-muted-foreground px-2 py-0.5">
                +{course.tags.length - 2} more
              </span>
            )}
          </div>
        )}
      </CardContent>

      <div className="px-6 pb-6">
        <Button className="w-full" size="sm">
          Enroll Now
        </Button>
      </div>
    </Card>
  )
}

type TabKey = 'all' | 'department' | 'featured'

export default function CoursesPage() {
  const [searchParams] = useSearchParams()
  const initialTab = (searchParams.get('tab') as TabKey) || 'all'
  const initialDept = searchParams.get('dept') || null
  
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab)
  const [selectedDept, setSelectedDept] = useState<string | null>(initialDept)
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [query, setQuery] = useState<string>('')
  const [sort, setSort] = useState<'newest' | 'popular' | 'az'>('newest')

  // Set tab from URL params on mount
  useEffect(() => {
    if (searchParams.get('tab')) {
      setActiveTab(searchParams.get('tab') as TabKey)
    }
    if (searchParams.get('dept')) {
      setSelectedDept(searchParams.get('dept'))
    }
  }, [searchParams])

  const departments = useMemo(() => {
    const set = new Set(SAMPLE_COURSES.map((c) => c.dept))
    return Array.from(set)
  }, [])

  const deptCounts = useMemo(() => {
    const map = new Map<string, number>()
    SAMPLE_COURSES.forEach((c) => map.set(c.dept, (map.get(c.dept) || 0) + 1))
    return map
  }, [])

  const features = useMemo(() => {
    const s = new Set<string>()
    SAMPLE_COURSES.forEach((c) => c.tags?.forEach((t) => s.add(t)))
    return Array.from(s)
  }, [])

  const featureCounts = useMemo(() => {
    const map = new Map<string, number>()
    SAMPLE_COURSES.forEach((c) => c.tags?.forEach((t) => map.set(t, (map.get(t) || 0) + 1)))
    return map
  }, [])

  const filtered = useMemo(() => {
    let results = SAMPLE_COURSES.slice()

    // search
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      results = results.filter((c) => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q))
    }

    // tab filters
    if (activeTab === 'all') {
      // nothing
    }
    if (activeTab === 'department' && selectedDept)
      results = results.filter((c) => c.dept === selectedDept)
    if (activeTab === 'featured' && selectedFeature)
      results = results.filter((c) => c.tags?.includes(selectedFeature))

    if (activeTab === 'department' && !selectedDept) {
      // keep results as-is
    }
    if (activeTab === 'featured' && !selectedFeature) {
      results = results.filter((c) => c.tags && c.tags.length > 0)
    }

    // sort
    if (sort === 'az') results.sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'popular') results.sort((a, b) => (b.tags?.includes('popular') ? 1 : 0) - (a.tags?.includes('popular') ? 1 : 0))

    return results
  }, [activeTab, selectedDept, selectedFeature, query, sort])

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold mb-2">Courses</h1>
            <p className="text-base text-muted-foreground">Explore all courses, filter by department or featured selections, and search to find the right fit.</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-full sm:w-64 flex items-center gap-2">
              <Input
                placeholder="Search courses..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <Button variant="ghost" size="sm" onClick={() => setQuery('')}>
                  Clear
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="rounded-md border px-3 py-2 bg-background text-sm"
              >
                <option value="newest">Newest</option>
                <option value="popular">Popular</option>
                <option value="az">A → Z</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <nav className="mb-8">
        <div className="inline-flex rounded-md bg-muted p-1">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'all' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            All Courses
          </button>
          <button
            onClick={() => setActiveTab('department')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'department' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            By Department
          </button>
          <button
            onClick={() => setActiveTab('featured')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'featured' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Featured
          </button>
        </div>
      </nav>

      <section>
        {activeTab === 'all' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        )}

        {activeTab === 'department' && (
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="w-full lg:w-1/4">
              <h4 className="font-semibold mb-4 text-lg">Departments</h4>
              <ul className="flex flex-col gap-2">
                <li>
                  <button
                    onClick={() => { setSelectedDept(null) }}
                    className={`w-full text-left px-3 py-2 rounded ${selectedDept === null ? 'bg-indigo-50 dark:bg-indigo-900/30' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                  >
                    All Departments
                  </button>
                </li>
                {departments.map((d) => (
                  <li key={d}>
                    <button
                      onClick={() => setSelectedDept(d)}
                      className={`w-full text-left px-3 py-2 rounded flex items-center justify-between ${selectedDept === d ? 'bg-indigo-50 dark:bg-indigo-900/30' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    >
                      <span>{d}</span>
                      <span className="ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full dark:bg-gray-800">{deptCounts.get(d) ?? 0}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filtered.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'featured' && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedFeature(null)}
                className={`px-3 py-1 rounded ${selectedFeature === null ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
              >
                All Features
              </button>
              {features.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFeature(f)}
                  className={`px-3 py-1 rounded flex items-center gap-2 ${selectedFeature === f ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
                >
                  <span>{f}</span>
                  <span className="text-xs bg-white/70 text-gray-700 px-2 py-0.5 rounded-full dark:bg-gray-800">{featureCounts.get(f) ?? 0}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
