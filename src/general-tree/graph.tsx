import React, { useContext } from 'react';
import { ComputedOptions, ItemComponentProps, RenderMatrix } from '../types';
import { itemContext } from './item-context';
import { ItemWrapper } from './item-wrapper';

export function Graph<T>({
  renderData,
  itemComponent,
  calculatedStyle,
}: {
  renderData: RenderMatrix<T>;
  itemComponent: (props: ItemComponentProps<T>) => JSX.Element;
  calculatedStyle: ComputedOptions;
}) {
  const {
    state: { hoveredItems, activeItemIds },
  } = useContext(itemContext);

  return (
    <g>
      {renderData.map((column, columnIndex) =>
        column.map((item, rowIndex) => {
          return (
            <ItemWrapper
              {...{
                columnIndex,
                item,
                rowIndex,
                renderData,
                calculatedStyle,
                itemComponent,
              }}
            />
          );
        })
      )}
      {activeItemIds.slice(1).map(itemID => (
        <use xlinkHref={`#connector-${itemID}`} />
      ))}
      {hoveredItems.slice(1).map(itemID => (
        <use xlinkHref={`#connector-${itemID}`} />
      ))}
    </g>
  );
}
