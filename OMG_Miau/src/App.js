import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Gallery from './components/Gallery';
import AboutUs from './components/AboutUs';
import Form from './components/Form';
import NotFound from './components/NotFound';

const App = () => {
  const [breeds, setBreeds] = useState([]); // Mantiene las razas de gatos
  const [results, setResults] = useState([]); // Almacena los resultados del test
  const API_KEY = 'TU_CLAVE_API'; // Asegúrate de tener tu clave API aquí

  // Lógica para cargar las razas de gatos al montar el componente
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch('https://api.thecatapi.com/v1/breeds', {
          headers: {
            'x-api-key': API_KEY,
          },
        });
        const data = await response.json();
        const breedsWithImages = await Promise.all(
          data.map(async (breed) => {
            const imageResponse = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}`, {
              headers: {
                'x-api-key': API_KEY,
              },
            });
            const imageData = await imageResponse.json();
            breed.image = imageData[0]?.url || null;
            return breed;
          })
        );
        setBreeds(breedsWithImages); // Establece las razas en el estado
      } catch (error) {
        console.error('Error fetching breeds:', error);
      }
    };

    fetchBreeds(); // Llama a la función de carga de razas
  }, [API_KEY]);

  const handleResults = (newResults) => {
    setResults(newResults); // Almacena los resultados en el estado
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/catalogo" element={<Gallery breeds={breeds} setBreeds={setBreeds} />} />
          <Route 
            path="/test" 
            element={<Form breeds={breeds} setBreeds={setBreeds} onResults={handleResults} />} 
          />
          <Route path="/conocenos" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {results.length > 0 && <Gallery breeds={results} setBreeds={setBreeds} />}
      </Router>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;


