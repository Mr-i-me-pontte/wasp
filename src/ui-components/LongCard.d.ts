/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Event } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, ImageProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LongCardOverridesProps = {
    LongCard?: PrimitiveOverrideProps<FlexProps>;
    Image?: PrimitiveOverrideProps<FlexProps>;
    image?: PrimitiveOverrideProps<ImageProps>;
    "Main Body"?: PrimitiveOverrideProps<FlexProps>;
    "Text Body"?: PrimitiveOverrideProps<FlexProps>;
    "Card Title"?: PrimitiveOverrideProps<TextProps>;
    "A \u201Ccard\u201D is a UI design pattern that groups related information in a flexible-size container visually resembling a playing card."?: PrimitiveOverrideProps<TextProps>;
    Button?: PrimitiveOverrideProps<FlexProps>;
    "CTA Button"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type LongCardProps = React.PropsWithChildren<Partial<FlexProps> & {
    event?: Event;
} & {
    overrides?: LongCardOverridesProps | undefined | null;
}>;
export default function LongCard(props: LongCardProps): React.ReactElement;
