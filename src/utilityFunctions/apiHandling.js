import {API_CONFIG} from "../config/config";

 const prepareURL = (path) => {
    return `${API_CONFIG.BASE_URL}${API_CONFIG.VERSION}${path}`;
}

 const addPathVariablesToURL = (url, pathVariables) => {
    return `${url}/${pathVariables}`;
}

const extractParameters = (path) => {
    const queryString = path.split("?")[1];
    if (!queryString) {
        return {}; // Return an empty object if there are no query parameters
    }
    const params = new URLSearchParams(queryString);
    const parameters = {};
    for (const [key, value] of params.entries()) {
        parameters[key] = value;
    }
    return parameters;
};

const addParametersToURL = (url, parameters) => {
    // Create a new URL object from the provided URL string
    const urlObject = new URL( url);

    // Check if parameters is an object
    if (parameters && typeof parameters === 'object') {
        // Iterate over the parameters object and append each key-value pair to the URL
        for (const key in parameters) {
            urlObject.searchParams.append(key, parameters[key]);
        }
    }

    // Convert the URL object back to a string and return it
    return urlObject.toString();
};

const genericLoader = async (url, parameters) => {
    const firstUrl = prepareURL(url);
    const newUrl = addParametersToURL(firstUrl, parameters);
    const response = await fetch(newUrl);
    if (response.status === 200) {
        return await response.json();
    } else {
        return await response.json();
    }

}

const apiLoader = async (url) => {
    const response = await fetch(url);
    if (response.status === 200) {
        return await response.json();
    } else {
        return await response.json();
    }
}




export{prepareURL,extractParameters,addParametersToURL,genericLoader,apiLoader, addPathVariablesToURL}