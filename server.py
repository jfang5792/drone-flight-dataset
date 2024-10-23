from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from openai import OpenAI
import requests
import os
import json

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY") or os.urandom(24).hex()

db = SQLAlchemy()

openai_api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(organization="org-pdleieoSNxW70c2L9AtCwd6p")


def get_api_key():
    return openai_api_key


# ---------------------------------------------------------------------#

with open("dataset.json") as file:
    data = json.load(file)


def query_the_data(query):
    return data


@app.route("/api/results", methods=["GET"])
def get_results():
    return jsonify(data)


# from OpenAI documentation guide
# pass user query with given dataset info
# set up headers, the auth is api key at 'content-type': 'application/json'
# prepare payload for API req, pick ai model
# set up client messages, assign role to system and user and assign content msgs
# in our return back to user, use json.dumps() to convert dataset_info param obj into JSON str
# save user param query with str int {query}

# combine dataset, convert to JSON str to parse, user query into a str
# set up AI model to receive/gen response on given dataset with the user query


def get_openai(query, dataset_info):
    headers = {
        "Authorization": f"Bearer {openai_api_key}",
        "Content-Type": "application/json",
    }
    data = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant that answers questions about a drone dataset. Only use information from the provided dataset to answer questions.",
            },
            {
                "role": "user",
                "content": f"Dataset information: {json.dumps(dataset_info)}. User query: {query}",
            },
        ],
    }

    # set var called request as response from chat/completions model
    # send POST req to chat/completions endpoint
    # requests.post('url', headers={headers}, json={data}) data from line 52
    # if req is successful (use status_code val), return res of first choice message and content
    # OpenAI API returns a JSON obj that includes "choices" key

    # {"choices":
    #   [{"message": {
    #         "content": "AI response text",
    #         "role": "system/assistant"
    #       }}]}
    response = requests.post(
        "https://api.openai.com/v1/chat/completions", headers=headers, json=data
    )
    if response.status_code == 200:
        return response.json()["choices"][0]["message"]["content"]
    else:
        raise Exception(f"OpenAI request failed, {response.status_code}")


# use helper functions above
@app.route("/api/query", methods=["POST"])
def process_query():
    data = request.json
    query = data.get("query", "")  # empty str as we don't know what user will input

    dataset_info = query_the_data(query)  # <-- helper
    answer = get_openai(query, dataset_info)  # <-- helper

    return jsonify({"answer": answer})


# ---------------------------------------------------------------------#

# GET "/get_value?image_id=001&key=timestamp" {"timestamp": "2024-09-24 14:31:05"}
# GET "/get_value?image_id=002&key=image_format" {"image_format": "RAW+JPEG"}
# <- example routes per each key val pair
# "/get_value?{image_id=002}&key={image_format}" ??


@app.route("/api/getKeyValues")
def get_key_value_pairs():
    image_index = request.args.get("image_index")
    key = request.args.get("key")

    if image_index is None:
        return jsonify({"error": "Enter a number"}), 400

    try:
        index = int(image_index) - 1  # use int() to round up image_ids
    except ValueError:
        return jsonify({"error": "Invalid number"}), 400

    # if index is within range
    if 0 <= index < len(data):
        image_data = data[index]  # corresponding dataset object based on index [{}, {}]
    if image_data:
        if key in image_data:
            return jsonify({key: image_data[key]})
        else:
            return jsonify({"error": "No category exists in database."}), 404
    else:
        return jsonify({"error": "Number out of range"}), 404


# ---------------------------------------------------------------------#
if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=6060)
