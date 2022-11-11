import React, { ReactElement } from 'react';

export type Theme = {
  fontFamily: string;

  transitionTimingFunction: string;

  disabledColor: string;

  matchBackground: {
    wonColor: string;
    lostColor: string;
  };

  border: {
    color: string;
    highlightedColor: string;
  };

  textColor: {
    highlighted: string;
    main: string;
    dark: string;
    disabled: string;
  };

  score: {
    text: {
      highlightedWonColor: string;
      highlightedLostColor: string;
    };
    background: {
      wonColor: string;
      lostColor: string;
    };
  };

  canvasBackground: string;
};

export type Options = {
  width?: number;

  boxHeight?: number;

  canvasPadding?: number;

  spaceBetweenColumns?: number;

  spaceBetweenRows?: number;

  connectorColor?: string;

  connectorColorHighlight?: string;

  connectorColorActive?: string;

  connectorLineThickness?: number;

  roundHeader?: {
    isShown?: boolean;
    height?: number;
    marginBottom?: number;
    fontSize?: number;
    fontColor?: string;
    backgroundColor?: string;
    fontFamily?: string;
  };

  roundSeparatorWidth?: number;

  lineInfo?: {
    separation?: number;
    homeVisitorSpread?: number;
  };

  horizontalOffset?: number;

  wonBywalkOverText?: string;

  lostByNoShowText?: string;
};

export type ComputedOptions = Options & {
  rowHeight?: number;

  columnWidth?: number;
};

export type CommonTreeProps = {
  svgWrapper?: (props: {
    bracketWidth: number;
    bracketHeight: number;
    startAt: number[];
    children: ReactElement;
  }) => React.ReactElement;

  theme?: Theme;

  options?: { style: Options };
};

export type RenderItem<T> = {
  id: number;
  uniqueId: string;
  parentId?: number;
  parentUniqueId: string;
  y: number;
  path: number[];
  data: T;
};

export type RenderMatrix<T> = RenderItem<T>[][];

export type Tree<T> = { id: string; data: T; children: Tree<T>[] };

export type ItemComponentProps<T> = {
  item: T;
  isHighlighted: boolean;
  isActive: boolean;
  isCollapsed: boolean;
  connectorColor: string;
  computedStyles: ComputedOptions;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  toggleCollapse: () => void;
};

export type GeneralTreeProps<T> = CommonTreeProps & {
  itemComponent: (props: ItemComponentProps<T>) => JSX.Element;
  activeItemIds?: string[];
  currentRound?: string;
  tree: Tree<T>;
};

export type DebugItemDataType = {
  type?: number;
  id: number;
  disabled?: boolean;
  hidden?: boolean;
  scrollAxis?: number;
};
