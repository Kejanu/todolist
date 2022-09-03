export function fetcher(input: RequestInfo | URL, method: Method, body?: any) {
    return fetch(input, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            if (response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json();
                }
                return response.text().then(text => {
                    return text;
                });
            }

            return response.text().then(text => {
                throw new Error(text);
            });
        })
}

export type Method = "GET" | "POST" | "PUT" | "DELETE";
