// const format = (data) => {
//     let n = data[0].length;

//     let headers = new Map();
//     headers.set("GPU UTIL", 0);
//     headers.set("GPU SCLK", 1);
//     headers.set("GPU MCLK", 2);
//     headers.set("GPU TEMP", 3);
//     headers.set("GPU Hotspot", 4);
//     headers.set("GPU PWR", 5);
//     headers.set("GPU FAN", 6);
//     headers.set("FPS", 7);

//     let format_data = [[], [], [], [], [], [], [], []];

//     for (let i = 1; i < data.length; i++) {
//         for (let j = 0; j < n; j++) {
//             let h = data[0][j];
//             if (!headers.has(h)) continue;
//             else {
//                 format_data[headers.get(h)].push(data[i][j]);
//             }

//         }
//     }

//     return [headers, format_data];
// }


const avgFPS = (fpsArr) => {
    return fpsArr.reduce((acc, curr) => acc + curr, 0) / fpsArr.length;
}

const xPercentLow = (fpsArr, x) => {
    let xPercent = x / 100;
    let samples = Math.ceil(fpsArr.length * xPercent);
    let sorted = fpsArr.slice().sort();
    let xPercentLow = 0;
    for (let i = 0; i < samples; i++) {
        xPercentLow += sorted[i];
    }
    return xPercentLow / samples;
}

const format = (data) => {
    let n = data[0].length;

    let fpsArr = [];

    for (let i = 0; i < data.length; i++) {
        //data[i]["Time"] = i;
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