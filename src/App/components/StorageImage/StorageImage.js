import React, { useState, useEffect } from "react";
import { Storage } from "@aws-amplify/storage";

const AmplifyImage = ({ key, options }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const result = await Storage.get(key, options);
                setImageUrl(result);
            } catch (error) {
                console.error("Error retrieving image from storage:", error);
            }
        };

        fetchImage();
    }, [key, options]);

    return <img src={imageUrl} alt="Amplify Image" />;
};

export default AmplifyImage;
