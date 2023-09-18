import { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Venue } from '../../../../../models';

export const useVenueData = (id) => {
    const [venue, setVenue] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchVenueData = async () => {
            try {
                const venueData = await DataStore.query(Venue, id);
                setVenue(venueData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching venue data:', error);
                setIsError(true);
                setIsLoading(false);
            }
        };

        fetchVenueData();
    }, [id]);

    return { venue, isLoading, isError };
};
