import 'babel-polyfill'
import packager from 'electron-packager'
import {exec} from 'child_process'
import del from 'del'
import pkg from './package.json'

const options = {
  dir: './',
  name: 'Getsub',
  arch: 'x64',
  platform: 'all',
  asar: false,
  prune: true,
  out: 'dist/release',
  ignore: [
    '^/test($|/)',
    '^/tools($|/)',
    '^/release($|/)',
    '^/main($|/)',
    '^/renderer($|/)',
    '^/webpack(.*)',
    ...Object.keys(pkg.devDependencies).map(name => `/node_modules/${name}($|/)`)
  ]
}

const init = async () => {
  console.log('Deleting folders...')
  await del('dist')

  console.log('Building main and renderer files...')
  await buildAll()

  console.log('Packaging...')
  await doPackage()

  console.log('DONE!')
}

const buildAll = async () => {
  return await new Promise((resolve, reject) => {
    exec('npm run build', (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

const doPackage = async () => {
  return await new Promise((resolve, reject) => {
    packager(options, (err) => {
      if (err) reject(err)
      else resolve()
    })

  })
}

init()
