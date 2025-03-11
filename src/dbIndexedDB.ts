import {
  TABLE_PROJECT,
  TABLE_ROLE_PROJECT,
  TABLE_ROLE_USER,
  TABLE_USER_PROJECT,
  TABLE_USER_ROLE,
  VALID_CREDENTIALS
} from './dataExample'

const indexedDB = window.indexedDB

function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('interviewPrep', 1)

    request.onerror = function (event) {
      console.error('An error occurred with IndexedDB')
      reject(event)
    }

    request.onupgradeneeded = function () {
      const db = request.result

      // Tạo objectStore cho users
      const store = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true })
      store.createIndex('email', 'email', { unique: true })

      // Tạo objectStore cho table role - admin, user
      const roleStore = db.createObjectStore('roles', { keyPath: 'id', autoIncrement: true })
      roleStore.createIndex('name', 'name', { unique: true })

      // Tạo objectStore cho table roleUser
      const roleUserStore = db.createObjectStore('roleUsers', { keyPath: 'id', autoIncrement: true })
      roleUserStore.createIndex('id', 'id', { unique: true })
      roleUserStore.createIndex('userId', 'userId', { unique: true })

      // Tạo objectStore cho role project - owner, developer, viewer
      const roleProjectStore = db.createObjectStore('roleProjects', { keyPath: 'id', autoIncrement: true })
      roleProjectStore.createIndex('name', 'name', { unique: true })

      // Tạo objectStore cho table user role - project1, role owner, userId
      const userProjectStore = db.createObjectStore('userProjects', { keyPath: 'id', autoIncrement: true })
      userProjectStore.createIndex('id', 'id', { unique: true })
      userProjectStore.createIndex('userId', 'userId', { unique: false })
      userProjectStore.createIndex('projectId', 'projectId', { unique: false })

      // Tạo objectStore cho table dataRaw
      const dataRawStore = db.createObjectStore('dataRaws', { keyPath: 'id', autoIncrement: true })
      dataRawStore.createIndex('id', 'id', { unique: true })

      // Tạo objectStore cho table dataSetStore
      const dataSetStore = db.createObjectStore('dataSets', { keyPath: 'id', autoIncrement: true })
      dataSetStore.createIndex('id', 'id', { unique: true })

      // Tạo objectStore cho table modelVersion
      const dataModelStore = db.createObjectStore('modelVersions', { keyPath: 'id', autoIncrement: true })
      dataModelStore.createIndex('id', 'id', { unique: true })

      // Tạo objectStore cho table projects
      const dataProjectStore = db.createObjectStore('projects', { keyPath: 'id', autoIncrement: true })
      dataProjectStore.createIndex('id', 'id', { unique: true })
      dataProjectStore.createIndex('userId', 'userId', { unique: false })
    }

    request.onsuccess = function (event: any) {
      resolve(event.target.result)
    }
  })
}

// Hàm kiểm tra và thêm user mặc định nếu chưa có
// Hàm khởi tạo dữ liệu mặc định
async function initializeDefaultUsers(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      [
        'users',
        'roles',
        'roleProjects',
        'userProjects',
        'dataRaws',
        'dataSets',
        'modelVersions',
        'projects',
        'roleUsers'
      ],
      'readwrite'
    )
    const userStore = transaction.objectStore('users')
    const roleStore = transaction.objectStore('roles')
    const roleProjectStore = transaction.objectStore('roleProjects')
    const userProjectStore = transaction.objectStore('userProjects')
    const dataRawsStore = transaction.objectStore('dataRaws')
    const dataSetsStore = transaction.objectStore('dataSets')
    const modelVersionsStore = transaction.objectStore('modelVersions')
    const projectsStore = transaction.objectStore('projects')
    const roleUserStore = transaction.objectStore('roleUsers')

    // Kiểm tra và thêm dữ liệu nếu chưa có
    const userCountRequest = userStore.count()
    userCountRequest.onsuccess = function () {
      if (userCountRequest.result === 0) {
        VALID_CREDENTIALS.forEach((user) => userStore.add(user))
        console.log('Default users initialized')
      } else {
        console.log('Users already exist, skipping default initialization')
      }
    }

    const roleCountRequest = roleStore.count()
    roleCountRequest.onsuccess = function () {
      if (roleCountRequest.result === 0) {
        TABLE_ROLE_USER.forEach((role) => roleStore.add(role))
        console.log('Default roles initialized')
      } else {
        console.log('Roles already exist, skipping default initialization')
      }
    }

    const roleProjectCountRequest = roleProjectStore.count()
    roleProjectCountRequest.onsuccess = function () {
      if (roleProjectCountRequest.result === 0) {
        TABLE_ROLE_PROJECT.forEach((roleProject) => roleProjectStore.add(roleProject))
        console.log('Default roleProjects initialized')
      } else {
        console.log('RoleProjects already exist, skipping default initialization')
      }
    }

    const userProjectCountRequest = userProjectStore.count()
    userProjectCountRequest.onsuccess = function () {
      if (userProjectCountRequest.result === 0) {
        TABLE_USER_PROJECT.forEach((userProject) => userProjectStore.add(userProject))
        console.log('Default userProjects initialized')
      } else {
        console.log('UserProjects already exist, skipping default initialization')
      }
    }

    const dataRawCountRequest = dataRawsStore.count()
    dataRawCountRequest.onsuccess = function () {
      if (dataRawCountRequest.result === 0) {
        const getDataRaws = [...Array(40)].map((_, index) => {
          return {
            name: `Data raw ${index + 1}`,
            description: `Description for Data raw ${index + 1}`,
            status: 0,
            createdAt: new Date()
          }
        })

        getDataRaws?.forEach((raw) => dataRawsStore.add(raw))

        console.log('Default DataRaw initialized')
      } else {
        console.log('DataRaw already exist, skipping default initialization')
      }
    }

    const dataSetsCountRequest = dataSetsStore.count()
    dataSetsCountRequest.onsuccess = function () {
      if (dataSetsCountRequest.result === 0) {
        const getRandomBoolean = () => {
          return Math.random() < 0.5 // 50% chance of true, 50% chance of false
        }

        const array = ['test', 'train', 'view', 'teach']

        const getRandomItem = (arr) => {
          const randomIndex = Math.floor(Math.random() * arr.length)
          return arr[randomIndex]
        }

        const getDataSets = [...Array(80)].map((_, index) => {
          return {
            name: `Dataset ${index + 1}`,
            description: `Description for Dataset ${index + 1}`,
            is_locked: getRandomBoolean(),
            tags: getRandomItem(array),
            createdAt: new Date()
          }
        })

        getDataSets?.forEach((dataSet) => dataSetsStore.add(dataSet))
        console.log('Default DataSets initialized')
      } else {
        console.log('DataSets already exist, skipping default initialization')
      }
    }

    const modelVersionCountRequest = modelVersionsStore.count()
    modelVersionCountRequest.onsuccess = function () {
      if (modelVersionCountRequest.result === 0) {
        function generateRandomVersion() {
          const major = Math.floor(Math.random() * 10) // 0-9
          const minor = Math.floor(Math.random() * 10) // 0-9
          const patch = Math.floor(Math.random() * 10) // 0-9
          return `v${major}.${minor}.${patch}`
        }

        const getDataModels = [...Array(40)].map((_, index) => {
          return {
            name: `Model ${index + 1}`,
            version: generateRandomVersion(),
            createdAt: new Date(),
            datasetIds: [
              Math.floor(Math.random() * 60) + 1,
              Math.floor(Math.random() * 60) + 2,
              Math.floor(Math.random() * 60) + 3
            ]
          }
        })

        getDataModels?.forEach((model) => modelVersionsStore.add(model))

        console.log('Default ModelVersion initialized')
      } else {
        console.log('ModelVersion already exist, skipping default initialization')
      }
    }

    const projectStoreCountRequest = projectsStore.count()
    projectStoreCountRequest.onsuccess = function () {
      if (projectStoreCountRequest.result === 0) {
        TABLE_PROJECT.forEach((project) => projectsStore.add(project))
        console.log('Default ProjectData initialized')
      } else {
        console.log('ProjectData already exist, skipping default initialization')
      }
    }

    const roleUserRequest = roleUserStore.count()
    roleUserRequest.onsuccess = function () {
      if (roleUserRequest.result === 0) {
        TABLE_USER_ROLE.forEach((roleUser) => roleUserStore.add(roleUser))
        console.log('Default user role initialized')
      } else {
        console.log('User Role already exist, skipping default initialization')
      }
    }

    // Chỉ resolve khi transaction hoàn tất
    transaction.oncomplete = function (event) {
      db.close()
      resolve(event)
    }

    // Xử lý lỗi transaction
    transaction.onerror = function (event) {
      reject(new Error('Transaction failed: ' + event.target.error))
    }
  })
}

// Hàm chính để chạy toàn bộ quy trình
async function main() {
  try {
    const db = await initDB() // Mở database trước
    await initializeDefaultUsers(db) // Sau đó khởi tạo dữ liệu
    console.log('Database initialization completed')
  } catch (error) {
    console.error('Error during initialization:', error)
  }
}

// Hàm khởi động ứng dụng (gọi khi truy cập app)
export async function initializeApp(): Promise<void> {
  try {
    const db = (await initDB()) as IDBDatabase
    await initializeDefaultUsers(db) // Kiểm tra và tạo user mặc định nếu cần
  } catch (error) {
    throw new Error('App initialization failed: ' + error)
  }
}

// Hàm addUser
export async function addUser(email, password) {
  try {
    const db = (await initDB()) as IDBDatabase
    await initializeDefaultUsers(db) // Kiểm tra và thêm user mặc định nếu cần

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['users'], 'readwrite')
      const store = transaction.objectStore('users')

      const user = {
        email: email,
        password: password,
        createdAt: new Date()
      }

      const addRequest = store.add(user)

      addRequest.onsuccess = function () {
        resolve({
          success: true,
          id: addRequest.result,
          message: 'User added successfully'
        })
      }

      addRequest.onerror = function () {
        reject({
          success: false,
          message: 'Error adding user'
        })
      }

      transaction.oncomplete = function () {
        db.close()
      }
    })
  } catch (error) {
    throw new Error('Database initialization failed: ' + error)
  }
}

// Hàm để lấy tất cả users (tuỳ chọn, để kiểm tra)
export async function getAllUsers() {
  try {
    const db = (await initDB()) as IDBDatabase
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['users'], 'readonly')
      const store = transaction.objectStore('users')
      const request = store.getAll()

      request.onsuccess = function () {
        resolve(request.result)
      }

      request.onerror = function () {
        reject(new Error('Error fetching users'))
      }

      transaction.oncomplete = function () {
        db.close()
      }
    })
  } catch (error) {
    throw new Error('Database initialization failed: ' + error)
  }
}

export async function getAllProjects() {
  try {
    const db = (await initDB()) as IDBDatabase
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['projects'], 'readonly')
      const store = transaction.objectStore('projects')
      const request = store.getAll()

      request.onsuccess = function () {
        resolve(request.result)
      }

      request.onerror = function () {
        reject(new Error('Error fetching projects'))
      }

      transaction.oncomplete = function () {
        db.close()
      }
    })
  } catch (error) {
    throw new Error('Database initialization failed: ' + error)
  }
}

export async function findOneUserByEmail(email: string) {
  try {
    const db = (await initDB()) as IDBDatabase
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['users'], 'readonly')
      const store = transaction.objectStore('users')
      const emailIndex = store.index('email') // Use the email index
      const request = emailIndex.get(email) // Get the user with the specified email

      request.onsuccess = function () {
        resolve(request.result) // Returns the user object or undefined if not found
      }

      request.onerror = function () {
        reject(new Error('Error fetching user by email'))
      }

      transaction.oncomplete = function () {
        db.close()
      }
    })
  } catch (error) {
    throw new Error('Database initialization failed: ' + error)
  }
}

export async function getUserById(userId: number) {
  try {
    const db = (await initDB()) as IDBDatabase
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['users'], 'readonly')
      const store = transaction.objectStore('users')
      const request = store.get(userId)

      request.onsuccess = function () {
        resolve(request.result) // { id, email, ... } or undefined
      }

      request.onerror = function () {
        reject(new Error(`Error fetching user with ID ${userId}`))
      }

      transaction.oncomplete = function () {
        db.close()
      }
    })
  } catch (error) {
    throw new Error('Database initialization failed: ' + error)
  }
}

export async function findOneRoleUserById(userId: number) {
  try {
    const db = (await initDB()) as IDBDatabase
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['roleUsers'], 'readonly')
      const store = transaction.objectStore('roleUsers')
      const userIdIndex = store.index('userId') // Corrected from 'emailIndex' to 'userIdIndex'
      const request = userIdIndex.get(userId) // Fetch record by userId

      request.onsuccess = function () {
        if (request.result) {
          resolve(request.result) // Return the full record if found
        } else {
          resolve(undefined) // Explicitly resolve undefined if no record is found
        }
      }

      request.onerror = function () {
        reject(new Error('Error fetching roleUser by userId'))
      }

      transaction.oncomplete = function () {
        db.close()
      }
    })
  } catch (error) {
    throw new Error('Database initialization failed: ' + error)
  }
}

export async function getAllProjectsByUserId(userId: number) {
  try {
    const db = (await initDB()) as IDBDatabase
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['userProjects', 'projects'], 'readonly')
      const userProjectStore = transaction.objectStore('userProjects')
      const projectStore = transaction.objectStore('projects')
      const userIdIndex = userProjectStore.index('userId')
      const userProjectsRequest = userIdIndex.getAll(userId) // Get all userProjects for the userId

      userProjectsRequest.onsuccess = function () {
        const userProjects = userProjectsRequest.result // Array of userProjects

        if (!userProjects || userProjects.length === 0) {
          resolve([]) // No projects found for this user
          return
        }

        // Extract projectIds
        const projectIds = userProjects.map((up) => up.projectId)

        // Fetch all projects matching the projectIds
        const projectRequests = projectIds.map((projectId) => projectStore.get(projectId))
        const projects = []

        let completedRequests = 0
        projectRequests.forEach((request, index) => {
          const userProject = userProjects[index]

          request.onsuccess = function () {
            if (request.result) {
              const data = {
                ...request.result,
                projectId: userProject?.projectId,
                userId: userProject?.userId,
                roleProject: userProject?.role
              }

              projects.push(data) // Add project if found
            }
            completedRequests++
            if (completedRequests === projectRequests.length) {
              resolve(projects) // Resolve with all fetched projects
            }
          }
          request.onerror = function () {
            reject(new Error(`Error fetching project with ID ${projectIds[index]}`))
          }
        })
      }

      userProjectsRequest.onerror = function () {
        reject(new Error('Error fetching userProjects by userId'))
      }

      transaction.oncomplete = function () {
        db.close()
      }
    })
  } catch (error) {
    throw new Error('Database initialization failed: ' + error)
  }
}

export async function getRecordsByIds(storeName: string, ids: number[]) {
  try {
    const db = (await initDB()) as IDBDatabase
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const requests = ids.map((id) => store.get(id))
      const results: any[] = []

      let completed = 0
      requests.forEach((request, index) => {
        request.onsuccess = function () {
          if (request.result) {
            results[index] = request.result
          }
          completed++
          if (completed === requests.length) {
            resolve(results.filter(Boolean)) // Filter out undefined values
          }
        }
        request.onerror = function () {
          reject(new Error(`Error fetching record with ID ${ids[index]} from ${storeName}`))
        }
      })

      transaction.oncomplete = function () {
        db.close()
      }
    })
  } catch (error) {
    throw new Error(`Database initialization failed: ${error}`)
  }
}

export async function getProjectDetailWithRoles(projectId: number, requesterUserId: number) {
  try {
    const db = (await initDB()) as IDBDatabase
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['projects', 'userProjects'], 'readonly')
      const projectStore = transaction.objectStore('projects')
      const userProjectStore = transaction.objectStore('userProjects')
      const projectIdIndex = userProjectStore.index('projectId')

      // Fetch project details
      const projectRequest = projectStore.get(projectId)
      // Fetch userProject roles
      const userProjectsRequest = projectIdIndex.getAll(projectId)

      let projectDetail = null
      let userProjectRoles = []

      projectRequest.onsuccess = async function () {
        projectDetail = projectRequest.result
        if (!projectDetail) {
          resolve(null)
          return
        }
      }

      userProjectsRequest.onsuccess = function () {
        userProjectRoles = userProjectsRequest.result
      }

      userProjectsRequest.onsuccess = async function () {
        userProjectRoles = userProjectsRequest.result
        // Fetch emails for each userId in userRoles
        const userPromises = userProjectRoles.map((role) => getUserById(role.userId))
        const users: any = await Promise.all(userPromises)

        // Combine user details with roles
        userProjectRoles = userProjectRoles.map((role) => ({
          ...role,
          email: users?.find((user) => user?.id === role?.userId)?.email
        }))

        // Find requester's role
        const requesterRole = userProjectRoles.find((role) => role.userId === requesterUserId)?.role || 'N/A'

        // Fetch additional records
        const datasets = await getRecordsByIds('dataSets', projectDetail.datasets || [])
        const rawData = await getRecordsByIds('dataRaws', projectDetail.rawData || [])
        const model = await getRecordsByIds('modelVersions', projectDetail.model || [])

        projectDetail = {
          ...projectDetail,
          datasets,
          rawData,
          model
        }

        resolve({
          project: projectDetail,
          userRoles: userProjectRoles,
          requesterRole: requesterRole
        })
      }

      transaction.onerror = function () {
        reject(new Error(`Error fetching project details or roles for projectId ${projectId}`))
      }
    })
  } catch (error) {
    throw new Error('Database initialization failed: ' + error)
  }
}

export async function updateDataset(datasetId: number, isLocked: boolean) {
  try {
    const db = (await initDB()) as IDBDatabase
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['dataSets'], 'readwrite')
      const dataSetStore = transaction.objectStore('dataSets')
      // Get the existing dataset by ID
      const request = dataSetStore.get(datasetId)

      request.onsuccess = function () {
        const dataset = request.result

        if (!dataset) {
          reject(new Error(`Dataset with ID ${datasetId} not found`))
          return
        }

        // Update the is_locked field
        dataset.is_locked = isLocked

        // Put the updated dataset back into the store
        const updateRequest = dataSetStore.put(dataset)

        updateRequest.onsuccess = function () {
          resolve(dataset) // Resolve with the updated dataset
        }

        updateRequest.onerror = function () {
          reject(new Error('Failed to update dataset'))
        }
      }

      request.onerror = function () {
        reject(new Error('Failed to retrieve dataset'))
      }

      // Handle transaction errors
      transaction.onerror = function () {
        reject(new Error('Transaction failed'))
      }
    })
  } catch (error) {
    throw new Error(`Database initialization failed: ${error}`)
  }
}

export async function moveDataRawToDataSet(dataRawId: number, projectId: number) {
  const db = (await initDB()) as IDBDatabase

  return new Promise((resolve, reject) => {
    // Start a readwrite transaction for all relevant stores
    const transaction = db.transaction(['dataRaws', 'dataSets', 'projects'], 'readwrite')
    const dataRawStore = transaction.objectStore('dataRaws')
    const dataSetStore = transaction.objectStore('dataSets')
    const projectStore = transaction.objectStore('projects')

    // Step 1: Get the data from dataRaws
    const getDataRawRequest = dataRawStore.get(dataRawId)

    getDataRawRequest.onsuccess = () => {
      const dataRaw = getDataRawRequest.result

      if (!dataRaw) {
        reject(new Error(`No data found with id ${dataRawId} in dataRaws`))
        return
      }

      // Step 2: Prepare and add to dataSets
      const dataRawAdd = {
        name: dataRaw?.name,
        description: dataRaw?.description,
        is_locked: false,
        tags: null,
        createdAt: new Date()
      }

      const addRequest = dataSetStore.add(dataRawAdd)

      addRequest.onsuccess = () => {
        const newDataSetId = addRequest.result

        // Step 3: Update the project's datasets array
        const getProjectRequest = projectStore.get(projectId)

        getProjectRequest.onsuccess = () => {
          const project = getProjectRequest.result

          if (!project) {
            reject(new Error(`No project found with id ${projectId}`))
            return
          }

          // Update the datasets array
          const updatedProject = {
            ...project,
            datasets: [...(project.datasets || []), newDataSetId],
            updated_at: new Date() // Update timestamp
          }

          const updateProjectRequest = projectStore.put(updatedProject)

          updateProjectRequest.onsuccess = () => {
            // Step 4: Remove from dataRaws
            const deleteRequest = dataRawStore.delete(dataRawId)

            deleteRequest.onsuccess = () => {
              resolve({
                message: `Successfully moved data with id ${dataRawId} to dataSets and updated project ${projectId}`,
                newId: newDataSetId
              })
            }

            deleteRequest.onerror = () => {
              console.error('Delete from dataRaws failed')
              reject(new Error('Failed to delete from dataRaws'))
            }
          }

          updateProjectRequest.onerror = () => {
            console.error('Update project failed:', updateProjectRequest.error)
            reject(new Error('Failed to update project datasets'))
          }
        }

        getProjectRequest.onerror = () => {
          console.error('Get project failed:', getProjectRequest.error)
          reject(new Error('Failed to get project data'))
        }
      }

      addRequest.onerror = () => {
        console.error('Add to dataSets failed:', addRequest.error)
        reject(new Error(`Failed to add to dataSets: ${addRequest.error?.message}`))
      }
    }

    getDataRawRequest.onerror = () => {
      console.error('Get from dataRaws failed:', getDataRawRequest.error)
      reject(new Error('Failed to get data from dataRaws'))
    }

    transaction.oncomplete = () => {
      console.log('Transaction completed successfully')
    }

    transaction.onerror = () => {
      console.error('Transaction failed:', transaction.error)
      reject(new Error(`Transaction failed: ${transaction.error?.message}`))
    }

    transaction.onabort = () => {
      console.error('Transaction aborted:', transaction.error)
      reject(new Error('Transaction aborted'))
    }
  })
}
