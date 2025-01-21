import React, { useState } from 'react';

const NoPastiForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    data: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/salvaDati', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Dati salvati con successo!');
        // Resetta il form dopo il salvataggio
        setFormData({
          nome: '',
          cognome: '',
          data: new Date().toISOString().split('T')[0]
        });
      } else {
        alert('Errore nel salvataggio dei dati');
      }
    } catch (error) {
      console.error('Errore:', error);
      alert('Errore di connessione');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Form No Pasti</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Nome:</label>
            <input 
              type="text" 
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Cognome:</label>
            <input 
              type="text" 
              name="cognome"
              value={formData.cognome}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Data:</label>
            <input 
              type="date"
              name="data"
              value={formData.data}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Salva Dati
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoPastiForm;