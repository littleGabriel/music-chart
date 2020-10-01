import {obj} from "./md1.js"
// 引入 ECharts
var echarts = require('echarts/lib/echarts');
import light from "echarts/src/theme/light";
// require("echarts/lib/component/dataset");
require("echarts/lib/chart/line");
require("echarts/lib/chart/bar");
// require("echarts/lib/chart/pie");
// require("echarts/lib/chart/scatter");
// require("echarts/lib/chart/radar");
// require("echarts/lib/chart/map");
// require("echarts/lib/chart/tree");
// require("echarts/lib/chart/treemap");
// require("echarts/lib/chart/graph");
// require("echarts/lib/chart/gauge");
// require("echarts/lib/chart/funnel");
// require("echarts/lib/chart/parallel");
// require("echarts/lib/chart/sankey");
// require("echarts/lib/chart/boxplot");
// require("echarts/lib/chart/candlestick");
// require("echarts/lib/chart/effectScatter");
// require("echarts/lib/chart/lines");
// require("echarts/lib/chart/heatmap");
// require("echarts/lib/chart/pictorialBar");
// require("echarts/lib/chart/themeRiver");
// require("echarts/lib/chart/sunburst");
// require("echarts/lib/chart/custom");
// require("echarts/lib/component/grid");
// require("echarts/lib/component/polar");
// require("echarts/lib/component/geo");
// require("echarts/lib/component/singleAxis");
// require("echarts/lib/component/parallel");
// require("echarts/lib/component/calendar");
// require("echarts/lib/component/graphic");
// require("echarts/lib/component/toolbox");
// require("echarts/lib/component/tooltip");
// require("echarts/lib/component/axisPointer");
// require("echarts/lib/component/brush");
// require("echarts/lib/component/title");
// require("echarts/lib/component/timeline");
// require("echarts/lib/component/markPoint");
// require("echarts/lib/component/markLine");
// require("echarts/lib/component/markArea");
// require("echarts/lib/component/legendScroll");
// require("echarts/lib/component/legend");
// require("echarts/lib/component/dataZoom");
// require("echarts/lib/component/dataZoomInside");
// require("echarts/lib/component/dataZoomSlider");
// require("echarts/lib/component/visualMap");
// require("echarts/lib/component/visualMapContinuous");
// require("echarts/lib/component/visualMapPiecewise");
// require("zrender/lib/vml/vml");
require("zrender/lib/svg/svg");

//MDC
import {MDCTopAppBar} from '@material/top-app-bar';
import {MDCRipple} from '@material/ripple';
const topAppBar = new MDCTopAppBar(document.querySelector('.mdc-top-app-bar'));
const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action,.mdc-fab';
const ripples = [].map.call(document.querySelectorAll(selector), function(el) {
    return new MDCRipple(el);
});

console.log(obj);  //{a: 123}
setTimeout(() => {
    console.log(obj)  //{b: 233}
}, 2000);

const aCtx = new (window.AudioContext || window.webkitAudioContext)();
const audio = document.getElementById('audio');
let source = aCtx.createMediaElementSource(audio);
const analyser = aCtx.createAnalyser();
analyser.fftSize = 256;
source.connect(analyser);
analyser.connect(aCtx.destination);
let bufferLength = analyser.frequencyBinCount;
let tdmArray = new Uint8Array(bufferLength);
let frqArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(tdmArray);
analyser.getByteFrequencyData(frqArray);

var myChart = echarts.init(document.getElementById('main'),light, {renderer: 'svg'});
var option = {
    xAxis: {
        show: false,
        type: 'category'
    },
    yAxis: {show:false,},
    grid:{
        height: '100%',
        width: '100%',
        left: 0,
        top: 0
    },
    series: [{
        name: 'Frequency',
        type: 'bar',
        color: '#90CAF9',
        data: Array.from(frqArray)
    },
    {
        name: 'TimeDomain',
        type: 'line',
        symbol: 'none',
        color: '#442b2d',
        data: Array.from(tdmArray),
        smooth: true
    }]
};
myChart.setOption(option);

let audioInterval;
audio.onplay = ()=>{
    audioInterval = setInterval(()=>{
        analyser.getByteTimeDomainData(tdmArray);
        analyser.getByteFrequencyData(frqArray);
        myChart.setOption({
            series: [{
                name: 'Frequency',
                data: Array.from(frqArray).filter((num,i)=>{
                    if (i%2===0){
                        return (tdmArray[i]+tdmArray[i+1])/2;
                    }
                })
            },
            {
                name: 'TimeDomain',
                data: Array.from(tdmArray).filter((num,i)=>{
                    if (i%2===0){
                        return (tdmArray[i]+tdmArray[i+1])/2;
                    }
                })
            }]
        });
    },200);
};

audio.onended = ()=>{
    clearInterval(audioInterval);
};

document.getElementById('file').addEventListener(
    'change',onInputFileChange
);
function onInputFileChange() {
    var file = document.getElementById('file').files[0];
    var url = URL.createObjectURL(file);
    document.getElementById("audio").src = url;
    document.getElementById("musicName").innerText = file.name;
}

document.getElementById('refreshBt').addEventListener('click',()=>{
    document.getElementById('file').click();
});

function ranArry() {
    let arr = new Array();
    for (let i = 0;i<128;i++){
        arr.push((Math.random()*1000).toFixed(1))
    }
    return arr;
}
