import OS from 'opensubtitles'
import uuid from 'node-uuid'
const os = new OS()


/**
 * Init function
 *
 * @param {Object} File object containing our file path and name
 * @param {String} Search language filter
 * @param {Array} List of subtitles
 */
export default async (file, lang) => {
  const computedHash = await computeHash(file.path)
  const movieHash = await checkMovieHash([computedHash])
  const token = await login()
  let query = [{sublanguageid: lang, query: file.name}]

  let subtitles = (await searchSubtitles(token, query))
    .filter((subtitle) => {
      return subtitle.SubDownloadLink
        && subtitle.IDSubtitleFile
        && subtitle.SubFileName
        && subtitle.MovieReleaseName
    })
    .map((subtitle) => {
      /* we want to remove .zip ext to directly download .srt */
      let downloadLink = subtitle.SubDownloadLink
      downloadLink = downloadLink.substring(0, downloadLink.length - 3)

      return {
        provider: 'opensubtitle',
        id: uuid.v4(),
        subtitleName: subtitle.SubFileName,
        fileName: subtitle.MovieReleaseName,
        downloadLink
      }
    })

  return subtitles
}


/**
 * Bind opensubtitles computeHash method
 *
 * @param {String} File's path
 * @return {String} Computed hash string is returned
 */
const computeHash = async (path) => {
  return await new Promise((resolve, reject) => {
    os.computeHash(path, (err, size) => {
      if (err) reject(err)
      else resolve(size)
    })
  })
}


/**
 * Bind opensubtitles checkMovieHash method
 *
 * @param {Array} Array of files size
 * @return {Array} Array of object with file infos
 */
const checkMovieHash = async (sizes) => {
  return await new Promise ((resolve, reject) => {
    os.checkMovieHash(sizes, (err, res) => {
      if (err) reject(err)
      else resolve(res.data)
    })
  })
}


/**
 * Bind opensubtitles login method
 * With filtered response (only Token)
 *
 * @return {String} Token is returned
 */
const login = async () => {
  return new Promise((resolve, reject) => {
    os.api.LogIn((err, res) => {
      if (err) reject(err)
      else resolve(res.token)
    }, null, null, null, 'OSTestUserAgent')
  })
}


/**
 * Bind opensubtitles search for subtitles method
 *
 * @param {String} Token
 * @param {Array} Query (see http://bit.ly/22B0NX4)
 * @return {Array} List of subtitle objects
 */
const searchSubtitles = async (token, query) => {
  return new Promise((resolve, reject) => {
    os.api.SearchSubtitles((err, res) => {
      if (err) reject(err)
      else resolve(res.data)
    }, token, query)
  })
}
