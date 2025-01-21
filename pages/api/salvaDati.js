export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Qui dovresti implementare la logica di salvataggio 
        // Ad esempio, salvataggio su database o servizio esterno
        console.log('Dati ricevuti:', req.body);
        
        // Esempio di salvataggio (da personalizzare)
        res.status(200).json({ message: 'Dati salvati con successo' });
      } catch (error) {
        res.status(500).json({ message: 'Errore nel salvataggio dei dati' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }