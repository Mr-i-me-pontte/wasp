import React from "react";
import { Card } from "react-bootstrap";

const CardComponent = ({ data, children }) => {
    // const { title, description, image } = data;

    return (
        <Card className="card">
            <Card.Img variant="top" src={data?.image} />
            <Card.Body>
                {data?.title && <Card.Title>{data?.title}</Card.Title>}
                {data?.description &&<Card.Text>{data?.description}</Card.Text>}
                {children}
            </Card.Body>
        </Card>
    );
};

export default CardComponent;


// import React from "react";
// import { Card } from "react-bootstrap";
//
// const CustomCard = ({ data }) => {
//     return (
//         <Card className="card-stats">
//             <Card.Body>
//                 <div className="row">
//                     <div className="col-5">
//                         <div className="icon-big text-center">
//                             <i className={`fas fa-${data.icon} text-primary`}></i>
//                         </div>
//                     </div>
//                     <div className="col-7">
//                         <div className="numbers">
//                             <p className="card-category">{data.category}</p>
//                             <Card.Title as="h4">{data.title}</Card.Title>
//                             <p>{data.description}</p>
//                         </div>
//                     </div>
//                 </div>
//             </Card.Body>
//             <Card.Footer>
//                 <hr />
//                 <div className="stats">
//                     <i className="far fa-clock"></i> Updated {data.updatedAt}
//                 </div>
//             </Card.Footer>
//         </Card>
//     );
// };
//
// export default CustomCard;
