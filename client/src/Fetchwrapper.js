class FetchWrapper {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    get(endpoint = '') {
        return fetch(this.baseURL + endpoint)
            .then(response => response.json());
    }

    patch(endpoint, body) {
        return this._send("PATCH", endpoint, body);
    }

    post(endpoint, body) {
        return this._send("POST", endpoint, body);
    }

    delete(endpoint, body) {
        return this._send("DELETE", endpoint, body);
    }

    _send(method, endpoint, body) {
        return fetch(this.baseURL + endpoint, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(response => response.json());
    }
}

export default FetchWrapper