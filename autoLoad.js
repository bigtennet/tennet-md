const fs = require('fs');
const path = require('path');
const {
  TAIRA_TECH_CODE
} = require('./pair');
async function autoLoad() {
  console.log("auto reconnecting users...");
  const sessionDir = path.join(__dirname, 'lib', 'paired-users');
  if (!fs.existsSync(sessionDir)) {
    console.log("No user sessions found.");
    return;
  }
  try {
    const users = fs.readdirSync(sessionDir);
    if (users.length === 0) {
      console.log("No users to reconnect. Session directory is empty.");
      return;
    }
    console.log(`Found ${users.length} users. Attempting to reconnect...`);
    for (const user of users) {
      console.log(`Attempting to connect user: ${user}`);
      await TAIRA_TECH_CODE(user, null);
    }
    console.log("users Reconnection successful.");
  } catch (err) {
    console.error("Error during auto reconnection:", err);
  }
}
module.exports = {
  autoLoad
};