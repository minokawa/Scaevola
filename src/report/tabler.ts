import { pad_text,get_key_length,header_from_keys,make_rows } from "@app/util"
import { table_options } from "@app/types"


export default class Tabler {  
  protected headers;
  protected data;
  protected border;
  protected col_style;
  protected ucase_title;
  protected colwidths;
  protected caption;
  protected maxwidth;

  constructor (opts) {
  
    this.headers = header_from_keys(opts.data)
    this.colwidths = this.headers.reduce(
      (colwidths, field) => {
        colwidths[field] = String(field).length
        return colwidths
      },
      {}
    )
    this.maxwidth = get_key_length(opts.data, this.colwidths)
    this.data =  opts.data
    this.border =  opts.border
    this.col_style =  opts.col_style
    this.ucase_title =  opts.ucase_title
    this.caption =  opts.caption
  }

  get string () {

    let table_string = this.caption?`\n${this.caption}\n`:''

     //PAD HEAD CELLS
    const padded_cell = this.headers.map(field => {
      return pad_text(
        field,
        this.maxwidth[field],
        this.col_style[field],
        this.ucase_title
      )
    })
    const cell_border = ' ' + this.border + ' '

    //PAD BODY CELLS
    this.data = this.data.map(row => {
      this.headers.forEach(fieldname => {
        if (!row.hasOwnProperty(fieldname)) return
        row[fieldname] = pad_text(
          row[fieldname],
          this.maxwidth[fieldname],
          this.col_style[fieldname]
        )
      })
      return row
    })

    //THEAD
    table_string += padded_cell.join(cell_border).replace(/\s+$/, '')
    table_string += '\n'

    //SEPERATOR
    table_string += padded_cell.map((cell, index) => {
      let width = cell.length + 2
      if (index === 0 || index === cell.length - 1) width--
      let sep = '-'.repeat(width)
      return sep
    })
    .join(this.border)
    table_string += '\n'

    //TBODY
    table_string += this.data.map(row => make_rows(row,this.headers,this.border))
    .join('\n')

    return table_string + '\n'
  }

  display () {
    return this.string
  }
}
