import { google } from 'googleapis'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nome, cognome, data } = req.body;

    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      });

      const sheets = google.sheets({ version: 'v4', auth });

      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: 'Sheet1!A:C',
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [[nome, cognome, data]]
        }
      });

      res.status(200).json({ message: 'Dati salvati' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Errore salvataggio' });
    }
  } else {
    res.status(405).end();
  }
}