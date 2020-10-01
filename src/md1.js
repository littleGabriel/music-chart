let obj = {
    a: 123
};
setTimeout(() => {
    obj = { b: 233 };
}, 0);
export { obj };
