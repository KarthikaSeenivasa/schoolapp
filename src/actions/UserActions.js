import Axios from "axios";

export const SET_IS_AUTHENTICATED = "SET_IS_AUTHENTICATED";

export function handleLogin(usernameOrEmail, password) {

    return (dispatch, getState) => {
        const params = {
            usernameOrEmail,
            password
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true

        }
        debugger;
        Axios.post('http://shyam-server:8080/api/auth/signin', JSON.stringify(params), config)
            .then((response) => {
                console.log(response);
                dispatch(setIsAuthenticated(true));
            }).catch((err) => {
                console.log(err);
            });
    }
}

function setIsAuthenticated(isAuthenticated) {
    return {
        type: SET_IS_AUTHENTICATED,
        isAuthenticated
    }
}