import { drawGraph, checkHit } from './graph.js';
import {validate } from './validator.js';
import {getHistory, saveToHistory, clearHistory, formatDate} from './history.js';

const canvas = document.getElementById('graph');
const ctx = canvas.getContext('2d');

const form = document.getElementById('graph-form');
const inputX = document.getElementById('input-x');
const inputY = document.getElementById('input-y');
const errorX = document.getElementById('error-x');
const errorY = document.getElementById('error-y');
const errorR = document.getElementById('error-r');

const resultsBody = document.getElementById('results-body');
const clearBtn = document.getElementById('clear-button');

document.getElementById('x-buttons').addEventListener('click', (e) =>{
    if (e.target.classList.contains('button-x')){
        document.querySelectorAll('.button-x').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        inputX.value = e.target.dataset.value;
    }
})

function getR(){
    const selectedR = document.querySelector('input[name="r"]:checked');
    return selectedR ? parseFloat(selectedR.value) : null;
}

function refresh(){
    const history = getHistory();
    const currentR = getR();

    drawGraph(ctx, canvas.width, canvas.height, currentR, history);
    
    resultsBody.innerHTML = '';
    history.forEach(dot => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${dot.x}</td>
        <td>${dot.y}</td>
        <td>${dot.r}</td>
        <td class="${dot.hit ? 'status-hit' : 'status-miss'}">${dot.hit ? 'Попадание' : 'Промах'}</td>
        <td>${formatDate(dot.timeStamp)}</td>`;
        resultsBody.appendChild(row);
    });
}

document.querySelectorAll('input[name="r"]').forEach(radio => {
    radio.addEventListener('change', refresh);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    errorX.textContent = '';
    errorY.textContent = '';
    errorR.textContent = '';

    const xVal = inputX.value;
    const yVal = inputY.value;
    const selectedR = document.querySelector('input[name="r"]:checked');
    const rVal = selectedR ? selectedR.value : null;

    const {isValid, errors} = validate(xVal,yVal,rVal);

    if (!isValid){
        errorX.textContent = errors.x;
        errorY.textContent = errors.y;
        errorR.textContent = errors.r;
        return;
    }

    const x = parseFloat(xVal);
    const y = parseFloat(yVal);
    const r = parseFloat(rVal);

    const isHit = checkHit(x,y,r);

    const record = {
        x:x,
        y:y,
        r:r,
        hit:isHit,
        timeStamp:new Date().toISOString()
    }
    saveToHistory(record);
    refresh();
});

clearBtn.addEventListener('click', ()=>{
    clearHistory();
    refresh();
})

refresh();