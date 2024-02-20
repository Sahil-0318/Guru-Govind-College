const findUser = async(model, key, value) =>{
    return await model.findOne({key, value})
}

export {
    findUser
}