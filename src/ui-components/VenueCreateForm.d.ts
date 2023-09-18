/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { StorageManagerProps } from "@aws-amplify/ui-react-storage";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Event, Address as Address0 } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type VenueCreateFormInputValues = {
    name?: string;
    Events?: Event[];
    photos?: string[];
    Address?: Address0;
    description?: string;
};
export declare type VenueCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    Events?: ValidationFunction<Event>;
    photos?: ValidationFunction<string>;
    Address?: ValidationFunction<Address0>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type VenueCreateFormOverridesProps = {
    VenueCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    Events?: PrimitiveOverrideProps<AutocompleteProps>;
    photos?: PrimitiveOverrideProps<StorageManagerProps>;
    Address?: PrimitiveOverrideProps<AutocompleteProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type VenueCreateFormProps = React.PropsWithChildren<{
    overrides?: VenueCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: VenueCreateFormInputValues) => VenueCreateFormInputValues;
    onSuccess?: (fields: VenueCreateFormInputValues) => void;
    onError?: (fields: VenueCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: VenueCreateFormInputValues) => VenueCreateFormInputValues;
    onValidate?: VenueCreateFormValidationValues;
} & React.CSSProperties>;
export default function VenueCreateForm(props: VenueCreateFormProps): React.ReactElement;
