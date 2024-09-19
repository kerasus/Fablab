export default function setFavicon(title, folderName) {
  return ({ next }) => {
    if (typeof window !== 'undefined') {
      window.document.title = title
      window.document.getElementById('favicon').setAttribute('href', `/icons/${folderName}/favicon.ico`)
      window.document.getElementById('favicon16png').setAttribute('href', `/icons/${folderName}/favicon-16x16.png`)
      window.document.getElementById('favicon32png').setAttribute('href', `/icons/${folderName}/favicon-32x32.png`)
    }
    return next()
  }
}
