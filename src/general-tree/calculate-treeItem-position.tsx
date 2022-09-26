export const calculatePositionOfItem = (
  { x, y }: { x: number; y: number },
  { canvasPadding, rowHeight, columnWidth, offsetX = 0, offsetY = 0 }
) => {
  return {
    x: x * columnWidth + canvasPadding + offsetX,
    y: y * rowHeight + canvasPadding + offsetY,
  };
};
