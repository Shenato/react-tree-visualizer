import React from 'react';
import { ComputedOptions } from '../types';

type ConnectorProps = {
  id: number;
  previousMatchPosition: { x: number; y: number };
  currentMatchPosition: { x: number; y: number };
  calculatedStyle: ComputedOptions;
  isHighlighted: boolean;
  isActive: boolean;
  // eslint-disable-next-line react/require-default-props
  offsetY?: number;
};

const Connector = ({
  id,
  previousMatchPosition,
  currentMatchPosition,
  calculatedStyle,
  isHighlighted,
  isActive,
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
    connectorColorActive,
    connectorLineThickness,
    width,
  } = calculatedStyle;
  const halfConnectorLineThickness = Math.floor(connectorLineThickness / 2);
  const halfBoxHeight = Math.floor(boxHeight / 2);
  const halfRoundSeperatorWidth = Math.floor(roundSeparatorWidth / 2);
  const middlePointOfMatchComponent =
    halfBoxHeight - halfConnectorLineThickness;

  const getCoords = () => {
    const previousMatch = previousMatchPosition;
    const startPointX =
      previousMatch.x + width + horizontalOffset + lineInfo.separation;
    const startPointY =
      previousMatch.y +
      lineInfo.homeVisitorSpread +
      middlePointOfMatchComponent +
      (roundHeader.isShown ? roundHeader.height + roundHeader.marginBottom : 0);

    const halfHorizontalWidth =
      currentMatchPosition.x -
      halfRoundSeperatorWidth -
      horizontalOffset -
      startPointX;

    const verticalHeight = currentMatchPosition.y - previousMatch.y + offsetY;

    const isPreviousMatchOnSameYLevel =
      Math.abs(currentMatchPosition.y - previousMatch.y) < 1;
    // if (isPreviousMatchOnSameYLevel) {
    //   return [`M${startPoint}`, `H${horizontalWidthRight}`];
    // }

    // return [
    //   `M${startPoint}`,
    //   `H${horizontalWidthLeft}`,
    //   `V${verticalHeight}`,
    //   `H${horizontalWidthRight}`,
    // ];
    return {
      startPointX,
      startPointY,
      halfHorizontalWidth,
      verticalHeight,

      isConnectorStraight: isPreviousMatchOnSameYLevel,
    };
  };

  function getColor() {
    if (isHighlighted) {
      return connectorColorHighlight;
    }
    if (isActive) {
      return connectorColorActive;
    }
    return connectorColor;
  }

  const {
    startPointX,
    startPointY,
    isConnectorStraight,
    halfHorizontalWidth,
    verticalHeight,
  } = getCoords();

  if (isConnectorStraight) {
    return (
      <g id={`connector-${id}`}>
        <rect
          x={startPointX}
          y={startPointY}
          height={connectorLineThickness}
          width={halfHorizontalWidth * 2}
          fill={getColor()}
        />
      </g>
    );
  }
  return (
    <g id={`connector-${id}`}>
      <rect
        x={startPointX}
        y={startPointY}
        height={connectorLineThickness}
        width={halfHorizontalWidth}
        fill={getColor()}
      />
      <rect
        x={startPointX + halfHorizontalWidth - halfConnectorLineThickness}
        y={startPointY}
        width={connectorLineThickness}
        height={verticalHeight}
        fill={getColor()}
      />
      <rect
        x={startPointX + halfHorizontalWidth - halfConnectorLineThickness}
        y={startPointY + verticalHeight}
        height={connectorLineThickness}
        width={halfHorizontalWidth + halfConnectorLineThickness}
        fill={getColor()}
      />
    </g>
  );
};
export default Connector;
