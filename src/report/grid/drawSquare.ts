



let boxStyles = {
	"single": {
		"topLeft": "┌",
		"top": "─",
		"topRight": "┐",
		"right": "│",
		"bottomRight": "┘",
		"bottom": "─",
		"bottomLeft": "└",
		"left": "│",
    "horizontal": ' ',
    "vertical": ' ',
	},
	"double": {
		"topLeft": "╔",
		"top": "═",
		"topRight": "╗",
		"right": "║",
		"bottomRight": "╝",
		"bottom": "═",
		"bottomLeft": "╚",
		"left": "║"
	},
	"round": {
		"topLeft": "╭",
		"top": "─",
		"topRight": "╮",
		"right": "│",
		"bottomRight": "╯",
		"bottom": "─",
		"bottomLeft": "╰",
		"left": "│"
	},
	"bold": {
		"topLeft": "┏",
		"top": "━",
		"topRight": "┓",
		"right": "┃",
		"bottomRight": "┛",
		"bottom": "━",
		"bottomLeft": "┗",
		"left": "┃"
	},
	"singleDouble": {
		"topLeft": "╓",
		"top": "─",
		"topRight": "╖",
		"right": "║",
		"bottomRight": "╜",
		"bottom": "─",
		"bottomLeft": "╙",
		"left": "║"
	},
	"doubleSingle": {
		"topLeft": "╒",
		"top": "═",
		"topRight": "╕",
		"right": "│",
		"bottomRight": "╛",
		"bottom": "═",
		"bottomLeft": "╘",
		"left": "│"
	},
	"classic": {
		"topLeft": "+",
		"top": "-",
		"topRight": "+",
		"right": "|",
		"bottomRight": "+",
		"bottom": "-",
		"bottomLeft": "+",
		"left": "|"
	},
	"arrow": {
		"topLeft": "↘",
		"top": "↓",
		"topRight": "↙",
		"right": "←",
		"bottomRight": "↖",
		"bottom": "↑",
		"bottomLeft": "↗",
		"left": "→"
	}
}

import { SquareColorType,SquareStyleType } from '@app/types';

export default (
  name: string,
  styleName: SquareStyleType = 'single',
  color: SquareColorType = null,
): string => {
  const size = 6;
  const body =  name;

  let style = boxStyles.single;



  let square = [];

  square.push(style.topLeft + style.horizontal.repeat(size - 2) + style.topRight);
  square.push(style.vertical + body + style.vertical);
  square.push(style.bottomLeft + style.horizontal.repeat(size - 2) + style.bottomRight);

  let ressquare = square.join('\n').toString();



  return ressquare;
};
