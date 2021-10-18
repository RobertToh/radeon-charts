const avgFPS = (fpsArr) => {
    return +(fpsArr.reduce((acc, curr) => acc + curr, 0) / fpsArr.length).toFixed(1);
}

const xPercentLow = (fpsArr, x) => {
    let xPercent = x / 100;
    let samples = Math.ceil(fpsArr.length * xPercent);
    let sorted = fpsArr.slice().sort((a, b) => a - b);
    let xPercentLow = 0;
    for (let i = 0; i < samples; i++) {
        xPercentLow += sorted[i];
    }
    return +(xPercentLow / samples).toFixed(1);
}

const format = (data) => {
    let n = data[0].length;

    let fpsArr = [];

    for (let i = 0; i < data.length; i++) {
        data[i]["Time"] = i;
        if (data[i]["FPS"] != undefined) fpsArr.push(data[i]["FPS"]);
    }

    let avg = avgFPS(fpsArr);
    let onePercentLow = xPercentLow(fpsArr, 1);
    let pointOneLow = xPercentLow(fpsArr, 0.1);

    return [data, avg, onePercentLow, pointOneLow];
}

exports.format = format;
exports.avgFps = avgFPS;
exports.xPercentLow = xPercentLow;