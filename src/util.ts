export const pad_text = (cell_text, length, alignment, capitalize = false) => {

    cell_text = cell_text instanceof Object
      ? JSON.stringify(cell_text)
      : String(cell_text)
  
    if (capitalize) {
      cell_text = cell_text
        .slice(0, 1)
        .toUpperCase() + cell_text.slice(1)
    }
  
    const padding = ' '.repeat(length - cell_text.length)
  
    if (alignment === 'l') {
      return cell_text + padding
    }
    if (alignment === 'r') {
      return padding + cell_text
    }
    if (alignment === 'c') {
      const paddingStart = ' '.repeat(padding.length / 2)
      const paddingEnd = ' '
        .repeat(padding.length - paddingStart.length)
      return paddingStart + cell_text + paddingEnd
    }
  
    // Default is left aligned
    return cell_text + padding
  }
  
export const get_key_length = (objects, initialValue) =>{
    return objects.reduce(
      (maxKeyLengths, object) => {
        Object.keys(initialValue)
          .forEach(key => {
            if (!object.hasOwnProperty(key)) {
              return
            }
            const keyString = object[key] instanceof Object
              ? JSON.stringify(object[key])
              : String(object[key])
  
            if (!maxKeyLengths[key]) {
              maxKeyLengths[key] = 0
            }
  
            if (keyString.length > maxKeyLengths[key]) {
              maxKeyLengths[key] = keyString.length
            }
          })
        return maxKeyLengths
      },
      initialValue
    )
  }

  export const header_from_keys = (data) =>{
    return Object.keys(
      data.reduce(
        (object, current) => {
          Object.keys(current)
            .forEach(key => object[key] = true)
          return object
        },
        {}
      )
    )
  }
  
   export const make_rows = (row, headers, border) =>{

    let rowstring = headers.map(fieldname => row[fieldname]).join(' ' + border + ' ').replace(/\s+$/, '');
    return rowstring; 
  }
  