import {useEffect, useState} from 'react';
import {DataStore} from '@aws-amplify/datastore';
import {Event as EventModel} from '../../../../../models';

// Custom hook for fetching events
export const useEvents = () => {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const models = await DataStore.query(EventModel);
                setEvents(models);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);
    return events;
};
