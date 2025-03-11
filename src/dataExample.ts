export const PASS_WORD = {
  PASS_ADMIN: 'admin123123',
  PASS_OWNER: 'owner123123',
  PASS_DEVELOPER: 'developer123123',
  PASS_VIEWER: 'viewer123123'
}

export const VALID_CREDENTIALS = [
  {
    email: 'admin@yopmail.com',
    password: PASS_WORD['PASS_ADMIN'],
    createdAt: new Date()
  },
  {
    email: 'owner@yopmail.com',
    password: PASS_WORD['PASS_OWNER'],
    createdAt: new Date()
  },
  {
    email: 'developer@yopmail.com',
    password: PASS_WORD['PASS_DEVELOPER'],
    createdAt: new Date()
  },
  {
    email: 'viewer@yopmail.com',
    password: PASS_WORD['PASS_VIEWER'],
    createdAt: new Date()
  }
]

export const ROLE_USER = {
  ADMIN: 'Admin',
  USER: 'User'
}

export const TABLE_ROLE_USER = [
  {
    name: 'Admin',
    createdAt: new Date()
  },
  {
    name: 'User',
    createdAt: new Date()
  }
]

export const ROLE_PROJECT = {
  OWNER: 'Owner',
  DEVELOPER: 'Developer',
  VIEWER: 'Viewer'
}

export const TABLE_ROLE_PROJECT = [
  { name: ROLE_PROJECT['OWNER'], createdAt: new Date() },
  { name: ROLE_PROJECT['DEVELOPER'], createdAt: new Date() },
  { name: ROLE_PROJECT['VIEWER'], createdAt: new Date() }
]

export const TABLE_USER_ROLE = [
  {
    userId: 1,
    role: ROLE_USER['ADMIN'],
    createdAt: new Date()
  },
  {
    userId: 2,
    role: ROLE_USER['USER'],
    createdAt: new Date()
  },
  {
    userId: 3,
    role: ROLE_USER['USER'],
    createdAt: new Date()
  },
  {
    userId: 4,
    role: ROLE_USER['USER'],
    createdAt: new Date()
  }
]

export const TABLE_USER_PROJECT = [
  {
    userId: 2,
    projectId: 1,
    role: ROLE_PROJECT['OWNER'],
    createdAt: new Date()
  },
  {
    userId: 2,
    projectId: 2,
    role: ROLE_PROJECT['OWNER'],
    createdAt: new Date()
  },
  {
    userId: 3,
    projectId: 1,
    role: ROLE_PROJECT['DEVELOPER'],
    createdAt: new Date()
  },
  {
    userId: 4,
    projectId: 1,
    role: ROLE_PROJECT['VIEWER'],
    createdAt: new Date()
  }
]

export const TABLE_PROJECT = [
  {
    name: 'Project 1',
    metadata: {},
    created_at: new Date(),
    updated_at: new Date(),
    datasets: [1, 2, 3, 4, 5, 6, 7, 8],
    rawData: [1, 2, 3],
    model: [1, 2, 3]
  },
  {
    name: 'Project 2',
    metadata: {},
    created_at: new Date(),
    updated_at: new Date(),
    datasets: [1, 2, 3, 4, 5, 6, 7, 8],
    rawData: [4, 5, 6],
    model: [4, 5, 6]
  },
  {
    name: 'Project 3',
    metadata: {},
    created_at: new Date(),
    updated_at: new Date(),
    datasets: [9, 10, 11, 12, 13, 14, 15],
    rawData: [7, 8, 9],
    model: [7, 8, 9]
  },
  {
    name: 'Project 4',
    metadata: {},
    created_at: new Date(),
    updated_at: new Date(),
    datasets: [16, 17, 18, 19, 20, 21, 22, 23],
    rawData: [10, 11, 12],
    model: [10, 11, 12]
  },
  {
    name: 'Project 5',
    metadata: {},
    created_at: new Date(),
    updated_at: new Date(),
    datasets: [24, 25, 26, 27, 28, 29, 30, 31],
    rawData: [13, 14, 15],
    model: [13, 14, 15]
  },
  {
    name: 'Project 6',
    metadata: {},
    created_at: new Date(),
    updated_at: new Date(),
    datasets: [32, 33, 34, 35, 36],
    rawData: [16, 17, 18],
    model: [16, 17, 18]
  },
  {
    name: 'Project 7',
    metadata: {},
    created_at: new Date(),
    updated_at: new Date(),
    datasets: [37, 38, 39, 40],
    rawData: [19, 20, 21],
    model: [19, 20, 21]
  },
  {
    name: 'Project 8',
    metadata: {},
    created_at: new Date(),
    updated_at: new Date(),
    datasets: [41, 42, 43, 44, 45, 46, 47, 48],
    rawData: [19, 20, 21],
    model: [19, 20, 21]
  },
  {
    name: 'Project 9',
    metadata: {},
    created_at: new Date(),
    updated_at: new Date(),
    datasets: [49, 50, 51, 52, 53, 54, 55, 56, 57],
    rawData: [25, 26, 27],
    model: [25, 26, 27]
  },
  {
    name: 'Project 10',
    metadata: {},
    created_at: new Date(),
    updated_at: new Date(),
    datasets: [32, 33, 34, 35, 36],
    rawData: [16, 17, 18],
    model: [16, 17, 18]
  },
  {
    name: 'Project 11',
    metadata: {},
    created_at: new Date(),
    updated_at: new Date(),
    datasets: [37, 38, 39, 40],
    rawData: [19, 20, 21],
    model: [19, 20, 21]
  },
  {
    name: 'Project 12',
    metadata: {},
    created_at: new Date(),
    updated_at: new Date(),
    datasets: [41, 42, 43, 44, 45, 46, 47, 48],
    rawData: [19, 20, 21],
    model: [19, 20, 21]
  },
  {
    name: 'Project 13',
    metadata: {},
    created_at: new Date(),
    updated_at: new Date(),
    datasets: [49, 50, 51, 52, 53, 54, 55, 56, 57],
    rawData: [25, 26, 27],
    model: [25, 26, 27]
  },
  {
    name: 'Project 14',
    metadata: {},
    created_at: new Date(),
    updated_at: new Date(),
    datasets: [49, 50, 51, 52, 53, 54, 55, 56, 57],
    rawData: [25, 26, 27],
    model: [25, 26, 27]
  }
]

export function getRandomBoolean() {
  return Math.random() < 0.5 // 50% chance of true, 50% chance of false
}

export const array = ['test', 'train', 'view', 'teach']

export function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}

export const TABLE_DATA_SETS = [
  {
    name: 'Dataset 01',
    description: 'Description for Dataset 01',
    is_locked: getRandomBoolean(),
    tags: getRandomItem(array),
    createdAt: new Date()
  }
]

export const TABLE_RAW_DATA = [
  {
    name: 'Data raw 01',
    description: 'Description for Data raw 01',
    status: 0,
    createdAt: new Date()
  }
]

function generateRandomVersion() {
  const major = Math.floor(Math.random() * 10) // 0-9
  const minor = Math.floor(Math.random() * 10) // 0-9
  const patch = Math.floor(Math.random() * 10) // 0-9
  return `v${major}.${minor}.${patch}`
}

export const TABLE_MODEL = [
  {
    name: 'Model 1',
    version: generateRandomVersion(),
    createdAt: new Date()
  }
]
