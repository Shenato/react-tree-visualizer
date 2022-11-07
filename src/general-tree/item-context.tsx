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
  hoveredItems: number[];
  collapsedItems: number[][];
};

const initialState: State = {
  renderData: [],
  hoveredItems: [],
  collapsedItems: [],
};

const store = createContext<{ state: State; dispatch: Dispatch<any> }>({
  state: {
    renderData: [[]],
    hoveredItems: [],
    collapsedItems: [],
  },
  dispatch: () => {},
});

export const itemContext = store;

export const useItemContext = <T,>(tree: Tree<T>) => {
  const { newResult: renderDataRaw } = generateRenderTree<T>(tree);
  const [, ...renderMatrix] = renderDataRaw;

  const [state, dispatch] = useReducer(
    (previousState, action) => {
      switch (action.type) {
        case 'TOGGLE_COLLAPSE': {
          const { currentItem } = action.payload ?? {};

          const { path } = currentItem;

          const indexOFRemovedItem = previousState.collapsedItems.findIndex(
            itemPath => numArrayComparison(itemPath, path)
          );

          const newCollapsedItems =
            indexOFRemovedItem === -1
              ? [...previousState.collapsedItems, path]
              : previousState.collapsedItems.filter(
                  (item, index) => index !== indexOFRemovedItem
                );

          const { newResult: newRenderDataRaw } = generateRenderTree<T>(
            tree,
            newCollapsedItems
          );
          const [, ...newRenderData] = newRenderDataRaw;

          return {
            ...previousState,
            collapsedItems: newCollapsedItems,
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
            previousState.collapsedItems
          );
          const [, ...renderMatrixUpdated] = renderDataRawUpdated;
          console.log({
            ...previousState,
            renderData: renderMatrixUpdated,
          });
          return {
            ...previousState,
            renderData: renderMatrixUpdated,
          };
        }
        default:
          return { ...previousState, renderData: renderMatrix };
      }
    },
    { ...initialState, renderData: renderMatrix }
  );
  useEffect(() => {
    dispatch({ type: 'UPDATE_TREE', payload: tree });
  }, [tree]);
  return [state, dispatch];
};

export const useItemHighlightContext = <T,>({
  currentItem,
}: {
  currentItem: RenderItem<T>;
}) => {
  const {
    state: { hoveredItems },
  } = useContext(itemContext);

  const highlighted = hoveredItems.some(itemId => itemId === currentItem.id);

  return highlighted;
};

export const useIsCollapsed = <T,>({
  currentItem,
}: {
  currentItem: RenderItem<T>;
}) => {
  const {
    state: { collapsedItems },
  } = useContext(itemContext);

  const isCollapsed = collapsedItems.some(collapsedPath =>
    numArrayComparison(collapsedPath, currentItem.path)
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
