/* API(s) */
import opensubtitle from './opensubtitle'


/**
 * Getsub Search API
 *
 *
 * @param {Object} File object containing our file path and name
 * @param {String} Search language filter
 * @return {Object} Resulted search object (with subtitles list and origin names)
 */
export const search = async (file, lang) => {
  const subtitles = await opensubtitle(file, lang)

  return {
    subtitles,
    filePath: file.path,
    originName: file.name,
    originLang: lang
  }
}
