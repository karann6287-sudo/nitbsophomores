import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PdfViewer from './PdfViewer.jsx'

export default function Syllabus({ theme }) {
  const isDark = theme === 'dark'

  const files = [
    { label: 'My Syllabus (project content)', path: '/content/Syllabus.pdf' },
    { label: 'Mathematics 3 - Sample', path: '/syllabi/Mathematics3.pdf' },
    { label: 'Mathematics 4 - Sample', path: '/syllabi/Mathematics4.pdf' },
  ]

  const [selected, setSelected] = useState(files[0].path)

  return (
    <main className={`min-h-screen px-6 py-14 ${isDark ? 'bg-slate-900 text-slate-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`mx-auto max-w-6xl rounded-3xl border p-8 ${isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Syllabus Viewer</h1>
            <p className={`mt-2 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>Preview syllabus PDFs inline.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Back</Link>
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row md:items-center md:gap-6">
          <div className="md:w-64">
            <label className="text-sm font-medium">Available PDFs</label>
            <div className="mt-2 space-y-2">
              {files.map((f) => (
                <button
                  key={f.path}
                  onClick={() => setSelected(f.path)}
                  className={`w-full text-left rounded-lg px-3 py-2 transition-colors ${selected === f.path ? 'bg-sky-600 text-white' : isDark ? 'bg-slate-900 text-slate-300' : 'bg-slate-50 text-slate-700'}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 md:mt-0 md:flex-1">
            <PdfViewer url={selected} title="Selected Syllabus PDF" />
          </div>
        </div>
      </div>
    </main>
  )
}
