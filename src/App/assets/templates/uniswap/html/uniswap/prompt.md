refactor the code below into a react-bootstrap component that has the same look and feel as the one bellow using DRY,
clean code, and es6

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
            name="viewport"
    />
    <meta content="ie=edge" http-equiv="X-UA-Compatible"/>
    <title>Document</title>
    <link href="../Global.css" rel="stylesheet" type="text/css"/>
    <link href="uniswap.css" rel="stylesheet" type="text/css"/>
</head>
<body>
<div class="section uniswapSection">
    <div class="uniswap">
        <div class="uniswapHead">
            <div class="title">Trade</div>
            <input hidden id="uniswapSettingsTrigger" type="checkbox"/>
            <div class="buttons">
                <label for="uniswapSettingsTrigger">
                    <svg
                            class="sc-1ndknrv-0 fZuPAR"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="12" cy="12" r="3"></circle>
                        <path
                                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                        ></path>
                    </svg>
                </label>
            </div>
            <div class="uniswapSettings">
                <h4>Transaction Settings</h4>
                <div class="settingField">
                    <div class="pretext">Slippage tolerance</div>
                    <input placeholder="4.00%" type="text"/>
                </div>
                <div class="settingField">
                    <div class="pretext">Transaction deadline</div>
                    <input placeholder="20 minutes" type="text"/>
                </div>
                <h4>Interface Settings</h4>
                <div class="settingFieldInline">
                    <div class="pretext">Toggle Expert Mode</div>
                    <input hidden id="toggleExpertMode" type="checkbox"/>
                    <label
                            class="uniswapSettingsSwitch"
                            for="toggleExpertMode"
                    ></label>
                </div>
                <div class="settingFieldInline">
                    <div class="pretext">Disable Multihops</div>
                    <input hidden id="disableMultiHops" type="checkbox"/>
                    <label
                            class="uniswapSettingsSwitch"
                            for="disableMultiHops"
                    ></label>
                </div>
            </div>
        </div>
        <div class="uniswapBody">
            <div class="uniswapFields">
                <div class="uniswapField">
                    <div class="uniswapSelector">
                        <img
                                class="uniswapSelectorLogo"
                                src="https://assets.coingecko.com/coins/images/4454/thumb/0xbtc.png?1561603765"
                        />
                        <div class="uniswapSelectorText">0XBTC</div>
                        <div class="uniswapSelectorArrow">
                            <svg
                                    class="sc-33m4yg-8 khlnVY"
                                    fill="none"
                                    height="7"
                                    viewBox="0 0 12 7"
                                    width="12"
                                    xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                        d="M0.97168 1L6.20532 6L11.439 1"
                                        stroke="#AEAEAE"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    <input class="uniswapTextInput" placeholder="0.0" type="text"/>
                </div>
                <div class="uniswapArrow">
                    <svg
                            fill="none"
                            height="16"
                            stroke="#6E727D"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                    >
                        <line x1="12" x2="12" y1="5" y2="19"></line>
                        <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                </div>
                <div class="uniswapField">
                    <div class="uniswapSelector">
                        <img
                                class="uniswapSelectorLogo"
                                src="https://assets.coingecko.com/coins/images/11035/thumb/0xmnr.PNG?1587357680"
                        />
                        <div class="uniswapSelectorText">0XMR</div>
                        <div class="uniswapSelectorArrow">
                            <svg
                                    class="sc-33m4yg-8 khlnVY"
                                    fill="none"
                                    height="7"
                                    viewBox="0 0 12 7"
                                    width="12"
                                    xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                        d="M0.97168 1L6.20532 6L11.439 1"
                                        stroke="#AEAEAE"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    <input class="uniswapTextInput" placeholder="0.0" type="text"/>
                </div>
            </div>
            <button class="uniswapButton">Connect Wallet</button>
        </div>
    </div>
</div>
</body>
</html>

```

```css
/* Uniswap font */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");


.uniswapSection {
    font-family: "Inter", sans-serif;
    background-color: #f7f8fa;
    background-image: radial-gradient(
            50% 50% at 50% 50%,
            #fc077d10 0,
            rgba(255, 255, 255, 0) 100%
    );
}

.uniswap {
    max-width: 480px;
    width: 100%;
    border-radius: 24px;
    background: rgb(255, 255, 255);
    box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
    rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
}

.uniswapHead {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem 0.5rem;
}

.uniswapSettings {
    position: absolute;
    top: 48px;
    right: 16px;
    z-index: 999;
    display: none;
    grid-gap: 16px;
    padding: 16px;
    border-radius: 12px;
    background-color: rgb(237, 238, 242);
    border: 1px solid rgb(206, 208, 217);
    box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
    rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
}

#uniswapSettingsTrigger:checked ~ .uniswapSettings {
    display: grid;
}

.uniswapSettingsSwitch {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0.15rem;
    border-radius: 12px;
    background: rgb(255, 255, 255);
}

.uniswapSettingsSwitch::before,
.uniswapSettingsSwitch::after {
    padding: 0.3rem 0.4rem;
    border-radius: 9px;
}

.uniswapSettingsSwitch::before {
    content: "On";
}

#toggleExpertMode:not(:checked) ~ label[for="toggleExpertMode"]::after {
    color: #ffff;
    background-color: rgb(136, 141, 155);
}

#toggleExpertMode:checked ~ label[for="toggleExpertMode"]::before {
    color: #ffff;
    background-color: rgb(136, 141, 155);
}

#disableMultiHops:not(:checked) ~ label[for="disableMultiHops"]::after {
    color: #ffff;
    background-color: rgb(136, 141, 155);
}

#disableMultiHops:checked ~ label[for="disableMultiHops"]::before {
    color: #ffff;
    background-color: rgb(136, 141, 155);
}

.uniswapSettingsSwitch::after {
    content: "Off";
}

.settingField input {
    padding: 8px 16px;
    font-size: 16px;
    text-align: right;
    border-radius: 36px;
    border: 1px solid rgb(206, 208, 217);
    background-color: rgb(247, 248, 250);
}

.uniswapBody {
    display: grid;
    grid-gap: 12px;
    padding: 8px;
}

.uniswapArrow {
    position: relative;
    left: 50%;
    left: calc(50% - 16px);
    height: 32px;
    width: 32px;
    margin-top: -14px;
    margin-bottom: -14px;
    padding: 4px;
    border-radius: 12px;
    border: 4px solid rgb(255, 255, 255);
    background-color: rgb(247, 248, 250);
}

.uniswapField {
    display: flex;
    padding: 1rem 1rem 1.75rem;
    border-radius: 20px;
    border: 1px solid rgb(237, 238, 242);
    background-color: rgb(247, 248, 250);
}

.uniswapSelector {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 2.4rem;
    padding: 0px 8px;
    border-radius: 16px;
    background-color: rgb(255, 255, 255);
    box-shadow: rgb(0 0 0 / 8%) 0px 6px 10px;
}

.uniswapSelectorLogo {
    width: 24px;
    height: 24px;
    box-shadow: rgb(0 0 0 / 8%) 0px 6px 10px;
    border-radius: 24px;
}

.uniswapTextInput {
    flex: 1 1 auto;
    font-size: 24px;
    text-align: right;
}

.uniswapButton {
    width: 100%;
    padding: 16px;
    border-radius: 20px;
    background-color: rgb(253, 234, 241);
    color: rgb(213, 0, 102);
}
```