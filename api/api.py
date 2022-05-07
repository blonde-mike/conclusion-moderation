import flask
from flask_cors import CORS
from flask import request, jsonify, abort

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app, resources={r"/api/*": {"origins": "*"}}, expose_headers=["Content-Type"], send_wildcard=True)

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
            "proposed": {
                "conclusions": [],
            },
        },
        "sex": {
            "moderator": {
                "userId": "cis.user.M7X1-R1ZT",
                "contactName": "blondemike",
            },
            "proposed": {
                "conclusions": [],
            },
        },
        "birth": {
            "moderator": {
                "userId": "cis.user.M7X1-R1ZT",
                "contactName": "blondemike",
            },
            "proposed": {
                "conclusions": [
                    {
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
                ],
            },
        },
        "christening": {
            "moderator": null,
            "proposed": {
                "conclusions": [],
            },
        },
        "death": {
            "moderator": {
                "userId": "cis.user.M7X1-R1ZT",
                "contactName": "blondemike",
            },
            "proposed": {
                "conclusions": [],
            },
        },
        "burial": {
            "moderator": null,
            "proposed": {
                "conclusions": [],
            },
        },
    },
}

@app.route('/', methods=['GET'])
def home():
    return "<h1>Stub API for Conclusion Moderation</h1><p>See github.com/blonde-mike/conclusion-moderation</p>"

@app.route('/api/<pid>', methods=['GET'])
def data_for_person(pid):
    return jsonify(traverse(data, pid))

@app.route('/api/<pid>/<slot>', methods=['GET'])
def data_for_person_slot(pid, slot):
    return jsonify(traverse(data, pid, slot))

@app.route('/api/<pid>/<slot>/moderator', methods=['GET'])
def data_for_person_slot_moderator(pid, slot):
    return jsonify(traverse(data, pid, slot, "moderator"))

@app.route('/api/<pid>/<slot>/proposed', methods=['GET'])
def data_for_person_slot_proposed(pid, slot):
    return jsonify(traverse(data, pid, slot, "proposed"))

@app.route('/api/<pid>/<slot>/moderator', methods=['POST', 'PUT'])
def data_for_person_slot_moderator_POST(pid, slot):
    required_attrs = [ "userId", "contactName" ]
    def assign_moderator(slot_data, post_data):
        slot_data["moderator"] = post_data
    return verify_and_post(data, pid, slot, required_attrs, "moderator", assign_moderator)

@app.route('/api/<pid>/<slot>/proposed', methods=['POST', 'PUT'])
def data_for_person_slot_proposed_POST(pid, slot):
    required_attrs = [ "userId", "contactName", "conclusion" ]
    def assign_proposed(slot_data, post_data):
        slot_data["proposed"]["conclusions"] += [ post_data ]
    return verify_and_post(data, pid, slot, required_attrs, "proposed", assign_proposed)

def verify_and_post(data, pid, slot, required_attrs, post_attr, assign_lambda):
    # make sure there is a proper application/json body
    if not request.json:
        abort(400)
    # traverse down to where the moderator/proposed would be
    try:
        slot_data = traverse(data, pid, slot)
    except Exception as e:
        print(e)
        stub_person(data, pid)
        slot_data = traverse(data, pid, slot)
    post_data = request.json
    for required_attr in required_attrs:
        verify_attribute(post_data, required_attr)
    assign_lambda(slot_data, post_data)
    # re-traverse to make sure the data is updated properly, also send CORS header for localhost access
    return jsonify(traverse(data, pid, slot, post_attr))

def traverse(data, *path_items):
    data_to_return = data
    for path_item in path_items:
        sub_data_to_return = data_to_return.get(path_item)
        if not sub_data_to_return:
            abort(404)
        data_to_return = sub_data_to_return
    return data_to_return

def verify_attribute(data, required_attr):
    if not data[required_attr]:
        abort(400)

def stub_person(data, pid):
    person_data = {
        "name": {
            "moderator": null,
            "proposed": {
                "conclusions": [],
            },
        },
        "sex": {
            "moderator": null,
            "proposed": {
                "conclusions": [],
            },
        },
        "birth": {
            "moderator": null,
            "proposed": {
                "conclusions": [],
            },
        },
        "christening": {
            "moderator": null,
            "proposed": {
                "conclusions": [],
            },
        },
        "death": {
            "moderator": null,
            "proposed": {
                "conclusions": [],
            },
        },
        "burial": {
            "moderator": null,
            "proposed": {
                "conclusions": [],
            },
        },
    }
    data[pid] = person_data

app.run()
