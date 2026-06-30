const API = process.env.VUE_APP_API;

export const loginRequest = (user) => {
    return new Promise((resolve, reject) => {
        fetch(`${API}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(user),
        })
        .then(response => response.json())
            .then((result) => resolve(result.data.user_token))
        .catch((error) => {
            reject(error)
        });
    });
};

export const registerRequest = (user) => {
    return new Promise((resolve, reject) => {
        fetch(`${API}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(user),
        })
            .then(async (response) => {
                const result = await response.json();

                if (!response.ok) {
                    reject(result);
                    return;
                }

                resolve(result.data.user_token);
            })
            .catch((error) => reject(error));
    });
};

export const logoutRequest = (token) => {
    return fetch(`${API}/logout`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json;charset=UTF-8",
        },
    }).then(async (response) => {
        const result = await response.json();

        if (!response.ok) {
            throw result;
        }

        return result;
    });
};

export const getProductsRequest = (token) => {
    return fetch(`${API}/products`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json;charset=UTF-8",
        },
    })
        .then(async (response) => {
            const result = await response.json();

            if (!response.ok) {
                throw result;
            }

            return result.data;
        });
};