import {google} from 'googleapis'
import dotenv from 'dotenv'
dotenv.config()


const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
);

oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })

const calendar = google.calendar({ version: 'v3', auth: oauth2Client })


export const createGoogleMeet = async(userEmails:string[], counselorEmail:string, startTime:string, endTime:string, summary:string) => {
    const attendees = userEmails.map(email => ({email}))
    attendees.push({email: counselorEmail})    
    try {
        const event = {
            summary: summary,
            description: `One on one Counseling session`,
            start: {
                dateTime: startTime,
                timeZone: 'UTC+2'
            },
            end: {
                dateTime: endTime,
                timeZone: 'UTC+2'
            },
            attendees: attendees,
            conferenceData: {
                createRequest: {
                    requestId: crypto.randomUUID(),
                    conferenceSolutionKey: {
                        type: 'hangoutsMeet'
                    },
                    requiresAttendeeApproval: false
                }
            },
            guestsCanModify: true,
            guestsCanSeeOtherGuests: true
        }
      
        const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: event,
            conferenceDataVersion: 1,
            sendUpdates: 'none'
          });

        console.log(response)
      
        const meetLink = response.data.conferenceData.entryPoints.find(
            entryPoint => entryPoint.entryPointType === 'video'
        ).uri
      
        return {meetLink, eventId: response.data.id};
    } catch (error) {
      console.error('Error creating Google Meet event:', error)
        return {meetLink: null, eventId: null}
    }
}