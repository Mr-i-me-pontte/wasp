import React, { useEffect, useState } from "react";
import { Storage } from "@aws-amplify/storage";

// const AmplifyImage = ({imageKey, options, altText}) => {
//     const [imageUrl, setImageUrl] = useState(null);
//     const [error, setError] = useState(false);
//
//     useEffect(() => {
//         const fetchImage = async () => {
//             try {
//                 const url = await Storage.get(imageKey, options);
//                 setImageUrl(url);
//             } catch (error) {
//                 console.error('Error retrieving image from storage:', error);
//                 setError(true);
//             }
//         };
//
//         fetchImage();
//     }, [imageKey, options]);
//
//     if (error || !imageUrl) {
//         return <span>Error loading image</span>;
//     }
//
//     return <Card.Img src={imageUrl} alt={altText}/>;
// };

const AmplifyImage = ({ imageKey, options, altText }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await Storage.get(imageKey, options);
        setImageUrl(url);
      } catch (error) {
        setError(true);
      }
    };

    fetchImage();
  }, [imageKey, options]);

  if (error || !imageUrl) {
    return <span>Error loading image</span>;
  }

  return <img src={imageUrl} alt={altText} className="card-img-top" />;
};

export default AmplifyImage;
