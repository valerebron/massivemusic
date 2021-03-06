export = cleanTitle

function cleanTitle(title) {
  const braketsRegex = /\[[^)]*\]/
  let forbidenTerms = ['(full album)', '(official ep)', '(official video)', '(video official)', '(radio edit)','(DEEP MEDi Musik)', '(Original Mix)', '(Official Music Video)', '(OUT NOW)']
  title = title.replace(braketsRegex, '')
  forbidenTerms.forEach(forbidenTerm => {
    title = title.replace(new RegExp(forbidenTerm, 'ig'), '')
    title = title.replace('()', '')
    title = title.replace(/\[(.*)\]/, '')
  })
  return title
}
