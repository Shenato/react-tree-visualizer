import React from 'react';

type ConnectorProps = {
  id: number;
  previousMatchPosition: { x: number; y: number };
  currentMatchPosition: { x: number; y: number };
  calculatedStyle: any;
  isHighlighted: boolean;
  // eslint-disable-next-line react/require-default-props
  offsetY?: number;
};

const Connector = ({
  id,
  previousMatchPosition,
  currentMatchPosition,
  calculatedStyle,
  isHighlighted,
  offsetY = 0,
}: ConnectorProps) => {
  const {
    boxHeight,
    connectorColor,
    roundHeader,
    roundSeparatorWidth,
    lineInfo,
    horizontalOffset,
    connectorColorHighlight,
    width,
  } = calculatedStyle;

  const pathInfo = () => {
    const middlePointOfMatchComponent = boxHeight / 2;
    const previousMatch = previousMatchPosition;
    const startPoint = `${
      currentMatchPosition.x - horizontalOffset - lineInfo.separation
    } ${
      currentMatchPosition.y +
      lineInfo.homeVisitorSpread +
      middlePointOfMatchComponent +
      (roundHeader.isShown ? roundHeader.height + roundHeader.marginBottom : 0)
    }`;
    const horizontalWidthLeft =
      currentMatchPosition.x - roundSeparatorWidth / 2 - horizontalOffset;
    const isPreviousMatchOnSameYLevel =
      Math.abs(currentMatchPosition.y - previousMatch.y) < 1;

    const verticalHeight =
      previousMatch.y +
      middlePointOfMatchComponent +
      offsetY +
      (roundHeader.isShown ? roundHeader.height + roundHeader.marginBottom : 0);
    const horizontalWidthRight = previousMatch.x + width;

    if (isPreviousMatchOnSameYLevel) {
      return [`M${startPoint}`, `H${horizontalWidthRight}`];
    }

    return [
      `M${startPoint}`,
      `H${horizontalWidthLeft}`,
      `V${verticalHeight}`,
      `H${horizontalWidthRight}`,
    ];
  };

  return (
    <>
      <path
        d={pathInfo().join(' ')}
        id={`connector-${id}`}
        fill="transparent"
        stroke={isHighlighted ? connectorColorHighlight : connectorColor}
      />
    </>
  );
};
export default Connector;
