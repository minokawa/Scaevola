
import type { CoordinateGridMemberType } from '@app/types';
export default (
  x: number,
  y: number,
  body: string,
): CoordinateGridMemberType => {
  return {
    body,
    x,
    y,
  };
};
