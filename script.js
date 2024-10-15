// Load Pyodide on initial load
async function loadPyodideAndPackages() {
    window.pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/"
    });
}

loadPyodideAndPackages();

const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const img3 = document.getElementById('img3');
const outputArea = document.querySelector('.output-section');
const codeEditor = document.getElementById('codeEditor');
const lineNumbers = document.getElementById('lineNumbers');

let mode = 1;

function updateLineNumbers() {
    const lines = codeEditor.value.split('\n').length;
    lineNumbers.innerHTML = '';
    for (let i = 1; i <= lines; i++) {
        lineNumbers.innerHTML += i + '<br>';
    }
}

codeEditor.addEventListener('input', updateLineNumbers);

img1.addEventListener('click', () => {
    mode = 1;
    codeEditor.value = '//Write javascript code here...\nconsole.log("Developed By KATHIR");';
    updateLineNumbers();
});

img2.addEventListener('click', () => {
    mode = 2;
    codeEditor.value = '#Write Python code here...\nprint("Developed By KATHIRVEL L")';
    updateLineNumbers();
});

img3.addEventListener('click', () => {
    mode = 3;
    codeEditor.value = '//Write PHP code here...\n<?php echo "Developed By KATHIRVEL"; ?>';
    updateLineNumbers();
});

document.querySelector('.run-btn').addEventListener('click', () => {
    let code = codeEditor.value;
    outputArea.innerHTML = '<p>Output:</p><br>';
    if (mode === 1) {
        outputArea.innerHTML += runJavaScriptCode(code);
    } else if (mode === 2) {
        runPythonCode(code);
    } else if (mode === 3) {
        outputArea.innerHTML += runPHPCode(code);
    }
});

const toggleBtn = document.getElementById('toggleBtn');
const toggleIcon = document.getElementById('toggleIcon');

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    document.querySelector('.header').classList.toggle('dark-mode');
    document.querySelector('.editor').classList.toggle('dark-mode');
    document.querySelector('.output-section').classList.toggle('dark-mode');
    document.querySelector('.line-numbers').classList.toggle('dark-mode');
    codeEditor.classList.toggle('dark-mode');

    toggleIcon.src = toggleIcon.src.includes('darkmode1.png') ? './img/lightmode.png' : './img/darkmode1.png';
});
