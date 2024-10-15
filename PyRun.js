// Python Code Runner
async function runPythonCode(code) {
    const outputElement = document.querySelector('.output-section');
    outputElement.innerHTML = '<p>Output:</p><br>';

    try {
        const result = await window.pyodide.runPythonAsync(code);
        outputElement.innerHTML += result !== undefined ? result : (result === "" ? "No output generated." : "");
        outputElement.innerHTML += "<br><br> === Python Code Executed Successfully ===";
    } catch (error) {
        outputElement.innerHTML += `Error: ${error}`;
    }
}
