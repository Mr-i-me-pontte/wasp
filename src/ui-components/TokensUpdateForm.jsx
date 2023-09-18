/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Tokens } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function TokensUpdateForm(props) {
  const {
    id: idProp,
    tokens: tokensModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    symbol: "",
    value: "",
    variation: "",
  };
  const [symbol, setSymbol] = React.useState(initialValues.symbol);
  const [value, setValue] = React.useState(initialValues.value);
  const [variation, setVariation] = React.useState(initialValues.variation);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = tokensRecord
      ? { ...initialValues, ...tokensRecord }
      : initialValues;
    setSymbol(cleanValues.symbol);
    setValue(cleanValues.value);
    setVariation(cleanValues.variation);
    setErrors({});
  };
  const [tokensRecord, setTokensRecord] = React.useState(tokensModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Tokens, idProp)
        : tokensModelProp;
      setTokensRecord(record);
    };
    queryData();
  }, [idProp, tokensModelProp]);
  React.useEffect(resetStateValues, [tokensRecord]);
  const validations = {
    symbol: [],
    value: [],
    variation: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          symbol,
          value,
          variation,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(
            Tokens.copyOf(tokensRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "TokensUpdateForm")}
      {...rest}
    >
      <TextField
        label="Symbol"
        isRequired={false}
        isReadOnly={false}
        value={symbol}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              symbol: value,
              value,
              variation,
            };
            const result = onChange(modelFields);
            value = result?.symbol ?? value;
          }
          if (errors.symbol?.hasError) {
            runValidationTasks("symbol", value);
          }
          setSymbol(value);
        }}
        onBlur={() => runValidationTasks("symbol", symbol)}
        errorMessage={errors.symbol?.errorMessage}
        hasError={errors.symbol?.hasError}
        {...getOverrideProps(overrides, "symbol")}
      ></TextField>
      <TextField
        label="Value"
        isRequired={false}
        isReadOnly={false}
        value={value}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              symbol,
              value: value,
              variation,
            };
            const result = onChange(modelFields);
            value = result?.value ?? value;
          }
          if (errors.value?.hasError) {
            runValidationTasks("value", value);
          }
          setValue(value);
        }}
        onBlur={() => runValidationTasks("value", value)}
        errorMessage={errors.value?.errorMessage}
        hasError={errors.value?.hasError}
        {...getOverrideProps(overrides, "value")}
      ></TextField>
      <TextField
        label="Variation"
        isRequired={false}
        isReadOnly={false}
        value={variation}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              symbol,
              value,
              variation: value,
            };
            const result = onChange(modelFields);
            value = result?.variation ?? value;
          }
          if (errors.variation?.hasError) {
            runValidationTasks("variation", value);
          }
          setVariation(value);
        }}
        onBlur={() => runValidationTasks("variation", variation)}
        errorMessage={errors.variation?.errorMessage}
        hasError={errors.variation?.hasError}
        {...getOverrideProps(overrides, "variation")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || tokensModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || tokensModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
