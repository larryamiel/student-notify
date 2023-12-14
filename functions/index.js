const {onCall} = require("firebase-functions/v2/https");
// require and initialize the admin SDK
const admin = require("firebase-admin");
admin.initializeApp();

const axios = require("axios");
const functions = require("firebase-functions");

exports.sendScheduleMessage = onCall(async (request) => {
  const data = request.data;

  // schedule_id
  const scheduleId = data.schedule_id;

  // get schedule
  const snapshot = admin.firestore().collection("schedules")
      .doc(scheduleId).get();
  const schedule = (await snapshot).data();

  // get all users of this department
  const snapshot2 = admin.firestore().collection("users")
      .where("department", "==", schedule.department).get();
  const users = (await snapshot2).docs.map((doc) => doc.data());

  const numbers = [];
  users.forEach(async (user) => {
    const number = user.number;
    numbers.push(number);
  });

  // send SMS to all users of this department
  const url = "https://api.semaphore.co/api/v4/messages";

  const data2 = {
    apikey: process.env.SEMAPHORE_API_KEY,
    number: numbers.join(","), // comma separated list of phone numbers
    message: `Good morning! ${schedule.label} is scheduled 
    for today at ${schedule.from.toDate().toLocaleDateString()}.`,
    sendername: "PWF",
  };

  const headers = {
    "Content-Type": "application/json",
  };

  await axios.post(url, data2, {headers: headers});
});

// Trigger a function when time is 5:00 AM UTC+8 everyday
exports.scheduledFunction = functions.pubsub.schedule("0 0 * * *")
    .onRun(async (context) => {
      // get all schedules of this day
      const snapshot = admin.firestore().collection("schedules")
          .where("date", "==", new Date().toISOString().split("T")[0]).get();
      const schedules = (await snapshot).docs.map((doc) => doc.data());

      // loop through all schedules
      for (const schedule of schedules) {
        const numbers = [];
        const department = schedule.department;

        // get all users of this department
        const snapshot = admin.firestore().collection("users")
            .where("department", "==", department).get();
        const users = (await snapshot).docs.map((doc) => doc.data());

        // loop through all users
        users.forEach(async (user) => {
          const number = user.number;
          numbers.push(number);
        });

        // send SMS to all users of this department
        const url = "https://api.semaphore.co/api/v4/messages";

        const data = {
          apikey: process.env.SEMAPHORE_API_KEY,
          number: numbers.join(","), // comma separated list of phone numbers
          message: `Good morning! ${schedule.label} is scheduled for 
      today at ${schedule.from.toDate().toLocaleDateString()}.`,
          sendername: "PWF",
        };

        const headers = {
          "Content-Type": "application/json",
        };

        await axios.post(url, data, {headers: headers});
      }
    });
