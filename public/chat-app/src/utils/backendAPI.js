const host = "http://127.0.0.1:5000"

// const host = "https://quick-chat-server-eta.vercel.app"

 module.exports.host = host;


module.exports.registerRoute = `${host}/api/auth/register `;

module.exports.loginRoute = `${host}/api/auth/login`

module.exports.setAvatarRoute = `${host}/api/auth/set-avatar`

module.exports.getContactsRoute = `${host}/api/auth/get-contacts`

module.exports.sendMessageRoute = `${host}/api/message/add-message`

module.exports.getAllMessagesRoute = `${host}/api/message/get-message`

