import React, { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { subjectData } from './SubjectPage.jsx'
import { getSubjectFileTitle, getSubjectResourceTerm } from '../resourceLibrary.js'

export default function ResourceFolderPage({ theme }) {
  const isDark = theme === 'dark'
  const { semester, subjectSlug, termSlug } = useParams()

  const subject = useMemo(() => subjectData[semester]?.[subjectSlug], [semester, subjectSlug])

  const term = useMemo(() => {
    if (!subject) {
      return null
    }

    return getSubjectResourceTerm(semester, subjectSlug, termSlug)
  }, [semester, subject, subjectSlug, termSlug])

  if (!subject || !term) {
    return (
      <main className={`min-h-screen px-6 py-16 ${isDark ? 'bg-slate-900 text-slate-100' : 'bg-gray-50 text-gray-900'}`}>
        <div className={`mx-auto max-w-3xl rounded-3xl border p-8 ${isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'}`}>
          <h1 className="text-2xl font-semibold">Folder not found</h1>
          <p className={`mt-3 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
            The subject folder or term folder does not exist yet.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-full bg-sky-600 px-5 py-3 text-white transition-colors hover:bg-sky-500"
          >
            Go back home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className={`min-h-screen px-6 py-14 transition-colors ${isDark ? 'bg-slate-900 text-slate-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="mx-auto max-w-5xl">
        <div className={`rounded-4xl border p-8 md:p-10 shadow-2xl ${isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'}`}>
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className={`text-sm font-medium uppercase tracking-[0.2em] ${isDark ? 'text-sky-300' : 'text-sky-700'}`}>
                {semester === 'semester3' ? 'Semester 3' : 'Semester 4'} 
              </p>
              <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight">{subject.title}</h1>
              <p className={`mt-3 text-sm md:text-base ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                {term.label}
              </p>
            </div>

            <Link
              to={`/subjects/${semester}/${subjectSlug}`}
              className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-colors ${isDark ? 'bg-slate-900 text-slate-100 hover:bg-slate-950' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}
            >
              Back to subject
            </Link>
          </div>

          <section className="mt-10">
            <div className={`rounded-3xl border p-5 md:p-6 ${isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-slate-50'}`}>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {term.files.length > 0 ? (
                  term.files.map((file) => (
                    <a
  key={file.relativePath}
  href={file.url}
  className={`rounded-3xl border p-5 transition-transform duration-200 hover:-translate-y-1 ${
    isDark
      ? 'border-slate-700 bg-slate-900'
      : 'border-slate-200 bg-white'
  }`}
>
                      <div className="mt-4">
                        <h3 className="text-base font-semibold leading-snug">{getSubjectFileTitle(file.fileName)}</h3>
                        <p className={`mt-2 text-sm ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                          Open PDF in a new tab
                        </p>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className={`rounded-3xl border p-6 ${isDark ? 'border-slate-700 bg-slate-900 text-slate-300' : 'border-slate-200 bg-white text-gray-600'}`}>
                    No PDFs are in this folder yet.
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}