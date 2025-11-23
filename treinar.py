import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

df = pd.read_csv('zoo.csv')

X = df.drop(['animal_name', 'class_type'], axis = 1)

y = df['class_type']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)


modelo = DecisionTreeClassifier()
modelo.fit(X_train, y_train)

previsoes = modelo.predict(X_test)

acuracia = accuracy_score(y_test, previsoes)
print(f"\nAcurácia do modelo: {acuracia * 100:.2f}%")
print("\nRelatório detalhado:")
print(classification_report(y_test, previsoes))

joblib.dump(modelo, 'modelo_zoo.pkl')
print("Modelo salvo como 'modelo_zoo.pkl'")