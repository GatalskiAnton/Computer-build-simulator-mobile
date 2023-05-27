let lastItem = null;

const setLastItem = (item) => {
    lastItem = item;
}

const getLastItem = () => {
    return lastItem;
}


export { setLastItem, getLastItem }