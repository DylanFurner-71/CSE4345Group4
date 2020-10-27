const {google} = require('googleapis');

const {OAuth2} = google.auth;

const oathclient = new OAuth2('3887245414-veqq0jubvor9gij3ls17rjtvvgg6t2g9.apps.googleusercontent.com', '4OhVCly8CxbLLFlMLe2aHbTA', 

);

oathclient.setCredentials({refresh_token: '1//04m7GKBb8Ak5-CgYIARAAGAQSNwF-L9Ir3aw31Y58muowUCLCWFESwJpvgO56KyP7bACQf9ID4CPcglwkBrNuN_POXD6n6nHeDpw'});
const calendar = google.calender({version: 'v3', auth: oathclient});
const evenStartTime = new Date();
eventStartTime.setDate(evenStartTime.getDay() + 1); //eventstart time is set for ahead of time
//event end time
const eventEndTime = new Date();
eventEndTime.setDate(eventEndTime.getDay() + 1); //eventstart time is set for ahead of time
eventEndTime.setMinutes(eventEndTime.getMinutes()+45);


/*
after some stuff
*/

calendar.freebusy.query({
    resource: {
        timeMin: eventStartTime,
        timeMax: eventEndTime,
        timeZone: 'America/Denver',
        items: [{id: 'primary'}]
    }
}, (err, res) => {
    if (err) {
        return console.log("GOOGLE CALENDAR FREE BYSY ERROR", err);
    }
    const eventsArr = res.data.calendars.primary.busy;
    if (eventsArr.length === 0){
        return calendar.events.insert({calendarId: 'Primary', resource: event}, (err)=> {
            if (err) return console.log("Calendar Event Creation .error ");
            return console.log("Calendar event created");
        })
    }
    return console.log("FML google calendar api owned me");
})