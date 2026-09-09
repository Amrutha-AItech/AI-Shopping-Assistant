export const saveToken = (tokens) => {
    localStorage.setItem("access_token", tokens.access);
    localStorage.setItem("refresh_token", tokens.refresh);

    window.dispatchEvent(new Event("auth-change"));
};

export const clearTokens = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.dispatchEvent(new Event("auth-change"));
};

export const getAccessToken = () => {
    return localStorage.getItem("access_token");
};

export const authFetch = async (url, options = {}) => {
    let token = getAccessToken();

    const makeRequest = async (accessToken) => {
        const headers = options.headers ? { ...options.headers } : {};

        if (accessToken) {
            headers["Authorization"] = `Bearer ${accessToken}`;
        }

        headers["Content-Type"] = "application/json";

        return fetch(url, {
            ...options,
            headers,
        });
    };

    let response = await makeRequest(token);

    if (response.status !== 401) {
        return response;
    }

    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
        clearTokens();
        return response;
    }

    try {
        const refreshResponse = await fetch(
            `${import.meta.env.VITE_DJANGO_BASE_URL}/api/token/refresh/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    refresh: refreshToken,
                }),
            }
        );

        if (!refreshResponse.ok) {
            clearTokens();
            return response;
        }

        const data = await refreshResponse.json();

        localStorage.setItem("access_token", data.access);

        token = data.access;

        response = await makeRequest(token);

        return response;
    } catch (error) {
        console.error("Token refresh failed:", error);
        clearTokens();
        return response;
    }
};