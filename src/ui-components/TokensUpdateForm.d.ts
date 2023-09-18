/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Tokens } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TokensUpdateFormInputValues = {
    symbol?: string;
    value?: string;
    variation?: string;
};
export declare type TokensUpdateFormValidationValues = {
    symbol?: ValidationFunction<string>;
    value?: ValidationFunction<string>;
    variation?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TokensUpdateFormOverridesProps = {
    TokensUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    symbol?: PrimitiveOverrideProps<TextFieldProps>;
    value?: PrimitiveOverrideProps<TextFieldProps>;
    variation?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TokensUpdateFormProps = React.PropsWithChildren<{
    overrides?: TokensUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    tokens?: Tokens;
    onSubmit?: (fields: TokensUpdateFormInputValues) => TokensUpdateFormInputValues;
    onSuccess?: (fields: TokensUpdateFormInputValues) => void;
    onError?: (fields: TokensUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TokensUpdateFormInputValues) => TokensUpdateFormInputValues;
    onValidate?: TokensUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TokensUpdateForm(props: TokensUpdateFormProps): React.ReactElement;
