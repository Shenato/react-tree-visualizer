import React, { useContext } from 'react';
import { ComputedOptions, ItemComponentProps, RenderItem } from '../types';

import { calculatePositionOfItem } from './calculate-treeItem-position';
import Connector from './connector';
import {
  itemContext,
  useIsCollapsed,
  useItemHighlightContext,
} from './item-context';

export function ItemWrapper<T>({
  columnIndex,
  item,
  renderData,
  calculatedStyle,

  itemComponent: ItemComponent,
}: {
  columnIndex: number;
  item: RenderItem<T>;
  renderData: RenderItem<T>[][];
  calculatedStyle: ComputedOptions;

  itemComponent: (props: ItemComponentProps<T>) => JSX.Element;
}) {
  const { roundHeader, columnWidth, canvasPadding, rowHeight } =
    calculatedStyle;
  const itemPosition = calculatePositionOfItem(
    { x: columnIndex, y: item.y },
    {
      canvasPadding,
      columnWidth,
      rowHeight,
    }
  );
  // Parent shenanigans
  const previousColumn = columnIndex > 0 ? renderData[columnIndex - 1] : null;

  const parent = previousColumn?.find(pParent => item.parentId === pParent.id);

  const parentPosition = parent
    ? calculatePositionOfItem(
        { x: columnIndex - 1, y: parent.y },
        {
          canvasPadding,
          columnWidth,
          rowHeight,
        }
      )
    : null;

  // Highlight Context
  const { dispatch } = useContext(itemContext);

  const isHighlighted = useItemHighlightContext({ currentItem: item });
  const isCollapsed = useIsCollapsed({ currentItem: item });

  const onMouseEnter = () => {
    if (isHighlighted) return;
    dispatch({
      type: 'SET_HOVERED',
      payload: {
        currentHoveredItem: item,
        hoveredColumnIndex: columnIndex,
      },
    });
  };

  const onMouseMove = () => {
    if (isHighlighted) return;
    dispatch({
      type: 'SET_HOVERED',
      payload: {
        currentHoveredItem: item,
        hoveredColumnIndex: columnIndex,
      },
    });
  };

  const onMouseLeave = () => {
    dispatch({ type: 'SET_BLURRED' });
  };

  const toggleCollapse = () => {
    dispatch({
      type: 'TOGGLE_COLLAPSE',
      payload: {
        currentItem: item,
      },
    });
  };
  const { width = 300, boxHeight = 70, connectorColor } = calculatedStyle;

  return (
    <>
      {parentPosition && (
        <Connector
          id={item.id}
          isHighlighted={isHighlighted}
          previousMatchPosition={parentPosition}
          currentMatchPosition={itemPosition}
          calculatedStyle={calculatedStyle}
        />
      )}
      <g>
        <svg
          width={width}
          height={boxHeight}
          viewBox={`0 0 ${width} ${boxHeight}`}
          x={itemPosition.x}
          y={
            itemPosition.y +
            (roundHeader.isShown
              ? roundHeader.height + roundHeader.marginBottom
              : 0)
          }
        >
          <foreignObject x={0} y={0} width={width} height={boxHeight}>
            {ItemComponent ? (
              <ItemComponent
                {...{
                  item: item.data,
                  isHighlighted,
                  isCollapsed,
                  connectorColor,
                  computedStyles: calculatedStyle,
                  onMouseEnter,
                  onMouseMove,
                  onMouseLeave,
                  toggleCollapse,
                }}
              />
            ) : null}
          </foreignObject>
        </svg>
      </g>
    </>
  );
}
