const User = require("../models/UsersModel");


exports.getUserServices = async () => {
    const allUsers = await User.find({});
    return allUsers
};

exports.makeAdminServices = async (email) => {
    const updateResult = await User.updateOne({ email: email }, { role: 'admin' });
    console.log(updateResult);
    return updateResult;
}