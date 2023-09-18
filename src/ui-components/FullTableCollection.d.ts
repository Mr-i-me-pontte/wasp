/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { FullTableProps } from "./FullTable";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { CollectionProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FullTableCollectionOverridesProps = {
    FullTableCollection?: PrimitiveOverrideProps<CollectionProps>;
    FullTable?: FullTableProps;
} & EscapeHatchProps;
export declare type FullTableCollectionProps = React.PropsWithChildren<Partial<CollectionProps<any>> & {
    items?: any[];
    overrideItems?: (collectionItem: {
        item: any;
        index: number;
    }) => FullTableProps;
} & {
    overrides?: FullTableCollectionOverridesProps | undefined | null;
}>;
export default function FullTableCollection(props: FullTableCollectionProps): React.ReactElement;
