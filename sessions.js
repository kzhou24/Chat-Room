const uuid = require('uuid').v4;

const session = {};
const recordSession = {};

function addSession(username) {
  const sid = uuid();
  session[sid] = {
    username,
  };
  recordSession[sid] = {
    username,
  };

  return sid;
}

function getSessionUser(sid) {
  // Conditional Chaining operator ?.
  // Use MDN to learn more
  return session[sid]?.username;
}

function deleteSession(sid) {
  delete session[sid];
}

function getSession(){

  return session;
}
function getRecordSerssion(){

  return recordSession;
}

module.exports = {
  addSession,
  deleteSession,
  getSessionUser,
  getRecordSerssion,
  getSession
};
