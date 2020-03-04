(
    /**
     * @param {object} window - Reference to window object to make method shorter.
     * @param {object} document - Reference to the element that will contain the script tag and to make method shorter.
     * @param {string} scriptTagName - Contains the word 'script' to make method shorter.
     * @param {string} scriptAddress - The address of the main script that we need to load.
     * @param {string} globalName - This allows dynamically define global variable name to avoid conflicts with other SDKs.
     * @param {object} scriptElement - Stores the element that will be created later (result variable to avoid declaration within the method body)
     * @param {object} otherScriptElement -  The script tag that already located in the body before which we'll inject a newly created script tag (result variable to avoid declaration within the method body)
     */
    function (window, document, scriptTagName, scriptAddress, globalName) {
        // store the name of the global variable
        window['dummyWidgetName'] = globalName;

        // creates a global variable to delegate, so it will be available before script loaded
        window[globalName] = window[globalName] || function () {
            // pushes arguments that were passed to delegate into queue
            // so they can be accessed later from the main script
            (window[globalName].q = window[globalName].q || []).push(arguments)
        };

        // dynamically create a script tag element with async execution,
        var scriptElement = document.createElement(scriptTagName);
        var otherScriptElement = document.getElementsByTagName(scriptTagName)[0];
        scriptElement.async = true;
        scriptElement.src = scriptAddress;

        // inject the script tag before first script tag found within document
        otherScriptElement.parentNode.insertBefore(scriptElement, otherScriptElement);
    })(window, document, 'script', '//github.com/fatbeard2/dummy-widget.js', 'dummyWidget');

// configurations that performed by site-owner
dummyWidget('init', { client_id: 'CLIENT_ID' });
