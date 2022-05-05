import flask
from flask_cors import CORS
from flask import jsonify, abort

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app, resources={r"/api/*": {"origins": "*"}})

# fake out Python to allow more json-like data declaration
false = False
true = True
null = None

data = {
    "KWCT-GS3": {
        "name": {
            "moderator": {
                "userId": "cis.user.M7X1-R1ZT",
                "contactName": "blondemike",
            },
            "proposed": null,
        },
        "sex": {
            "moderator": {
                "userId": "cis.user.M7X1-R1ZT",
                "contactName": "blondemike",
            },
            "proposed": null,
        },
        "birth": {
            "moderator": {
                "userId": "cis.user.M7X1-R1ZT",
                "contactName": "blondemike",
            },
            "proposed": {
                "userId": "cis.user.M7X1-R1ZB",
                "contactName": "blondemike2",
                "conclusion": {
                    "contributor": {
                      "date": "June 5, 2021",
                      "id": "MM7W-8GC",
                      "name": "JB Cowley",
                      "timestamp": "2021-06-05T15:08:17+00:00"
                    },
                    "details": {
                      "detailsType": "EventDetails",
                      "date": {
                        "formalText": "+1903-09-13",
                        "julianDateRange": {
                          "earliestDay": 2416371,
                          "latestDay": 2416371
                        },
                        "localizedText": "13 September 1903",
                        "modifier": null,
                        "normalizedText": "13 September 1903",
                        "originalText": "13 September 1903"
                      },
                      "deceasedFlag": null,
                      "description": null,
                      "place": {
                        "geoCode": {
                          "latitude": 30.3098,
                          "longitude": -108.0785
                        },
                        "id": 6902982,
                        "localizedText": "Colonia Juárez, Casas Grandes, Chihuahua, Mexico",
                        "normalizedText": "Colonia Juárez, Casas Grandes, Chihuahua, Mexico",
                        "originalText": "Colonia Juárez, Casas Grandes, Chihuahua, Mexico"
                      },
                      "sourceCount": 14,
                      "title": "",
                      "type": "BIRTH"
                    },
                    "id": "248eaba5-34ae-4182-9874-bfcc07166241",
                    "justification": "As reported in her obituary, Salt Lake Tribune, 8 September 1997.",
                    "multiValued": false,
                    "type": "BIRTH"
                  }
            }
        },
        "christening": {
            "moderator": null,
            "proposed": null,
        },
        "death": {
            "moderator": {
                "userId": "cis.user.M7X1-R1ZT",
                "contactName": "blondemike",
            },
            "proposed": null,
        },
        "burial": {
            "moderator": null,
            "proposed": null,
        },
    },
}

@app.route('/', methods=['GET'])
def home():
    return "<h1>Stub API for Conclusion Moderation</h1><p>See github.com/blonde-mike/conclusion-moderation</p>"

@app.route('/api/<pid>', methods=['GET'])
def data_for_person(pid):
    if not data.get(pid):
        abort(404)
    return jsonify(data[pid])

app.run()
