// Utility methods for users
const users = require('../persistance/Users');
const connectedSockets={};
const addUser = (data) => {
    const user = users.find((user) => user.userName === data.name);
    if (!user) {
        users.push({
            id: data.id,
            userName: data.name,
        });
        connectedSockets[data.name]=data.socket;
    }
};

const getUsers = () => {
    return users;
}

const getConnectedSockets =()=>{
    return connectedSockets;
}

module.exports = {
    addUser,
    getUsers,
    getConnectedSockets
}