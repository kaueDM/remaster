const camelize = str => {
  return str
    .replace(/(-|_|\.|\s)+(.)?/g, (match, separator, chr) => chr ? chr.toUpperCase() : '')
    .replace(/(^|\/)([A-Z])/g, match => match.toLowerCase())
}

const decamelize = str => str.replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase()

export const generateType = (type, prefix) => `${prefix}/SET_${decamelize(type).toUpperCase()}`

export const generateField = field => camelize(field.split('set_')[1])
