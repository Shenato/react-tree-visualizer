import React from 'react';
import { ThemeProvider } from 'styled-components';

import { itemContext, useItemContext } from './item-context';
import { GeneralTreeProps } from '../types';
import { defaultStyle, getCalculatedStyles } from '../settings';
import { calculateSVGDimensions } from './calculate-svg-dimensions';

import defaultTheme from '../themes/themes';
import { Graph } from './graph';

const GeneralTreeBracket = <T,>({
  tree,
  itemComponent,
  currentRound,
  svgWrapper: SvgWrapper = ({ children }) => <div>{children}</div>,
  theme = defaultTheme,
  options: { style: inputStyle } = {
    style: defaultStyle,
  },
}: GeneralTreeProps<T>) => {
  const style = {
    ...defaultStyle,
    ...inputStyle,
    roundHeader: {
      ...defaultStyle.roundHeader,
      ...inputStyle.roundHeader,
    },
    lineInfo: {
      ...defaultStyle.lineInfo,
      ...inputStyle.lineInfo,
    },
  };

  const calculatedStyle = getCalculatedStyles(style);

  const { roundHeader, columnWidth, canvasPadding, rowHeight } =
    calculatedStyle;

  // [
  //   [ First column ]
  //   [ 2nd column ]
  //   [ 3rd column ]
  //   [ lastGame ]
  // ]

  const [state, dispatch] = useItemContext(tree);
  const { renderData } = state;

  const maxNumRows = renderData.reduce((biggestColumnNum, columns) => {
    const currentBiggestColumn = columns.reduce(
      (biggestYmultiplier, item) => Math.max(biggestYmultiplier, item.y),
      0
    );

    return Math.max(currentBiggestColumn, biggestColumnNum);
  }, 0);

  const maxNumColumns = renderData.length;
  const { gameWidth, gameHeight, startPosition } = calculateSVGDimensions(
    maxNumRows,
    maxNumColumns,
    rowHeight,
    columnWidth,
    canvasPadding,
    roundHeader,
    currentRound
  );

  return (
    <ThemeProvider theme={theme}>
      <SvgWrapper
        bracketWidth={gameWidth}
        bracketHeight={gameHeight}
        startAt={startPosition}
      >
        <svg
          height={gameHeight}
          width={gameWidth}
          viewBox={`0 0 ${gameWidth} ${gameHeight}`}
        >
          <itemContext.Provider value={{ state, dispatch }}>
            <Graph
              renderData={renderData}
              itemComponent={itemComponent}
              calculatedStyle={calculatedStyle}
            />
          </itemContext.Provider>
        </svg>
      </SvgWrapper>
    </ThemeProvider>
  );
};

export default GeneralTreeBracket;
