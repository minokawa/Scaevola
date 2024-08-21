
import type {
  CoordinateGridMemberType,
} from '@app/types';


const append = (a: string, b: string): string => {
  const tailTokens = b.split('\n');

  const lines = a.split('\n');

  let index = 0;

  for (const tailToken of tailTokens) {
    index++;

    lines[lines.length - (tailTokens.length - index + 1)] += tailToken;
  }

  return lines.join('\n');
};
 
const findCoordinateSquare = (x: number, y: number) => {
  return (coordinateSquare:CoordinateGridMemberType) => {
    return coordinateSquare.x === x && coordinateSquare.y === y;
  };
};

const drawEmptySquare = () => {
  return [
    ' '.repeat(6),
    ' '.repeat(6),
    ' '.repeat(6),
  ].join('\n');
};

export default (coordinateGridMembers: ReadonlyArray<CoordinateGridMemberType>, emptySquare: string = drawEmptySquare()): string => {
  let maxX = 0;
  let maxY = 0;

  for (const coordinateGridMember of coordinateGridMembers) {
    if (maxX < coordinateGridMember.x) {
      maxX = coordinateGridMember.x;
    }

    if (maxY < coordinateGridMember.y) {
      maxY = coordinateGridMember.y;
    }
  }

  let currentY = 0;

  let text = '\n'.repeat(emptySquare.split('\n').length + 1);

  while (currentY <= maxY) {
    let currentX = 0;

    while (currentX <= maxX) {
      const coordinateGridMember = coordinateGridMembers.find(findCoordinateSquare(currentX, currentY));

      if (coordinateGridMember) {
        text = append(text, coordinateGridMember.body);
      } else {
        text = append(text, emptySquare);
      }

      currentX++;
    }

    text += '\n'.repeat(emptySquare.split('\n').length);

    currentY++;
  }

  return text
    .replace(/^\n\n/, '')
    .replace(/\s+$/, '');
};
