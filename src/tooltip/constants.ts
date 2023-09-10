import { TooltipAlignT } from './types';

export const ALIGN_MAP: Record<
  TooltipAlignT,
  { xPos?: number; yPos?: number; withCaretPos?: number }
> = {
  start: { xPos: 1, yPos: 0 },
  center: { xPos: 2, yPos: 0 },
  end: { xPos: 3, yPos: 0 },
  above: { xPos: 0, yPos: 1 },
  below: { xPos: 0, yPos: 2 },
  startAbove: { xPos: 1, yPos: 1 },
  startBelow: { xPos: 1, yPos: 2 },
  centerAbove: { xPos: 2, yPos: 1 },
  centerBelow: { xPos: 2, yPos: 2 },
  endAbove: { xPos: 3, yPos: 1 },
  endBelow: { xPos: 3, yPos: 2 }
};
