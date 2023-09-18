/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
    getOverrideProps,
    getOverridesFromVariants,
    mergeVariantsAndOverrides,
} from "@aws-amplify/ui-react/internal";
import { Flex, Text } from "@aws-amplify/ui-react";
import {Btn, HighlightedNFT} from "../../../../../../ui-components";
 function HeroSection(props) {
    const { event, overrides: overridesProp, ...rest } = props;
    const variants = [
        {
            variantValues: { property1: "Default" },
            overrides: {
                "Discover digital art & Collect NFTs": {},
                "NFT marketplace UI created with Anima for Figma. Collect, buy and sell art from more than 20k NFT artists.":
                    {},
                "Headline & Subhead": {},
                Btn: {},
                "240k+40202927": {},
                "Total Sale40202928": {},
                "Total Sale40202926": {},
                "100k+": {},
                Auctions40202931: {},
                Auctions40202929: {},
                "240k+40202933": {},
                Artists40202934: {},
                Artists40202932: {},
                "Trending Collection/Top Rated Artists/Additional Info": {},
                "Hero Text & Buttons": {},
                "Highlighted NFT": {},
                "Hero Section Frame": {},
                HeroSection: {},
            },
        },
        {
            variantValues: { property1: "SM" },
            overrides: {
                "Discover digital art & Collect NFTs": {
                    fontSize: "28px",
                    lineHeight: "39.20000076293945px",
                    width: "unset",
                    shrink: "0",
                    alignSelf: "stretch",
                },
                "NFT marketplace UI created with Anima for Figma. Collect, buy and sell art from more than 20k NFT artists.":
                    { fontSize: "16px", lineHeight: "22.399999618530273px" },
                "Headline & Subhead": { gap: "10px" },
                Btn: { alignSelf: "stretch" },
                "240k+40202927": {
                    fontSize: "22px",
                    lineHeight: "35.20000076293945px",
                },
                "Total Sale40202928": {
                    fontSize: "16px",
                    lineHeight: "22.399999618530273px",
                },
                "Total Sale40202926": {},
                "100k+": { fontSize: "22px", lineHeight: "35.20000076293945px" },
                Auctions40202931: {
                    fontSize: "16px",
                    lineHeight: "22.399999618530273px",
                },
                Auctions40202929: {},
                "240k+40202933": {
                    fontSize: "22px",
                    lineHeight: "35.20000076293945px",
                },
                Artists40202934: {
                    fontSize: "16px",
                    lineHeight: "22.399999618530273px",
                },
                Artists40202932: {},
                "Trending Collection/Top Rated Artists/Additional Info": {},
                "Hero Text & Buttons": { shrink: "0" },
                "Highlighted NFT": { alignItems: "center" },
                "Hero Section Frame": {
                    direction: "column",
                    width: "315px",
                    alignItems: "flex-start",
                },
                HeroSection: { width: "375px", padding: "40px 0px 40px 0px" },
            },
        },
        {
            variantValues: { property1: "MD" },
            overrides: {
                "Discover digital art & Collect NFTs": {
                    fontSize: "38px",
                    lineHeight: "45.60000228881836px",
                    width: "330px",
                    shrink: "0",
                },
                "NFT marketplace UI created with Anima for Figma. Collect, buy and sell art from more than 20k NFT artists.":
                    { fontSize: "16px", lineHeight: "22.399999618530273px" },
                "Headline & Subhead": {},
                Btn: {},
                "240k+40202927": {
                    fontSize: "22px",
                    lineHeight: "35.20000076293945px",
                },
                "Total Sale40202928": {
                    fontSize: "16px",
                    lineHeight: "22.399999618530273px",
                },
                "Total Sale40202926": {},
                "100k+": { fontSize: "22px", lineHeight: "35.20000076293945px" },
                Auctions40202931: {
                    fontSize: "16px",
                    lineHeight: "22.399999618530273px",
                },
                Auctions40202929: {},
                "240k+40202933": {
                    fontSize: "22px",
                    lineHeight: "35.20000076293945px",
                },
                Artists40202934: {
                    fontSize: "16px",
                    lineHeight: "22.399999618530273px",
                },
                Artists40202932: {},
                "Trending Collection/Top Rated Artists/Additional Info": {},
                "Hero Text & Buttons": { gap: "20px", width: "330px", shrink: "0" },
                "Highlighted NFT": { alignItems: "center" },
                "Hero Section Frame": { width: "690px", alignItems: "flex-start" },
                HeroSection: { width: "920px", padding: "80px 0px 80px 0px" },
            },
        },
    ];
    const overrides = mergeVariantsAndOverrides(
        getOverridesFromVariants(variants, props),
        overridesProp || {}
    );
    return (
        <Flex
            gap="30px"
            direction="row"
            width="unset"
            height="unset"
            justifyContent="center"
            alignItems="center"
            position="relative"
            padding="80px 195px 80px 195px"
            backgroundColor="rgba(43,43,43,1)"
            display="flex"
            {...getOverrideProps(overrides, "HeroSection")}
            {...rest}
        >
            <Flex
                gap="30px"
                direction="row"
                width="1050px"
                height="unset"
                justifyContent="flex-start"
                alignItems="center"
                shrink="0"
                position="relative"
                padding="0px 0px 0px 0px"
                display="flex"
                {...getOverrideProps(overrides, "Hero Section Frame")}
            >
                <Flex
                    gap="40px"
                    direction="column"
                    width="unset"
                    height="unset"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    grow="1"
                    shrink="1"
                    basis="0"
                    alignSelf="stretch"
                    position="relative"
                    padding="0px 0px 0px 0px"
                    display="flex"
                    {...getOverrideProps(overrides, "Hero Text & Buttons")}
                >
                    <Flex
                        gap="20px"
                        direction="column"
                        width="unset"
                        height="unset"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        shrink="0"
                        alignSelf="stretch"
                        position="relative"
                        padding="0px 0px 0px 0px"
                        display="flex"
                        {...getOverrideProps(overrides, "Headline & Subhead")}
                    >
                        <Text
                            fontFamily="Work Sans"
                            fontSize="67px"
                            fontWeight="600"
                            color="rgba(255,255,255,1)"
                            textTransform="capitalize"
                            lineHeight="73.70000457763672px"
                            textAlign="left"
                            display="block"
                            direction="column"
                            justifyContent="unset"
                            width="510px"
                            height="unset"
                            gap="unset"
                            alignItems="unset"
                            grow="1"
                            shrink="1"
                            basis="0"
                            position="relative"
                            padding="0px 0px 0px 0px"
                            whiteSpace="pre-wrap"
                            children={event?.title}
                            {...getOverrideProps(
                                overrides,
                                "Discover digital art & Collect NFTs"
                            )}
                        ></Text>
                        <Text
                            fontFamily="Work Sans"
                            fontSize="22px"
                            fontWeight="400"
                            color="rgba(255,255,255,1)"
                            textTransform="capitalize"
                            lineHeight="35.20000076293945px"
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
                                "NFT marketplace UI created with Anima for Figma. Collect, buy and sell art from more than 20k NFT artists."
                            )}
                        ></Text>
                    </Flex>
                    <Btn
                        display="flex"
                        gap="12px"
                        direction="row"
                        width="unset"
                        justifyContent="center"
                        alignItems="center"
                        shrink="0"
                        position="relative"
                        borderRadius="20px"
                        padding="0px 50px 0px 50px"
                        backgroundColor="rgba(162,89,255,1)"
                        property1="Secondary/Filled"
                        {...getOverrideProps(overrides, "Btn")}
                    ></Btn>
                    <Flex
                        gap="30px"
                        direction="row"
                        width="unset"
                        height="unset"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        shrink="0"
                        alignSelf="stretch"
                        position="relative"
                        borderRadius="20px"
                        padding="0px 0px 0px 0px"
                        display="flex"
                        {...getOverrideProps(
                            overrides,
                            "Trending Collection/Top Rated Artists/Additional Info"
                        )}
                    >
                        <Flex
                            gap="0"
                            direction="column"
                            width="unset"
                            height="unset"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            grow="1"
                            shrink="1"
                            basis="0"
                            position="relative"
                            borderRadius="20px"
                            padding="0px 0px 0px 0px"
                            display="flex"
                            {...getOverrideProps(overrides, "Total Sale40202926")}
                        >
                            <Text
                                fontFamily="Space Mono"
                                fontSize="28px"
                                fontWeight="700"
                                color="rgba(255,255,255,1)"
                                textTransform="capitalize"
                                lineHeight="39.20000076293945px"
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
                                children="240k+ "
                                {...getOverrideProps(overrides, "240k+40202927")}
                            ></Text>
                            <Text
                                fontFamily="Work Sans"
                                fontSize="22px"
                                fontWeight="400"
                                color="rgba(255,255,255,1)"
                                textTransform="capitalize"
                                lineHeight="35.20000076293945px"
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
                                children="Total Sale"
                                {...getOverrideProps(overrides, "Total Sale40202928")}
                            ></Text>
                        </Flex>
                        <Flex
                            gap="0"
                            direction="column"
                            width="unset"
                            height="unset"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            grow="1"
                            shrink="1"
                            basis="0"
                            position="relative"
                            borderRadius="20px"
                            padding="0px 0px 0px 0px"
                            display="flex"
                            {...getOverrideProps(overrides, "Auctions40202929")}
                        >
                            <Text
                                fontFamily="Space Mono"
                                fontSize="28px"
                                fontWeight="700"
                                color="rgba(255,255,255,1)"
                                textTransform="capitalize"
                                lineHeight="39.20000076293945px"
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
                                children="100k+"
                                {...getOverrideProps(overrides, "100k+")}
                            ></Text>
                            <Text
                                fontFamily="Work Sans"
                                fontSize="22px"
                                fontWeight="400"
                                color="rgba(255,255,255,1)"
                                textTransform="capitalize"
                                lineHeight="35.20000076293945px"
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
                                children="Auctions"
                                {...getOverrideProps(overrides, "Auctions40202931")}
                            ></Text>
                        </Flex>
                        <Flex
                            gap="0"
                            direction="column"
                            width="unset"
                            height="unset"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            grow="1"
                            shrink="1"
                            basis="0"
                            position="relative"
                            borderRadius="20px"
                            padding="0px 0px 0px 0px"
                            display="flex"
                            {...getOverrideProps(overrides, "Artists40202932")}
                        >
                            <Text
                                fontFamily="Space Mono"
                                fontSize="28px"
                                fontWeight="700"
                                color="rgba(255,255,255,1)"
                                textTransform="capitalize"
                                lineHeight="39.20000076293945px"
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
                                children="240k+"
                                {...getOverrideProps(overrides, "240k+40202933")}
                            ></Text>
                            <Text
                                fontFamily="Work Sans"
                                fontSize="22px"
                                fontWeight="400"
                                color="rgba(255,255,255,1)"
                                textTransform="capitalize"
                                lineHeight="35.20000076293945px"
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
                                children="Artists"
                                {...getOverrideProps(overrides, "Artists40202934")}
                            ></Text>
                        </Flex>
                    </Flex>
                </Flex>
                <HighlightedNFT
                    display="flex"
                    gap="0"
                    direction="column"
                    width="unset"
                    height="unset"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    shrink="0"
                    position="relative"
                    padding="0px 0px 0px 0px"
                    {...getOverrideProps(overrides, "Highlighted NFT")}
                ></HighlightedNFT>
            </Flex>
        </Flex>
    );
}



const Read = (props) => (
    <>
        <HeroSection/>
    </>
);

export default Read;
