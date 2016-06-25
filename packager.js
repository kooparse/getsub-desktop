import 'babel-polyfill'
import packager from 'electron-packager'
import {exec} from 'child_process'
import del from 'del'
import pkg from './package.json'

const platforms = ['darwin', 'linux', 'win32']
const options = {
  dir: './',
  name: 'Getsub',
  arch: 'x64',
  asar: false,
  prune: true,
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
  for (let platform of platforms) {
    await pack(platform)
  }

  console.log('Finished!')
}

const buildAll = async () => {
  return await new Promise((resolve, reject) => {
    exec('npm run build', (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

const pack = async (platform) => {
  return await new Promise((resolve, reject) => {
    packager({
      ...options,
      platform,
      out: `dist/release/${platform}`
    }, (err) => {
      if (err) reject(err)
      else resolve()
    })

  })
}

init()
