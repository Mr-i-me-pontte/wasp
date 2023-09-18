// Read.js
// useResponsiveStyles.js
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { HeroSection, TrendingCollection } from "../../../../../ui-components";
import { useParams } from "react-router-dom";
import { DataStore } from "@aws-amplify/datastore";
import { Event, Venue } from "../../../../../models";

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
    <>
      <HeroSection
        event={event}
        width="100%"
        property1={property1}
        {...overrides.HeroSection}
      />
      <TrendingCollection width="100%" {...overrides.TrendingCollection} />
    </>
  );
};

export default Read;
