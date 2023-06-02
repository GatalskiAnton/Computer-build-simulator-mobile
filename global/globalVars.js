let lastItem = null;

const setLastItem = (item) => {
    lastItem = item;
}

const getLastItem = () => {
    return lastItem;
}

const IP = "192.168.129.225";

export { setLastItem, getLastItem, IP }