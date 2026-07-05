const pdfModules = import.meta.glob('./content/**/*.pdf', {
  eager: true,
  import: 'default',
})

const preferredTermDefinitions = [
  {
    slug: 'mini-tests',
    label: 'MINI TESTS',
    description: 'Short revision papers and quick practice sheets for this subject.',
    folderName: 'Mini Tests',
  },
  {
    slug: 'mid-terms',
    label: 'MID TERMS',
    description: 'Mid-term papers, practice sets, and exam-style revisions.',
    folderName: 'Mid Term',
  },
  {
    slug: 'end-terms',
    label: 'END TERMS',
    description: 'End-term papers and longer exam preparation material.',
    folderName: 'End Term',
  },
  {
    slug: 'notes',
    label: 'NOTES',
    description: 'Lecture notes, quick revisions, and chapter-wise summaries.',
    folderName: 'Notes',
  },
  {
    slug: 'books',
    label: 'BOOKS',
    description: 'Textbooks, reference books, and chapter-wise reading material.',
    folderName: 'Books',
  },
  {
    slug: 'assignments',
    label: 'ASSIGNMENTS',
    description: 'Tutorials, assignment sheets, and worked solutions.',
    folderName: 'Assignments',
  },
]

const semesterFolders = {
  semester3: '3rd Semester_',
  semester4: '4th Semester_',
}

const subjectFolders = {
  semester3: {
    dsa: 'DSA',
    'mathematics-3': 'Maths_',
    emec: 'EMEC',
    emft: 'EMFT',
    'fundamentals-of-design': 'FOD',
    'network-analysis': 'Network analysis_',
    'measurement-and-instrumentation': 'Measurement and Instrumentation',
  },
  semester4: {
    'mathematics-4': 'Maths_',
    'power-systems': 'Power Systems',
    'electronic-devices-and-systems': 'Electronic Devices and Systems',
    'emec-2': 'EMEC-2',
    'generation-of-electrical-power': 'Generation of Electrical Power',
    'fundamentals-of-entrepreneurship': 'Fundamentals of Entrepreneurship',
  },
}

const labSubjectFolders = {
  semester3: {
    'instrumentation-lab': 'Instrumentation Lab',
    'em-1-lab': 'EM-1 Lab',
    'emec-lab': 'EM-1 Lab',
    'network-lab': 'Network Lab',
  },
  semester4: {
    'emec-2-lab': 'EMEC-2 Lab',
    'electronics-lab': 'Electronics Lab',
  },
}

const labTermDefinition = {
  slug: 'lab-manual',
  label: 'LAB MANUAL',
  description: 'Experiment steps, observation format, and viva preparation for the lab.',
  folderName: 'Lab Manual',
}

function normalizeFolderName(value) {
  return value.toLowerCase().replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim()
}

function folderNameToLabel(value) {
  return value
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase())
}

function folderNameToSlug(value) {
  return normalizeFolderName(value).replace(/[^a-z0-9]+/g, '-')
}

const preferredTermsByFolderName = new Map(
  preferredTermDefinitions.map((term) => [normalizeFolderName(term.folderName), term]),
)

const pdfFiles = Object.entries(pdfModules).map(([modulePath, url]) => {
  const relativePath = modulePath.replace('./content/', '').replace(/^\/?/, '')
  const pathParts = relativePath.split('/').filter(Boolean)

  return {
    relativePath,
    url,
    fileName: pathParts[pathParts.length - 1],
    folderPath: pathParts.slice(0, -1).join('/'),
  }
})

function joinPath(...parts) {
  return parts.filter(Boolean).join('/').replace(/\/+/g, '/')
}

function normalizeResourcePath(value) {
  return value.toLowerCase().replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim()
}

function findFilesInFolder(folderPath) {
  const targetFolder = normalizeResourcePath(folderPath)

  return pdfFiles.filter((file) => normalizeResourcePath(file.folderPath) === targetFolder)
}

export const terms = preferredTermDefinitions

export function getSubjectFolderPath(semester, subjectSlug) {
  const semesterFolder = semesterFolders[semester]
  const subjectFolder = subjectFolders[semester]?.[subjectSlug] ?? labSubjectFolders[semester]?.[subjectSlug]

  if (!semesterFolder || !subjectFolder) {
    return null
  }

  return joinPath(semesterFolder, subjectFolder)
}

export function getSubjectResourceTerms(semester, subjectSlug) {
  const subjectFolderPath = getSubjectFolderPath(semester, subjectSlug)

  if (!subjectFolderPath) {
    return []
  }

  const isLabSubject = Boolean(labSubjectFolders[semester]?.[subjectSlug])

  if (isLabSubject) {
    const folderPath = joinPath(subjectFolderPath, labTermDefinition.folderName)
    const files = findFilesInFolder(folderPath)

    return [
      {
        ...labTermDefinition,
        folderPath,
        files,
        fileCount: files.length,
      },
    ]
  }

  return preferredTermDefinitions.map((term) => {
    const folderPath = joinPath(subjectFolderPath, term.folderName)
    const files = findFilesInFolder(folderPath)

    return {
      ...term,
      folderPath,
      files,
      fileCount: files.length,
    }
  })
}

export function getSubjectResourceTerm(semester, subjectSlug, termSlug) {
  return getSubjectResourceTerms(semester, subjectSlug).find((term) => term.slug === termSlug) ?? null
}

export function getSubjectFileTitle(fileName) {
  return fileName.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' ')
}