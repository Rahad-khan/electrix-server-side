const User = require("../models/UsersModel");


exports.getUserServices = async () => {
    const allUsers = await User.find({});
    return allUsers
};

exports.makeAdminServices = async (email) => {
    const updateResult = await User.updateOne({ email: email }, { role: 'admin' });
    return updateResult;
}
exports.userByMailServices = async (email) => {
    const user = await User.findOne({ email });
    return user;
};
exports.createUserService = async (email, data) => {
    const user = await User.updateOne({ email }, { $set: data }, { upsert: true });
    return user;
};