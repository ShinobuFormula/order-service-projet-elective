exports.getBody = (body) => {
    let obj = {}
    for(const [name, value] of Object.entries(body)){
        if(name !== 'roleToken'){
            obj[name] = value
        }
    }
    return obj
}