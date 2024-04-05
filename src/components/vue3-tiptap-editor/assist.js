export const convertToTiptap = (string) => { // call this function when you want to convert pure HTML to tiptap format
  if (string === null || typeof string === 'undefined') {
    return ''
  }
  string = string.replaceAll('¬', '&#8202;')
  string = string.replaceAll('­', '&#8202;')
  return string
}

export const convertImage = (string) => {
  if (typeof window === 'undefined') {
    return string
  }
  const wrapper = document.createElement('div')
  wrapper.innerHTML = string
  const imagesParent = wrapper.querySelectorAll('span img')
  imagesParent.forEach(item => {
    let imageHTML = item.attributes[0].nodeValue
    if (imageHTML) {
      let marginBottom = 0
      if (item.style.top) {
        marginBottom = item.style.top.slice(0, -2)
      }
      imageHTML =
                '<img ' +
                'src="' + item.attributes.src.nodeValue + '" ' +
                'width="' + item.attributes.width.nodeValue + '" ' +
                'height="' + item.attributes.height.nodeValue + '" ' +
                'data-vertical="' + marginBottom + '"  alt=""' +
                '></img>'
      const imageWrapper = document.createElement('span')
      imageWrapper.innerHTML = imageHTML
      item.parentElement.replaceWith(imageWrapper.children[0])
    }
  })
  return wrapper.innerHTML
}
export const convertBareHtml = (string) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = string
  const doms = wrapper.querySelectorAll('div.barehtml')
  doms.forEach((item, itemIndex) => {
    const domItem = item.attributes[0].nodeValue
    const dataAttr = item.attributes.data
    if (domItem && dataAttr) {
      const domWrapper = document.createElement('div')
      domWrapper.innerHTML = item.attributes.data.nodeValue
      domWrapper.classList.add('barehtml')
      doms[itemIndex].replaceWith(domWrapper)
    }
  })
  return wrapper.innerHTML
}
