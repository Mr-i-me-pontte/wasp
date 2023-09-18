/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TokensCreateFormInputValues = {
    symbol?: string;
    value?: string;
    variation?: string;
};
export declare type TokensCreateFormValidationValues = {
    symbol?: ValidationFunction<string>;
    value?: ValidationFunction<string>;
    variation?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TokensCreateFormOverridesProps = {
    TokensCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    symbol?: PrimitiveOverrideProps<TextFieldProps>;
    value?: PrimitiveOverrideProps<TextFieldProps>;
    variation?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TokensCreateFormProps = React.PropsWithChildren<{
    overrides?: TokensCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TokensCreateFormInputValues) => TokensCreateFormInputValues;
    onSuccess?: (fields: TokensCreateFormInputValues) => void;
    onError?: (fields: TokensCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TokensCreateFormInputValues) => TokensCreateFormInputValues;
    onValidate?: TokensCreateFormValidationValues;
} & React.CSSProperties>;
export default function TokensCreateForm(props: TokensCreateFormProps): React.ReactElement;
