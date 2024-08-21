
export interface INumberDict  {
  [index: string]: number;
}
//fix
export interface IObjectDict {
  [index: string]: any;
}

export type SquareColorType = null | 'green' | 'red' | 'yellow' | 'blue';
export type SquareStyleType = 'single-character' | 'single' | 'double' | 'borderless';

export type CoordinateGridMemberType = {
  body: string
  x: number
  y: number
};


export interface chart_options {
  minHeight?: any;
  pattern?: any;
  type?: any;
  spaced?: any;
  showLabels?: any;
  hideLabels?: any;
}

export interface table_options {
  caption:string;
  data:[]|[][];
  style:string;
  alignments:object;
  capitalizeHeaders:boolean;
  headerTexts:string;
}

