import { google } from 'googleapis';
import { ReservedSeat } from 'src/api/entities/reservedSeat.entity';

interface EventDetails {
  summary: string;
  description: string;
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
}

export function buildCalendarEventDetails(reservedSeat: ReservedSeat) {
  const sessionDate = new Date(reservedSeat.session.session_date);

  return {
    summary: 'Reserved Seat',
    description: `Space reserved for session ${reservedSeat.session.movie.name} in hall ${reservedSeat.session.hall.name}`,
    start: {
      dateTime: sessionDate.toISOString(),
      timeZone: process.env.TIME_ZONE
    },
    end: {
      dateTime: sessionDate.toISOString(),
      timeZone: process.env.TIME_ZONE
    }
  };
}

export async function createGoogleCalendarEvent(eventDetails: EventDetails) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: './google.credentials.json',
      scopes: ['https://www.googleapis.com/auth/calendar']
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: eventDetails
    });

    console.log('Event created successfully:', response.data.htmlLink);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
}
