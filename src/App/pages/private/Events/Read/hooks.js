import { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Event, Venue } from '../../../../../models';
import { toast } from 'react-toastify';

export const useEvent = (eventId) => {
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [venue, setVenue] = useState(null);
    const [ticketTypes, setTicketTypes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const eventModel = await DataStore.query(Event, eventId);
                const tt = await eventModel.TicketTypes.toArray();
                setEvent(eventModel);
                setTicketTypes(tt);

                if (eventModel?.venueID) {
                    const venueModel = await DataStore.query(Venue, eventModel.venueID);
                    setVenue(venueModel);
                }
            } catch (error) {
                setError('There was an error loading data. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [eventId]);

    return { event, venue, ticketTypes, isLoading, error };
};

export const useMetaMask = () => {
    const isMetaMaskConnected = () => {
        // Check if MetaMask is connected or logged in
        // You can implement your own logic here to check the connection status
        // For example:
        // return window.ethereum && window.ethereum.isConnected();
        // return false; // Placeholder logic
        return true; // Placeholder logic
    };

    const toastError = (message) => {
        toast.error(message);
    };

    return { isMetaMaskConnected, toastError };
};

export const usePurchase = () => {
    const [showModal, setShowModal] = useState(false);
    const [ticketCount, setTicketCount] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const isMetaMaskConnected=()=>true
    const handleBuyTickets = () => {
        if (isMetaMaskConnected()) {
            setShowModal(true);
        } else {
            toast.error('Please log in to MetaMask first.');
        }
    };

    const handlePurchase = () => {
        setIsLoading(true);
        // Simulate async operation
        setTimeout(() => {
            setIsLoading(false);
            setShowModal(false);
            setTicketCount(1);
        }, 2000);
    };

    return { showModal, ticketCount, handleBuyTickets, handlePurchase, setShowModal, setTicketCount };
};
