import React from 'react'
import { Link } from 'react-router-dom'
import { syllabusUrl } from '../src/resourceLibrary'

export default function Syllabus({ theme }) {
  const isDark = theme === 'dark'

  return (
    <main
      className={`min-h-screen px-6 py-14 ${
        isDark
          ? 'bg-slate-900 text-slate-100'
          : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div
        className={`mx-auto max-w-3xl rounded-3xl border p-8 ${
          isDark
            ? 'border-slate-700 bg-slate-800'
            : 'border-slate-200 bg-white'
        }`}
      >
        <h1 className="text-3xl font-bold">
          Electrical Engineering Syllabus
        </h1>

        <p
          className={`mt-4 ${
            isDark ? 'text-slate-300' : 'text-gray-600'
          }`}
        >
          Click below to open the latest syllabus.
        </p>

        <div className="mt-8 flex gap-4">

          <a
            href={syllabusUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-sky-600 px-6 py-3 text-white hover:bg-sky-500"
          >
            Open Syllabus
          </a>

          <Link
            to="/"
            className={`rounded-full px-6 py-3 ${
              isDark
                ? 'bg-slate-900'
                : 'bg-slate-100'
            }`}
          >
            Back
          </Link>

        </div>
      </div>
    </main>
  )
}