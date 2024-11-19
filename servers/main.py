from flask import Flask, jsonify, request
from flask_cors import CORS
from SPARQLWrapper import SPARQLWrapper, JSON
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

app = Flask(__name__)
CORS(app)

cities_cache = []

@app.route('/cities', methods=['GET'])
def get_ukrainian_cities():
    global cities_cache

    if cities_cache:
        return jsonify(cities_cache)

    sparql_query = """
    PREFIX dbo: <http://dbpedia.org/ontology/>
    PREFIX dbr: <http://dbpedia.org/resource/>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    SELECT DISTINCT ?city ?name ?population ?creationDate ?image WHERE {
        ?city a dbo:City ;
              dbo:country dbr:Ukraine ;
              foaf:name ?name .
        OPTIONAL { ?city dbo:populationTotal ?population. }
        OPTIONAL { ?city dbo:foundingDate ?creationDate. }
        OPTIONAL { ?city dbo:thumbnail ?image. }
    }
    LIMIT 50
    """
    endpoint = "http://dbpedia.org/sparql"
    sparql = SPARQLWrapper(endpoint)
    sparql.setQuery(sparql_query)
    sparql.setReturnFormat(JSON)

    try:
        response = sparql.query().convert()
        cities = []
        for i, result in enumerate(response['results']['bindings']):
            city = {
                "id": i + 1,
                "uri": result.get("city", {}).get("value", ""),
                "name": result.get("name", {}).get("value", "Невідоме місто"),
                "population": int(result.get("population", {}).get("value", 0)),
                "date_of_creation": result.get("creationDate", {}).get("value", "Невідомо"),
                "image": result.get("image", {}).get("value", None)
            }
            cities.append(city)

        cities_cache = cities
        return jsonify(cities)
    except Exception as e:
        print(f"Помилка SPARQL-запиту: {e}")
        return jsonify({"error": "Помилка отримання даних"}), 500


@app.route('/city/<int:city_id>', methods=['GET'])
def get_city_by_id(city_id):
    global cities_cache

    if not cities_cache:
        return jsonify({"error": "Дані про міста ще не завантажені"}), 400

    city = next((c for c in cities_cache if c["id"] == city_id), None)
    if not city:
        return jsonify({"error": "Місто не знайдено"}), 404

    description_query = f"""
    PREFIX dbo: <http://dbpedia.org/ontology/>
    PREFIX dbr: <http://dbpedia.org/resource/>
    SELECT ?description ?history WHERE {{
        <{city['uri']}> dbo:abstract ?description .
        OPTIONAL {{ <{city['uri']}> dbo:history ?history. }}
        FILTER (lang(?description) = 'uk')
    }}
    """
    endpoint = "http://dbpedia.org/sparql"
    sparql = SPARQLWrapper(endpoint)
    sparql.setQuery(description_query)
    sparql.setReturnFormat(JSON)

    try:
        response = sparql.query().convert()
        description = None
        history = None

        for result in response['results']['bindings']:
            description = result.get("description", {}).get("value", None)
            history = result.get("history", {}).get("value", None)
            break

        city["description"] = description or "Опис відсутній"
        city["history"] = history or "Історія відсутня"

        return jsonify(city)
    except Exception as e:
        print(f"Помилка SPARQL-запиту: {e}")
        return jsonify({"error": "Не вдалося отримати дані про місто"}), 500

@app.route('/city/search', methods=['POST'])
def search_cities_by_name():
    global cities_cache

    if not cities_cache:
        return jsonify({"error": "Дані про міста ще не завантажені"}), 400

    data = request.get_json()
    name = data.get("name", "").strip()

    if not name:
        return jsonify({"error": "Поле 'name' обов'язкове"}), 400

    matched_cities = [
        city for city in cities_cache if name.lower() in city["name"].lower()
    ]

    return jsonify(matched_cities)


if __name__ == '__main__':
    app.run(debug=True)
