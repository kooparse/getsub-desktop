import 'babel-polyfill'
import packager from 'electron-packager'
import {createWindowsInstaller} from 'electron-winstaller'
import appdmg from 'appdmg'
import {exec} from 'child_process'
import del from 'del'
import pkg from './package.json'

const platforms = ['darwin', 'win32']
const options = {
  dir: './',
  name: 'getsub',
  asar: false,
  prune: true,
  icon: './statics/icon',
  'version-string': {
    OriginalFilename: 'getsub.exe',
    FileDescription: 'A better way to find your subtitles!',
    ProductName: 'Getsub'
  },
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
    let arch = platform === 'darwin' ? 'x64' : 'ia32'
    packager({
      ...options,
      arch,
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
        {x: 122, y: 240, type: 'file', path: 'Getsub.app'},
        {x: 380, y: 240, type: 'link', path: '/Applications'},
        {x: 50, y: 500, type: 'position', path: '.background'},
        {x: 100, y: 500, type: 'position', path: '.DS_Store'},
        {x: 150, y: 500, type: 'position', path: '.Trashes'},
        {x: 200, y: 500, type: 'position', path: '.VolumeIcon.icns'}
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
    noMsi: true,
    setupIcon: './statics/icon.ico',
    setupExe: 'setup-getsub.exe',
    exe: 'getsub.exe'
  })
  .then(cb)
  .catch(cb)
}

init()
