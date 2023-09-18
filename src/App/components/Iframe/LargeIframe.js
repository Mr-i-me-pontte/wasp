import React from 'react';

const LargeIframe =  ({ url = ""})=>(
    <iframe
        id="Iframe"
        title="Iframe"
        style={{
            height: "100vh",
            width: "100%",
            overflow: "hidden !important"
        }}
        scrolling="no"
        src={url}
    />
)

export default LargeIframe;