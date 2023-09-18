import React, { useState } from 'react';

const withRadioGroup = (Component) => {
    return function RadioGroup(props) {
        const [value, setValue] = useState(props.defaultValue);
        const onChange = (event) => setValue(event.target.value);
        return <Component {...props} value={value} onChange={onChange} />;
    };
};

const RadioButtonGroup = withRadioGroup(({ name, value, options, onChange }) => {
    return (
        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
            {options.map((option) => (
                <React.Fragment key={option.value}>
                    <input
                        type="radio"
                        className="btn-check"
                        name={name}
                        id={option.value}
                        value={option.value}
                        checked={option.value === value}
                        onChange={onChange}
                        autoComplete="off"
                    />
                    <label className="btn btn-white px-3 mb-0" htmlFor={option.value}>
                        {option.label}
                    </label>
                </React.Fragment>
            ))}
        </div>
    );
});

const BalancesOverTimeCard = () => {
    const options = [
        { value: '12months', label: '12 months' },
        { value: '30days', label: '30 days' },
        { value: '7days', label: '7 days' },
    ];
    const [selectedOption, setSelectedOption] = useState(options[0].value);

    return (
        <div className="col-lg-4 col-md-6 mb-md-0 mb-4">
            <div className="card shadow-xs border h-100">
                <div className="card-header pb-0">
                    <h6 className="font-weight-semibold text-lg mb-0">Balances over time</h6>
                    <p className="text-sm">Here you have details about the balance.</p>
                    <RadioButtonGroup
                        name="balancesRadio"
                        defaultValue={options[0].value}
                        options={options}
                        onChange={(event) => setSelectedOption(event.target.value)}
                    />
                </div>
                <div className="card-body py-3">
                    <div className="chart mb-2">
                        <canvas
                            id="chart-bars"
                            className="chart-canvas"
                            height="480"
                            width="956"
                            style={{ display: 'block', boxSizing: 'border-box', height: '240px', width: '478px' }}
                        ></canvas>
                    </div>
                    <button className="btn btn-white mb-0 ms-auto">View report</button>
                </div>
            </div>
        </div>
    );
};

export default BalancesOverTimeCard;
