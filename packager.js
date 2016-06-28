import 'babel-polyfill'
import packager from 'electron-packager'
import {createWindowsInstaller} from 'electron-winstaller'
import appdmg from 'appdmg'
import {exec} from 'child_process'
import del from 'del'
import pkg from './package.json'

const platforms = ['darwin', 'linux', 'win32']
const options = {
  dir: './',
  name: 'getsub',
  arch: 'x64',
  asar: false,
  prune: true,
  icon: './statics/icon',
  ignore: [
    '^/release($|/)',
    '^/main($|/)',
    '^/renderer($|/)',
    '^/statics($|/)',
    '^/webpack(.*)',
    ...Object.keys(pkg.devDependencies).map(name => `/node_modules/${name}($|/)`)
  ]
}

const init = async () => {
  console.log('Deleting folders...')
  await del(['dist', 'release'])

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
      out: `release/${platform}`
    }, (err, buildPath) => {
      if (err) {
        reject(err)
      } else if (platform === 'darwin') {
        createDmg(buildPath, (err) => {
          if (err) reject(err)
          else resolve()
        })
      } else if (platform === 'win32') {
        createInstaller(buildPath, (err) => {
          if (err) reject(err)
          else resolve()
        })
      } else {
        resolve()
      }
    })

  })
}

const createDmg = (buildPath, cb) => {
  const dmgOpt = {
    target: 'release/darwin/getsub.dmg',
    basepath: buildPath[0],
    specification: {
      title: 'Getsub',
      contents: [
        {x: 122, y: 240, type: 'file', path: 'getsub.app'},
        {x: 380, y: 240, type: 'link', path: '/Applications'},
      ]
    }
  }
  const dmg = appdmg(dmgOpt)
  dmg.once('error', (err) => cb(err))
  dmg.once('finish', () => cb(null))
}

const createInstaller = (buildPath, cb) => {
  createWindowsInstaller({
    appDirectory: buildPath[0],
    outputDirectory: 'release/win32',
    authors: 'Alexandre',
    title: 'Getsub',
    setupExe: 'setup-getsub.exe',
    exe: 'getsub.exe'
  })
  .then(cb)
  .catch(cb)
}

init()
