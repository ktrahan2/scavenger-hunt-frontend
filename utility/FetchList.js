const headers = {  "Content-Type": "application/json" }         
const baseURL = "http://localhost:7000"

export const postFetch = ( url, body ) => {
    return fetch(`${baseURL}/${url}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify( body )
    }).then(response => response.json())
}

export const getFetch = ( url ) => {
    return fetch(`${baseURL}/${url}`)
    .then(response => response.json())
}

export const putFetch = ( url, body ) => {
    return fetch(`${baseURL}/${url}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify( body )        
    }).then(response => response.json())

}

export const deleteFetch = ( url ) => {
    return fetch(`${baseURL}/${url}`, {
        method: "DELETE"
    }).then(response => response.json())

}


