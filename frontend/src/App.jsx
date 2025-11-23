import React, { useState } from "react";
import "./App.css";

function App() {
  const [features, setFeatures] = useState({
    hair: 0,
    feathers: 0,
    eggs: 0,
    milk: 0,
    airborne: 0,
    aquatic: 0,
    predator: 0,
    toothed: 0,
    backbone: 0,
    breathes: 0,
    venomous: 0,
    fins: 0,
    legs: 0,
    tail: 0,
    domestic: 0,
    catsize: 0,
  });

  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const valorFinal =
      type === "checkbox" ? (checked ? 1 : 0) : parseInt(value);

    setFeatures((prev) => ({
      ...prev,
      [name]: valorFinal,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const listaFeatures = Object.values(features);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ features: listaFeatures }),
      });

      const data = await response.json();
      setResultado(data);
    } catch (error) {
      console.error("Erro:", error);
      setResultado({
        mensagem: "Erro ao conectar com a API. O backend está rodando?",
      });
    }
  };

  return (
    <div className="container">
      <h1>Classificador de Animais 🐧</h1>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <h3>Selecione algumas características do Animal:</h3>

          <div className="grid">
            <label>
              <input type="checkbox" name="hair" onChange={handleChange} /> Tem
              Pelo?
            </label>
            <label>
              <input type="checkbox" name="feathers" onChange={handleChange} />{" "}
              Tem Penas?
            </label>
            <label>
              <input type="checkbox" name="eggs" onChange={handleChange} /> Põe
              Ovos?
            </label>
            <label>
              <input type="checkbox" name="milk" onChange={handleChange} />{" "}
              Produz Leite?
            </label>
            <label>
              <input type="checkbox" name="airborne" onChange={handleChange} />{" "}
              Voa?
            </label>
            <label>
              <input type="checkbox" name="aquatic" onChange={handleChange} /> É
              Aquático?
            </label>
            <label>
              <input type="checkbox" name="predator" onChange={handleChange} />{" "}
              É Predador?
            </label>
            <label>
              <input type="checkbox" name="toothed" onChange={handleChange} />{" "}
              Tem Dentes?
            </label>
            <label>
              <input type="checkbox" name="backbone" onChange={handleChange} />{" "}
              Tem Vertebras?
            </label>
            <label>
              <input type="checkbox" name="breathes" onChange={handleChange} />{" "}
              Respira Ar?
            </label>
            <label>
              <input type="checkbox" name="venomous" onChange={handleChange} />{" "}
              É Venenoso?
            </label>
            <label>
              <input type="checkbox" name="fins" onChange={handleChange} /> Tem
              Barbatanas?
            </label>
            <label>
              <input type="checkbox" name="tail" onChange={handleChange} /> Tem
              Cauda?
            </label>
            <label>
              <input type="checkbox" name="domestic" onChange={handleChange} />{" "}
              É Doméstico?
            </label>
            <label>
              <input type="checkbox" name="catsize" onChange={handleChange} />{" "}
              Tamanho de Gato ou maior?
            </label>

            <label className="legs-label">
              Número de Pernas:
              <select name="legs" value={features.legs} onChange={handleChange}>
                <option value="0">0</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="8">8</option>
              </select>
            </label>
          </div>

          <button type="submit">Descobrir Animal</button>
        </form>
      </div>

      {resultado && (
        <div className="resultado">
          <p className="destaque">{resultado.mensagem}</p>
          {resultado.classe_nome && <p>Tipo: {resultado.classe_nome}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
