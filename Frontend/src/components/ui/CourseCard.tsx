import React from 'react'

export type Course = {
  id: number
  title: string
  dept: string
  description: string
  tags?: string[]
}

export default function CourseCard({ course }: { course: Course }) {
  return (
    <article className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{course.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-300">{course.dept}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{course.description}</p>

      {course.tags && course.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {course.tags.map((t) => (
            <span
              key={t}
              className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full dark:bg-indigo-900/30 dark:text-indigo-200"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
