from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app) 

modelo = joblib.load('modelo_zoo.pkl')

classes_animais = {
    1: "Mamífero",
    2: "Ave",
    3: "Réptil",
    4: "Peixe",
    5: "Anfíbio",
    6: "Inseto",
    7: "Invertebrado"
}


@app.route('/', methods=['GET'])
def home():
    return "API de Classificação de Animais está ONLINE! 🦁🐧🐸"


@app.route('/predict', methods=['POST'])
def predict():
    try:
        
        dados = request.get_json()
        features = dados['features']
        predicao_numero = modelo.predict([features])[0]
        nome_classe = classes_animais.get(predicao_numero, "Desconhecido")
        return jsonify({
            'classe_numero': int(predicao_numero),
            'classe_nome': nome_classe,
            'mensagem': f'O animal foi classificado como: {nome_classe}'
        })
    
    except Exception as e:
        return jsonify({'erro': str(e)}), 400

if __name__ == '__main__':
    
    app.run(debug=True, host='0.0.0.0', port=5000)