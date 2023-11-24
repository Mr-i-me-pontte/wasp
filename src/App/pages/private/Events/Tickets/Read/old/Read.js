// Read.js
// useResponsiveStyles.js
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  HeroSection,
  HighlightedNFT,
  TrendingCollection,
  TrendingCollectionTopRatedArtistsAdditionalInfo,
} from "../../../../../ui-components";
import { useParams } from "react-router-dom";
import { DataStore } from "@aws-amplify/datastore";
import { Event, Venue } from "../../../../../models";
import { Col, Container, Row } from "react-bootstrap";
import { View } from "@aws-amplify/ui-react";

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

const calculateScreenSize = (width) => {
  return width < 600 ? "sm" : "md";
};

const useResponsiveStyles = (variants) => {
  const [windowWidth] = useWindowSize();
  const screenSize = calculateScreenSize(windowWidth);
  return (
    variants.find((v) => v.variantValues.size === screenSize)?.overrides || {}
  );
};

const Read = (props) => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [venue, setVenue] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const eventModel = await DataStore.query(Event, eventId);
      setEvent(eventModel);

      if (eventModel?.venueID) {
        const venueModel = await DataStore.query(Venue, eventModel.venueID);
        setVenue(venueModel);
      }
    } catch (error) {
      setError("There was an error loading data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const variants = [
    {
      variantValues: { size: "sm" },
      overrides: {
        HeroSection: {
          // padding: "40px 0px 40px 0px",
          // width: "100%",
        },
        TrendingCollection: {
          marginBottom: "30px",
        },
      },
    },
    {
      variantValues: { size: "md" },
      overrides: {
        HeroSection: {
          // padding: "80px 0px 80px 0px",
          // width: "100%",
        },
        TrendingCollection: {
          marginBottom: "60px",
        },
      },
    },
  ];

  const overrides = useResponsiveStyles(variants);
  const property1 =
    overrides.HeroSection.padding === "40px 0px 40px 0px" ? "SM" : "MD";

  return (
    <View>
      <Container
        fluid
        bsPrefix={"primary"}
        style={{ backgroundColor: "rgb(43, 43, 43)" }}
      >
        {/*<Row>*/}
        {/*  <Col>*/}
        {/*    <HeroSection*/}
        {/*      event={event}*/}
        {/*      width="100%"*/}
        {/*      property1={property1}*/}
        {/*      {...overrides.HeroSection}*/}
        {/*    />*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        <Row>
          <Col>
            <Container>

            <Row>
              <Col>
                <p>{event?.title}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <TrendingCollectionTopRatedArtistsAdditionalInfo />
              </Col>
            </Row>
            </Container>
          </Col>
          <Col>
            <HighlightedNFT />
          </Col>
        </Row>
        <TrendingCollection width="100%" {...overrides.TrendingCollection} />
      </Container>
    </View>
  );
};

export default Read;
