import React from "react";
import SwiperCore from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
// import "swiper/swiper-bundle.min.css";

// import "bootstrap/dist/css/bootstrap.min.css";
import "./cardswiper.scss";
import {EffectCards, Navigation} from "swiper/modules";

SwiperCore.use([Navigation, EffectCards]);

const cards = [{
    id: 1, image: "https://picsum.photos/800/500?random=1", name: "Secured", category: "Banking",
}, {
    id: 2, image: "https://picsum.photos/800/500?random=2", name: "Cyber", category: "",
}, {
    id: 3, image: "https://picsum.photos/800/500?random=3", name: "Alpha", category: "Blockchain",
}, {
    id: 4, image: "https://picsum.photos/800/500?random=4", name: "Beta", category: "Web3",
}, {
    id: 5, image: "https://picsum.photos/800/500?random=5", name: "Gama", category: "Design",
},];

function Card({card}) {
    return (<div
            className="card card-background shadow-none border-radius-xl card-background-after-none align-items-start mb-0">
            <div className="card-body text-start px-3 py-0 w-100">
                <div
                    className="full-background bg-cover"
                    style={{backgroundImage: `url('${card.image}')`}}
                ></div>
                <div className="row mt-2 h-100">
                    <div className="col-sm-3 mt-auto">
                        <h4 className="text-dark font-weight-bolder">#{card.id}</h4>
                        <p className="text-dark opacity-6 text-xs font-weight-bolder mb-0">
                            Name
                        </p>
                        <h5 className="text-dark font-weight-bolder">{card.name}</h5>
                    </div>
                    <div className="col-sm-3 ms-auto mt-auto">
                        <p className="text-dark opacity-6 text-xs font-weight-bolder mb-0">
                            Category
                        </p>
                        <h5 className="text-dark font-weight-bolder">{card.category}</h5>
                    </div>
                </div>
            </div>
        </div>);
}

function CardSlider() {
    return (<div className="container my-5">
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <div className="position-relative overflow-hidden">
                        <Swiper
                            effect="cards"
                            grabCursor={true}
                            navigation={{
                                nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev",
                            }}
                        >
                            {cards.map((card) => (<SwiperSlide key={card.id}>
                                    <Card card={card}/>
                                </SwiperSlide>))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>);
}

export default CardSlider;
