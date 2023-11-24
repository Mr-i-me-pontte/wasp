import React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Icon, Text, View } from "@aws-amplify/ui-react";
import Tr from "../../../../../ui-components/Tr";
import { Collection } from "@aws-amplify/ui-react"; // Import the Collection component
import "./styles.scss";
import { orderHistory } from "../sampleData";

export default function FullTable(props) {
    const { overrides, ...rest } = props;
    const data = [...orderHistory]; // Replace this with your data array
    const x = {...getOverrideProps(overrides, "FullTable")}

    const y = {...getOverrideProps(overrides, "th")}
    console.log({x,y})

    return (
        <Flex
            gap="0"
            direction="column"
            width="unset"
            height="unset"
            justifyContent="flex-start"
            alignItems="flex-start"
            overflow="hidden"
            position="relative"
            border="1px SOLID rgba(208,208,206,1)"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "FullTable")}
            {...rest}
        >
            {/* Header */}
            <Flex
                gap="2px"
                direction="row"
                width="1590px"
                height="unset"
                justifyContent="flex-start"
                alignItems="flex-start"
                shrink="0"
                position="relative"
                border="1px SOLID rgba(249,251,252,1)"
                padding="0px 0px 0px 0px"
                backgroundColor="rgba(248,248,248,1)"
                {...getOverrideProps(overrides, "th")}
            >
                {/* Add your header cells here */}
            </Flex>

            {/* Data Rows */}
            <Collection type="list" items={data}>
                {(rowData, rowIndex) => (
                    <Tr
                        key={rowIndex}
                        display="flex"
                        gap="24px"
                        direction="row"
                        width="1590px"
                        height="64px"
                        justifyContent="center"
                        alignItems="center"
                        shrink="0"
                        position="relative"
                        border="1px SOLID rgba(208,208,206,1)"
                        padding="0px 0px 0px 0px"
                        backgroundColor="rgba(255,255,255,1)"
                        {...getOverrideProps(overrides, "tr")}
                    >
                        {/* Map over rowData to render data cells */}
                        {Object.values(rowData).map((cellData, cellIndex) => (
                            <div key={cellIndex}>{cellData}
                                {/*{console.log({rowData})  }*/}
                            </div>
                        ))}
                    </Tr>
                )}
            </Collection>
        </Flex>
    );
}
