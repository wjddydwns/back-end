const randomStringGen = () =>{
    const randomString = Math.random().toString(36).substring(2,11);
    return randomString
}
module.exports = {randomStringGen}