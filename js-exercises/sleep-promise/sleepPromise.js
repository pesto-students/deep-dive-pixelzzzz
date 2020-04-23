function sleep(ms){
    const promise = new Promise(res=>setTimeout(res,ms));
    const innerFunction=(value)=>{
       return promise.then(()=>value)
    }
    innerFunction.then=promise.then.bind(promise);
    innerFunction.catch=promise.catch.bind (promise);
    return innerFunction;
}
export { sleep };

