const filterNewsContent = (content, len) => { // 新闻内容提取关键字
  let reg=/<\/?.+?\/?>/g
  let result = content.replace(reg, '')
  return result.substr(result, len)
}

export { filterNewsContent }