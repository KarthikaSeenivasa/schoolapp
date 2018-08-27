export const SET_TEXT = "SET_TEXT";

export function setText(text) {
    return {
        type:SET_TEXT,
        text
    }
}

export function setThunkText(count) {
    return (dispatch, getState) => {
        console.log(getState());
        const text = getState().text.text + count + '';
        dispatch(setText(text));
    }
}