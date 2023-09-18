import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataStore } from "@aws-amplify/datastore";
import { Event } from "../../../../../../models";
import { Storage } from "@aws-amplify/storage";

const RelatedProject = ({ eventId }) => {
    return (
        <div className="col-md-3 col-sm-6 mb-4">
            <a href={`/events/${eventId}/related-project`}>
                <img
                    className="img-fluid"
                    src="https://via.placeholder.com/500x300"
                    alt={`Related Project`}
                />
            </a>
    );
};

const RelatedProjects = ({ eventId }) => {
    return (
        <div>
            <h3 className="my-4">Related Projects</h3>
            <div className="row">
                {[...Array(4)].map((_, index) => (
                    <RelatedProject key={index} eventId={eventId} />
                ))}
            </div>
        </div>
    );
};

const EventDetails = ({ event }) => {
    const { title, description, startDate, endDate, image, totalAvailableTickets } = event;

    return (
        <div>
            <h1 className="my-4">
                {title}
                <small>Secondary Text</small>
            </h1>
            <div className="row">
                <div className="col-md-8">
                    <img className="img-fluid" src={image} alt={title} />
                </div>
                <div className="col-md-4">
                    <h3 className="my-3">Event Description</h3>
                    <p>{description}</p>
                    <h3 className="my-3">Event Details</h3>
                    <ul>
                        <li>Start Date: {startDate}</li>
                        <li>End Date: {endDate}</li>
                        <li>Total Available Tickets: {totalAvailableTickets}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

const EventShow = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventModel = await DataStore.query(Event, eventId);
                setEvent(eventModel);
            } catch (error) {
                console.error("Error fetching event:", error);
                setError(error);
            }
        };

        fetchEvent();
    }, [eventId]);

    if (error) {
        return <div>Error loading event. Please try again later.</div>;
    }

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <EventDetails event={event} />
            <RelatedProjects eventId={eventId} />
        </div>
    );
};

export default EventShow;
