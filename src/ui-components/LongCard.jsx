/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Image, Text } from "@aws-amplify/ui-react";
export default function LongCard(props) {
  const { event, overrides, ...rest } = props;
  return (
    <Flex
      gap="16px"
      direction="row"
      width="740px"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      boxShadow="-2px 4px 12px rgba(0.0941176488995552, 0.0941176488995552, 0.0941176488995552, 0.07999999821186066)"
      padding="16px 16px 16px 16px"
      backgroundColor="rgba(255,255,255,1)"
      {...getOverrideProps(overrides, "LongCard")}
      {...rest}
    >
      <Flex
        gap="10px"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        grow="1"
        shrink="1"
        basis="0"
        position="relative"
        borderRadius="4px"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Image")}
      >
        <Image
          width="unset"
          height="188px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
          objectFit="cover"
          {...getOverrideProps(overrides, "image")}
        ></Image>
      </Flex>
      <Flex
        gap="20px"
        direction="column"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-end"
        grow="1"
        shrink="1"
        basis="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Main Body")}
      >
        <Flex
          gap="16px"
          direction="column"
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="flex-start"
          shrink="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Text Body")}
        >
          <Text
            fontFamily="Inter"
            fontSize="24px"
            fontWeight="600"
            color="rgba(24,24,24,1)"
            lineHeight="32px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children={event?.title}
            {...getOverrideProps(overrides, "Card Title")}
          ></Text>
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="400"
            color="rgba(71,71,71,1)"
            lineHeight="24px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            alignSelf="stretch"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children={event?.description}
            {...getOverrideProps(
              overrides,
              "A \u201Ccard\u201D is a UI design pattern that groups related information in a flexible-size container visually resembling a playing card."
            )}
          ></Text>
        </Flex>
        <Flex
          gap="8px"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="center"
          alignItems="center"
          shrink="0"
          position="relative"
          borderRadius="4px"
          padding="12px 24px 12px 24px"
          backgroundColor="rgba(45,104,254,1)"
          {...getOverrideProps(overrides, "Button")}
        >
          <Text
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="500"
            color="rgba(255,255,255,1)"
            lineHeight="24px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="CTA Button"
            {...getOverrideProps(overrides, "CTA Button")}
          ></Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
