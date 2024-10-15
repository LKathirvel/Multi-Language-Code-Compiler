// JavaScript Code Runner
function runJavaScriptCode(code) {
    let output = '';
    const originalConsoleLog = console.log;
    console.log = function(message) {
        output += message + '<br>';
    };

    try {
        eval(code);
        output += '<br><br><b>=== Javascript Code Executed Successfully ===</b>';
        return output || 'Code executed successfully, but no direct output.';
    } catch (error) {
        return `Error: ${error.message}`;
    } finally {
        console.log = originalConsoleLog;
    }
}
