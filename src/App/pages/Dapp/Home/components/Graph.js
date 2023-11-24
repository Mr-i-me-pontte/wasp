// TradingViewWidget.jsx

import React, { useEffect, useRef } from 'react';
import {Container} from "react-bootstrap";

let tvScriptLoadingPromise;

export default function Graph() {
    const onLoadScriptRef = useRef();

    useEffect(
        () => {
            onLoadScriptRef.current = createWidget;

            if (!tvScriptLoadingPromise) {
                tvScriptLoadingPromise = new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.id = 'tradingview-widget-loading-script';
                    script.src = 'https://s3.tradingview.com/tv.js';
                    script.type = 'text/javascript';
                    script.onload = resolve;

                    document.head.appendChild(script);
                });
            }

            tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

            return () => onLoadScriptRef.current = null;

            function createWidget() {
                if (document.getElementById('tradingview_1a056') && 'TradingView' in window) {
                    new window.TradingView.widget({
                        autosize: true,
                        symbol: "BINANCE:BTCBRL",
                        interval: "D",
                        timezone: "Etc/UTC",
                        theme: "light",
                        style: "1",
                        locale: "en",
                        enable_publishing: false,
                        allow_symbol_change: true,
                        container_id: "tradingview_1a056"
                    });
                }
            }
        },
        []
    );

    return (
        <Container className='tradingview-widget-container'>
            <div id='tradingview_1a056' />
            <div className="tradingview-widget-copyright">
                <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a>
            </div>
        </Container>
    );
}



// Graph.js
// export const Graph = ({ size = 6 }) => (
//     <Col className="text-center" md={size}>
//         <h3>Graph</h3>
//         <Row className="p-3 h-50">
//             <TradingViewWidget
//                 symbol="BINANCE:BTCUSDT"
//                 interval="D"
//                 theme="dark"
//                 autosize
//             />
//         </Row>
//     </Col>
// );
