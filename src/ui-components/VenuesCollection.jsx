/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Event } from "../models";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import LongCard from "./LongCard";
import { Collection } from "@aws-amplify/ui-react";
export default function VenuesCollection(props) {
  const { items: itemsProp, overrideItems, overrides, ...rest } = props;
  const [items, setItems] = React.useState(undefined);
  const itemsDataStore = useDataStoreBinding({
    type: "collection",
    model: Event,
  }).items;
  React.useEffect(() => {
    if (itemsProp !== undefined) {
      setItems(itemsProp);
      return;
    }
    async function setItemsFromDataStore() {
      var loaded = await Promise.all(
        itemsDataStore.map(async (item) => ({
          ...item,
          TicketTypes: await item.TicketTypes.toArray(),
          Venue: await item.Venue,
        }))
      );
      setItems(loaded);
    }
    setItemsFromDataStore();
  }, [itemsProp, itemsDataStore]);
  return (
    <Collection
      type="list"
      isSearchable={true}
      isPaginated={true}
      searchPlaceholder="Search..."
      itemsPerPage={6}
      direction="column"
      justifyContent="left"
      items={items || []}
      {...getOverrideProps(overrides, "VenuesCollection")}
      {...rest}
    >
      {(item, index) => (
        <LongCard
          event={item}
          key={item.id}
          {...(overrideItems && overrideItems({ item, index }))}
        ></LongCard>
      )}
    </Collection>
  );
}
