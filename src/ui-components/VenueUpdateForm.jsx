/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import { Venue, Event, Address as Address0 } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function VenueUpdateForm(props) {
  const {
    id: idProp,
    venue: venueModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    Events: [],
    photos: [],
    Address: undefined,
    description: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [Events, setEvents] = React.useState(initialValues.Events);
  const [photos, setPhotos] = React.useState(initialValues.photos);
  const [Address, setAddress] = React.useState(initialValues.Address);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = venueRecord
      ? { ...initialValues, ...venueRecord, Events: linkedEvents, Address }
      : initialValues;
    setName(cleanValues.name);
    setEvents(cleanValues.Events ?? []);
    setCurrentEventsValue(undefined);
    setCurrentEventsDisplayValue("");
    setPhotos(cleanValues.photos ?? []);
    setCurrentPhotosValue("");
    setAddress(cleanValues.Address);
    setCurrentAddressValue(undefined);
    setCurrentAddressDisplayValue("");
    setDescription(cleanValues.description);
    setErrors({});
  };
  const [venueRecord, setVenueRecord] = React.useState(venueModelProp);
  const [linkedEvents, setLinkedEvents] = React.useState([]);
  const canUnlinkEvents = true;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Venue, idProp)
        : venueModelProp;
      setVenueRecord(record);
      const linkedEvents = record ? await record.Events.toArray() : [];
      setLinkedEvents(linkedEvents);
      const AddressRecord = record ? await record.Address : undefined;
      setAddress(AddressRecord);
    };
    queryData();
  }, [idProp, venueModelProp]);
  React.useEffect(resetStateValues, [venueRecord, linkedEvents, Address]);
  const [currentEventsDisplayValue, setCurrentEventsDisplayValue] =
    React.useState("");
  const [currentEventsValue, setCurrentEventsValue] = React.useState(undefined);
  const EventsRef = React.createRef();
  const [currentPhotosValue, setCurrentPhotosValue] = React.useState("");
  const photosRef = React.createRef();
  const [currentAddressDisplayValue, setCurrentAddressDisplayValue] =
    React.useState("");
  const [currentAddressValue, setCurrentAddressValue] =
    React.useState(undefined);
  const AddressRef = React.createRef();
  const getIDValue = {
    Events: (r) => JSON.stringify({ id: r?.id }),
    Address: (r) => JSON.stringify({ id: r?.id }),
  };
  const EventsIdSet = new Set(
    Array.isArray(Events)
      ? Events.map((r) => getIDValue.Events?.(r))
      : getIDValue.Events?.(Events)
  );
  const AddressIdSet = new Set(
    Array.isArray(Address)
      ? Address.map((r) => getIDValue.Address?.(r))
      : getIDValue.Address?.(Address)
  );
  const eventRecords = useDataStoreBinding({
    type: "collection",
    model: Event,
  }).items;
  const addressRecords = useDataStoreBinding({
    type: "collection",
    model: Address0,
  }).items;
  const getDisplayValue = {
    Events: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
    Address: (r) => `${r?.street ? r?.street + " - " : ""}${r?.id}`,
  };
  const validations = {
    name: [{ type: "Required" }],
    Events: [],
    photos: [],
    Address: [],
    description: [],
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
          name,
          Events,
          photos,
          Address,
          description,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
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
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          const promises = [];
          const eventsToLink = [];
          const eventsToUnLink = [];
          const eventsSet = new Set();
          const linkedEventsSet = new Set();
          Events.forEach((r) => eventsSet.add(getIDValue.Events?.(r)));
          linkedEvents.forEach((r) =>
            linkedEventsSet.add(getIDValue.Events?.(r))
          );
          linkedEvents.forEach((r) => {
            if (!eventsSet.has(getIDValue.Events?.(r))) {
              eventsToUnLink.push(r);
            }
          });
          Events.forEach((r) => {
            if (!linkedEventsSet.has(getIDValue.Events?.(r))) {
              eventsToLink.push(r);
            }
          });
          eventsToUnLink.forEach((original) => {
            if (!canUnlinkEvents) {
              throw Error(
                `Event ${original.id} cannot be unlinked from Venue because undefined is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                Event.copyOf(original, (updated) => {
                  updated.Venue = null;
                })
              )
            );
          });
          eventsToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                Event.copyOf(original, (updated) => {
                  updated.Venue = venueRecord;
                })
              )
            );
          });
          const modelFieldsToSave = {
            name: modelFields.name,
            photos: modelFields.photos,
            Address: modelFields.Address,
            description: modelFields.description,
          };
          promises.push(
            DataStore.save(
              Venue.copyOf(venueRecord, (updated) => {
                Object.assign(updated, modelFieldsToSave);
                if (!modelFieldsToSave.Address) {
                  updated.venueAddressId = undefined;
                }
              })
            )
          );
          await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "VenueUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              Events,
              photos,
              Address,
              description,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              Events: values,
              photos,
              Address,
              description,
            };
            const result = onChange(modelFields);
            values = result?.Events ?? values;
          }
          setEvents(values);
          setCurrentEventsValue(undefined);
          setCurrentEventsDisplayValue("");
        }}
        currentFieldValue={currentEventsValue}
        label={"Events"}
        items={Events}
        hasError={errors?.Events?.hasError}
        errorMessage={errors?.Events?.errorMessage}
        getBadgeText={getDisplayValue.Events}
        setFieldValue={(model) => {
          setCurrentEventsDisplayValue(
            model ? getDisplayValue.Events(model) : ""
          );
          setCurrentEventsValue(model);
        }}
        inputFieldRef={EventsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Events"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Event"
          value={currentEventsDisplayValue}
          options={eventRecords
            .filter((r) => !EventsIdSet.has(getIDValue.Events?.(r)))
            .map((r) => ({
              id: getIDValue.Events?.(r),
              label: getDisplayValue.Events?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentEventsValue(
              eventRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentEventsDisplayValue(label);
            runValidationTasks("Events", label);
          }}
          onClear={() => {
            setCurrentEventsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Events?.hasError) {
              runValidationTasks("Events", value);
            }
            setCurrentEventsDisplayValue(value);
            setCurrentEventsValue(undefined);
          }}
          onBlur={() => runValidationTasks("Events", currentEventsDisplayValue)}
          errorMessage={errors.Events?.errorMessage}
          hasError={errors.Events?.hasError}
          ref={EventsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Events")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              Events,
              photos: values,
              Address,
              description,
            };
            const result = onChange(modelFields);
            values = result?.photos ?? values;
          }
          setPhotos(values);
          setCurrentPhotosValue("");
        }}
        currentFieldValue={currentPhotosValue}
        label={"Photos"}
        items={photos}
        hasError={errors?.photos?.hasError}
        errorMessage={errors?.photos?.errorMessage}
        setFieldValue={setCurrentPhotosValue}
        inputFieldRef={photosRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Photos"
          isRequired={false}
          isReadOnly={false}
          value={currentPhotosValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.photos?.hasError) {
              runValidationTasks("photos", value);
            }
            setCurrentPhotosValue(value);
          }}
          onBlur={() => runValidationTasks("photos", currentPhotosValue)}
          errorMessage={errors.photos?.errorMessage}
          hasError={errors.photos?.hasError}
          ref={photosRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "photos")}
        ></TextField>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              name,
              Events,
              photos,
              Address: value,
              description,
            };
            const result = onChange(modelFields);
            value = result?.Address ?? value;
          }
          setAddress(value);
          setCurrentAddressValue(undefined);
          setCurrentAddressDisplayValue("");
        }}
        currentFieldValue={currentAddressValue}
        label={"Address"}
        items={Address ? [Address] : []}
        hasError={errors?.Address?.hasError}
        errorMessage={errors?.Address?.errorMessage}
        getBadgeText={getDisplayValue.Address}
        setFieldValue={(model) => {
          setCurrentAddressDisplayValue(
            model ? getDisplayValue.Address(model) : ""
          );
          setCurrentAddressValue(model);
        }}
        inputFieldRef={AddressRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Address"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Address"
          value={currentAddressDisplayValue}
          options={addressRecords
            .filter((r) => !AddressIdSet.has(getIDValue.Address?.(r)))
            .map((r) => ({
              id: getIDValue.Address?.(r),
              label: getDisplayValue.Address?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentAddressValue(
              addressRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentAddressDisplayValue(label);
            runValidationTasks("Address", label);
          }}
          onClear={() => {
            setCurrentAddressDisplayValue("");
          }}
          defaultValue={Address}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Address?.hasError) {
              runValidationTasks("Address", value);
            }
            setCurrentAddressDisplayValue(value);
            setCurrentAddressValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Address", currentAddressDisplayValue)
          }
          errorMessage={errors.Address?.errorMessage}
          hasError={errors.Address?.hasError}
          ref={AddressRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Address")}
        ></Autocomplete>
      </ArrayField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              Events,
              photos,
              Address,
              description: value,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
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
          isDisabled={!(idProp || venueModelProp)}
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
              !(idProp || venueModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
