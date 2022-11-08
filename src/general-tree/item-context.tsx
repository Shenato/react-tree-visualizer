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
  activeItemIds: number[];
  hoveredItems: number[];
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

export const useItemContext = <T,>(tree: Tree<T>, activeItemIds: string[]) => {
  const { newResult: renderDataRaw } = generateRenderTree<T>(tree);
  const [, ...renderMatrix] = renderDataRaw;

  const [state, dispatch] = useReducer(
    (previousState, action) => {
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

          const path = currentHoveredItem
            ? findPathFromItem(
                [currentHoveredItem.id],
                currentHoveredItem.parentId,
                previousState.renderData.slice(0, Math.max(columnIndex, 0))
              )
            : [];

          return {
            ...previousState,
            hoveredItems: path,
          };
        }
        case 'SET_BLURRED': {
          return {
            ...previousState,
            hoveredItems: [],
          };
        }
        case 'UPDATE_TREE': {
          const { newResult: renderDataRawUpdated } = generateRenderTree<T>(
            tree,
            previousState.collapsedItemIds
          );
          const [, ...renderMatrixUpdated] = renderDataRawUpdated;

          const path: number[] =
            activeItemIds.length > 0
              ? activeItemIds.reduce((acc, activeItemUniqueId) => {
                  const { item, column } = findItemFromRenderMatrix(
                    renderMatrixUpdated,
                    activeItemUniqueId
                  );
                  if (item == null) {
                    return acc;
                  }
                  const newIds = findPathFromItem(
                    [item.id],
                    item.parentId,
                    previousState.renderData.slice(0, Math.max(column, 0))
                  );

                  return [...acc, ...newIds];
                }, [])
              : [];

          return {
            ...previousState,
            renderData: renderMatrixUpdated,
            activeItemIds: path,
          };
        }
        default:
          return { ...previousState, renderData: renderMatrix, activeItemIds };
      }
    },
    { ...initialState, renderData: renderMatrix, activeItemIds }
  );

  useEffect(() => {
    dispatch({ type: 'UPDATE_TREE', payload: { tree, activeItemIds } });
  }, [tree]);

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

  const highlighted = hoveredItems.some(itemId => itemId === currentItem.id);
  const isActive = activeItemIds.some(itemId => itemId === currentItem.id);
  console.log('activeItemIds:', activeItemIds);

  // @ts-ignore
  if (currentItem.data?.isFocused) {
    console.log('item.id:', currentItem.id);
    console.log('isActive:', isActive);
  }

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
  result: number[] = [],
  parentId: number,
  renderMatrix: RenderMatrix<T>
): number[] {
  if (renderMatrix.length === 0) {
    return result;
  }
  if (renderMatrix.length === 1) {
    return [parentId, ...result];
  }
  const currentParentItem = renderMatrix[renderMatrix.length - 1].find(
    parent => parent.id === parentId
  );
  const newRenderMatrix = renderMatrix.slice(0, -1);
  return findPathFromItem(
    [currentParentItem.id, ...result],
    currentParentItem.parentId,
    newRenderMatrix
  );
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
