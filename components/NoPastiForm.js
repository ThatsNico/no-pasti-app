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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md mx-auto rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h2 className="text-3xl font-extrabold text-white text-center">Form No Pasti</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold">Nome</label>
            <input 
              type="text" 
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              placeholder="Inserisci il tuo nome"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         transition duration-300 ease-in-out 
                         hover:border-blue-400"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold">Cognome</label>
            <input 
              type="text" 
              name="cognome"
              value={formData.cognome}
              onChange={handleChange}
              required
              placeholder="Inserisci il tuo cognome"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         transition duration-300 ease-in-out 
                         hover:border-blue-400"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold">Data</label>
            <input 
              type="date"
              name="data"
              value={formData.data}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         transition duration-300 ease-in-out 
                         hover:border-blue-400"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 
                       text-white py-3 rounded-lg 
                       hover:from-blue-600 hover:to-purple-700 
                       transition duration-300 ease-in-out 
                       transform hover:-translate-y-1 hover:scale-105 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Salva Dati
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoPastiForm;