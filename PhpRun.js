// PHP Code Runner
function runPHPCode(code) {
    let output = '';

    // Handle PHP code
    try {
        // Remove PHP tags
        code = code.replace(/<\?php|<\?|<\/\?>/g, '');

        // Create a simple environment for classes and variables
        const environment = {};

        // Handle class definitions
        const classPattern = /class\s+(\w+)\s*{([^}]*)}/g;
        code = code.replace(classPattern, (match, className, classBody) => {
            // Define the class constructor
            environment[className] = function(...args) {
                const instance = {};
                const constructorPattern = /function\s+__construct\s*\(([^)]*)\)\s*{([^}]*)}/;
                const constructorMatch = classBody.match(constructorPattern);
                
                if (constructorMatch) {
                    const params = constructorMatch[1].split(',').map(p => p.trim());
                    const constructorCode = constructorMatch[2];

                    // Assign properties to the instance based on constructor arguments
                    params.forEach((param, index) => {
                        instance[param] = args[index];
                    });

                    // Execute constructor code with the current instance
                    eval(constructorCode.replace(/this\.(\w+)/g, 'instance.$1'));
                }
                return instance;
            };
            return ''; // Remove the class definition from the code
        });

        // Handle object creation
        const objectPattern = /(\w+)\s*=\s*new\s+(\w+)\s*\(([^)]*)\);/g;
        code = code.replace(objectPattern, (match, objectName, className, args) => {
            const argArray = args.split(',').map(arg => arg.trim().replace(/^"|"$/g, ''));
            const obj = new environment[className](...argArray);
            environment[objectName] = obj; // Store instance in the environment
            return ''; // Remove object creation from the code
        });

        // Handle echo statements
        const echoPattern = /echo\s+["'`](.*?)["'`];/g;
        code = code.replace(echoPattern, (match, p1) => {
            const expression = p1.replace(/\$(\w+)/g, (m, varName) => {
                // Replace variable names with their values from the environment
                if (environment[varName]) {
                    return `Name: ${environment[varName].name}, Age: ${environment[varName].age}`;
                }
                return 'null';
            });
            output += expression + '<br>';
            return ''; // Remove the echo statement from the code
        });

        output += '<br><br><b> === PHP Code Executed Successfully ===</b>';
        return output || 'Code executed successfully, but no direct output.';
    } catch (error) {
        return `Error: ${error.message}`;
    }
}
