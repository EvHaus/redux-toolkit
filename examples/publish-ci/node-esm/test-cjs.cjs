const assert = require('node:assert')
const path = require('path')

const { createSlice } = require('@reduxjs/toolkit')
const { createApi: createApiPlain } = require('@reduxjs/toolkit/query')
const { createApi: createApiReact } = require('@reduxjs/toolkit/query/react')

console.log('Testing Node with CJS imports...')

function checkFunctionName(fn, name, category) {
  console.log(`Checking ${category} '${name}' === '${fn.name}'`)
  assert(
    fn.name === name,
    `${category} \`${name}\` did not import correctly (name: '${fn.name}')`
  )
}

const entries = [
  [createSlice, 'createSlice', 'Core'],
  [createApiPlain, 'baseCreateApi', 'RTKQ core'],
  [createApiReact, 'baseCreateApi', 'RTKQ React'],
]

for (let [fn, name, category] of entries) {
  try {
    checkFunctionName(fn, name, category)
  } catch (error) {
    console.error(error)
  }
}

const moduleNames = [
  ['@reduxjs/toolkit', 'dist/cjs/index.js'],
  ['@reduxjs/toolkit/query', 'dist/query/cjs/index.js'],
  ['@reduxjs/toolkit/query/react', 'dist/query/react/cjs/index.js'],
]

for (let [moduleName, expectedFilename] of moduleNames) {
  const modulePath = require.resolve(moduleName)
  const posixPath = modulePath.split(path.sep).join(path.posix.sep)
  console.log(`Module: ${moduleName}, path: ${posixPath}`)
  assert(posixPath.endsWith(expectedFilename))
}

console.log('CJS test succeeded')
