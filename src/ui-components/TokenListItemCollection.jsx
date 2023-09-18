/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Tokens } from "../models";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import TokenListItem from "./TokenListItem";
import { Collection } from "@aws-amplify/ui-react";
export default function TokenListItemCollection(props) {
  const { items: itemsProp, overrideItems, overrides, ...rest } = props;
  const [items, setItems] = React.useState(undefined);
  const itemsDataStore = useDataStoreBinding({
    type: "collection",
    model: Tokens,
  }).items;
  React.useEffect(() => {
    if (itemsProp !== undefined) {
      setItems(itemsProp);
      return;
    }
    setItems(itemsDataStore);
  }, [itemsProp, itemsDataStore]);
  return (
    <Collection
      type="list"
      isSearchable="true"
      isPaginated={true}
      searchPlaceholder="Search..."
      itemsPerPage={6}
      direction="column"
      alignItems="stretch"
      justifyContent="center"
      items={items || []}
      {...getOverrideProps(overrides, "TokenListItemCollection")}
      {...rest}
    >
      {(item, index) => (
        <TokenListItem
          tokens={item}
          key={item.id}
          {...(overrideItems && overrideItems({ item, index }))}
        ></TokenListItem>
      )}
    </Collection>
  );
}
