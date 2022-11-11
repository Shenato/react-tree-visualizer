import React, {
  useContext,
  createContext,
  useReducer,
  Dispatch,
  useEffect,
} from 'react';
import { numArrayComparison } from '../utils/numbers';
import { RenderItem, RenderMatrix, Tree } from '../types';
import { generateRenderTree } from './treeToRenderAdapter';

type State = {
  // eslint-disable-next-line no-undef
  renderData: RenderMatrix<unknown>;
  activeItemIds: string[];
  hoveredItems: string[];
  collapsedItemIds: string[];
};

const initialState: State = {
  renderData: [],
  activeItemIds: [],
  hoveredItems: [],
  collapsedItemIds: [],
};

const store = createContext<{ state: State; dispatch: Dispatch<any> }>({
  state: {
    renderData: [[]],
    activeItemIds: [],
    hoveredItems: [],
    collapsedItemIds: [],
  },
  dispatch: () => {},
});

export const itemContext = store;

type ACTION_TOGGLE_COLLAPSE<T> = {
  type: 'TOGGLE_COLLAPSE';
  payload: {
    currentItem: RenderItem<T>;
  };
};
type ACTION_SET_HOVERED<T> = {
  type: 'SET_HOVERED';
  payload: {
    currentHoveredItem: RenderItem<T>;
    hoveredColumnIndex: number;
  };
};
type ACTION_SET_BLURRED = {
  type: 'SET_BLURRED';
};
type ACTION_UPDATE_TREE<T> = {
  type: 'UPDATE_TREE';
  payload: {
    tree: Tree<T>;
    activeItemIds: string[];
  };
};
type useItemReducerAction<T> =
  | ACTION_TOGGLE_COLLAPSE<T>
  | ACTION_SET_HOVERED<T>
  | ACTION_SET_BLURRED
  | ACTION_UPDATE_TREE<T>;
export const useItemContext = <T,>(tree: Tree<T>, activeItemIds: string[]) => {
  const renderMatrix = processTree(tree);
  const path = processActiveItems(renderMatrix, activeItemIds);

  const [state, dispatch] = useReducer(
    (previousState, action: useItemReducerAction<T>) => {
      switch (action.type) {
        case 'TOGGLE_COLLAPSE': {
          const { currentItem } = action.payload ?? {};
          const isAlreadyCollapsed = previousState.collapsedItemIds.includes(
            currentItem.uniqueId
          );
          const newCollapsedItems = isAlreadyCollapsed
            ? previousState.collapsedItemIds.filter(
                itemId => itemId !== currentItem.uniqueId
              )
            : [...previousState.collapsedItemIds, currentItem.uniqueId];

          const { newResult: newRenderDataRaw } = generateRenderTree<T>(
            tree,
            newCollapsedItems
          );
          const [, ...newRenderData] = newRenderDataRaw;

          return {
            ...previousState,
            collapsedItemIds: newCollapsedItems,
            renderData: newRenderData,
          };
        }
        case 'SET_HOVERED': {
          const {
            currentHoveredItem,
            hoveredColumnIndex: columnIndex,
            // hoveredRowIndex: rowIndex,
          } = action.payload ?? {};

          const newPath = currentHoveredItem
            ? findPathFromItem(
                [currentHoveredItem.uniqueId],
                currentHoveredItem.parentUniqueId,
                previousState.renderData.slice(0, Math.max(columnIndex, 0))
              )
            : [];

          return {
            ...previousState,
            hoveredItems: newPath,
          };
        }
        case 'SET_BLURRED': {
          return {
            ...previousState,
            hoveredItems: [],
          };
        }
        case 'UPDATE_TREE': {
          const { tree, activeItemIds } = action.payload;
          const newRenderMatrix = processTree(
            tree,
            previousState.collapsedItemIds
          );
          const newActiveItemsId = processActiveItems(
            newRenderMatrix,
            activeItemIds
          );

          return {
            ...previousState,
            renderData: newRenderMatrix,
            activeItemIds: newActiveItemsId,
          };
        }
        default: {
          return previousState;
        }
      }
    },
    { ...initialState, renderData: renderMatrix, activeItemIds: path }
  );

  useEffect(() => {
    dispatch({ type: 'UPDATE_TREE', payload: { tree, activeItemIds } });
  }, [tree, activeItemIds]);

  return [state, dispatch];
};

export const useItemHighlightContext = <T,>({
  currentItem,
}: {
  currentItem: RenderItem<T>;
}) => {
  const {
    state: { hoveredItems, activeItemIds },
  } = useContext(itemContext);

  const highlighted = hoveredItems.some(
    itemId => itemId === currentItem.uniqueId
  );
  const isActive = activeItemIds.some(
    itemId => itemId === currentItem.uniqueId
  );

  return { isHighlighted: highlighted, isActive };
};

export const useIsCollapsed = <T,>({
  currentItem,
}: {
  currentItem: RenderItem<T>;
}) => {
  const {
    state: { collapsedItemIds },
  } = useContext(itemContext);

  const isCollapsed = collapsedItemIds.some(
    collapsedItemId => collapsedItemId === currentItem.uniqueId
  );

  return isCollapsed;
};

function findPathFromItem<T>(
  result: string[] = [],
  parentId: string,
  renderMatrix: RenderMatrix<T>
): string[] {
  if (renderMatrix.length === 0) {
    return result;
  }
  if (renderMatrix.length === 1) {
    return [parentId, ...result];
  }
  const currentParentItem = renderMatrix[renderMatrix.length - 1].find(
    parent => parent.uniqueId === parentId
  );
  const newRenderMatrix = renderMatrix.slice(0, -1);
  return findPathFromItem(
    [currentParentItem.uniqueId, ...result],
    currentParentItem.parentUniqueId,
    newRenderMatrix
  );
}

function processTree<T>(tree: Tree<T>, collpasedItemIds?: string[]) {
  const { newResult: renderDataRawUpdated } = generateRenderTree<T>(
    tree,
    collpasedItemIds
  );
  const [, ...renderMatrix] = renderDataRawUpdated;

  return renderMatrix;
}

function processActiveItems<T>(
  renderMatrix: RenderMatrix<T>,
  activeItemIds: string[]
) {
  const path: number[] =
    activeItemIds.length > 0
      ? activeItemIds.reduce((acc, activeItemUniqueId) => {
          const { item, column } = findItemFromRenderMatrix(
            renderMatrix,
            activeItemUniqueId
          );
          if (item == null) {
            return acc;
          }
          const newIds = findPathFromItem(
            [item.uniqueId],
            item.parentUniqueId,
            renderMatrix.slice(0, Math.max(column, 0))
          );

          return [...acc, ...newIds];
        }, [])
      : [];
  return path;
}

function findItemFromRenderMatrix<T>(
  renderMatrix: RenderMatrix<T>,
  uniqueId: string
) {
  for (let column = 0; column < renderMatrix.length; column++) {
    for (let row = 0; row < renderMatrix[column].length; row++) {
      const item = renderMatrix[column][row];

      if (item.uniqueId === uniqueId) {
        return { item, column };
      }
    }
  }
  return { item: undefined, column: undefined };
}
