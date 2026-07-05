import React from 'react'

export default function PdfViewer({ url, title }) {
  return (
    <div className="mt-6 rounded-2xl overflow-hidden border shadow-lg">
      <div className="bg-slate-100/30 px-4 py-2 flex items-center justify-between">
        <div className="text-sm font-medium">{title}</div>
        <a href={url} target="_blank" rel="noreferrer" className="text-sm text-sky-600 hover:underline">
          Open in new tab
        </a>
      </div>

      <div style={{ height: '72vh' }}>
        <iframe
          src={url}
          title={title}
          className="w-full h-full"
          style={{ border: 0 }}
        />
      </div>
    </div>
  )
}
