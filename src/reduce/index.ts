const SET_TEXT = (state: {}, data: any) => {
    return {...state, text: data};
}

const reduce: any = {
    SET_TEXT
};

export default reduce;