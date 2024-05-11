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
    }else if(response.status === 500){
        throw new Error("Something went wrong")
    } else {
        return await response.json();
    }
}

const apiLoader = async (url,source) => {
    const response = await fetch(url, {
        headers: {
            "Authorization": localStorage.getItem("token") || ""
        },

    });
    if (response.status === 200) {
        return await response.json();
    } else if(response.status === 500){
        throw new Error("Something went wrong")
    }else if(response.status === 401){
        throw new Response(JSON.stringify({header: "You aren't allowed to be here ❌", description: "401 Unauthorized"}), {status: 401});
    }else if(response.status === 404){
        throw new Response(JSON.stringify({header: `${source} Not Found 🔎`, description:` "We couldn't find the ${source} you've looking for..."`}), {status: 404});
    }else {
        return await response.json();
    }

}

export const fileDownloadHandler = async (url) => {
    const preparedUrl = prepareURL(url);
    fetch(preparedUrl)
        .then(response => {
            return response.blob(); // Convert response to a blob
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'attendance.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // Remove the link after download
        })

}

export const deleteHandler = async (url,source) => {
    const response = await fetch(url, {
        method: 'DELETE',
    headers: {
        "Authorization": localStorage.getItem("token") || ""
    },
    });

    if (response.status === 202) {
        return response.status;
    } else if(response.status === 500){
        throw new Error("Something went wrong")
    }else if(response.status === 401){
        throw new Response(JSON.stringify({header: "You aren't allowed to be here ❌", description: "401 Unauthorized"}), {status: 401});
    }else if(response.status === 404){
        throw new Response(JSON.stringify({header: `${source} Not Found 🔎`, description:` "We couldn't find the ${source} you've looking for..."`}), {status: 404});
    }else if(response.status === 417){
        return response.status;
    }else {
        return await response.json();
    }
}

export const convertDateFormat = (originalDate) => {
    const [year, month, day] = originalDate.split('-');
    return `${day}-${month}-${year}`; // Assuming the input date format is YYYY-MM-DD
};




export{prepareURL,extractParameters,addParametersToURL,genericLoader,apiLoader, addPathVariablesToURL}