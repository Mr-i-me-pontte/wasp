function setDefaultOptions(options) {
    Chart.defaults.global.defaultFontFamily = options.defaultFontFamily;
    Chart.defaults.global.defaultFontSize = options.defaultFontSize;
    Chart.defaults.global.defaultFontColor = options.defaultFontColor;
}

function setTooltipOptions(options) {
    Chart.defaults.global.tooltips.enabled = options.enabled;
    Chart.defaults.global.tooltips.mode = options.mode;
    Chart.defaults.global.tooltips.intersect = options.intersect;
    Chart.defaults.global.tooltips.position = options.position;
}

function setScaleOptions(scale, options) {
    scale.ticks.beginAtZero = options.beginAtZero;
    scale.ticks.min = options.min;
    scale.ticks.max = options.max;
    scale.ticks.stepSize = options.stepSize;
}

function generateGradient(ctx, color1, color2, height) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
}
