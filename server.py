from flask import Flask, request, send_file, render_template
from forms import db_session
from forms.parcel import Parcel
import datetime
import json

app = Flask(__name__)


@app.route("/")
@app.route("/index")
def index_page():
    if request.method == 'POST':
        if request.form['navButton'] == 'Устройства':
            print("Устройства")
        elif request.form['navButton'] == 'Данные':
            print("Данные")
        else:
            pass  # unknown
    else:
        return render_template('devises.html')




@app.route("/postData", methods=['POST'])
def to_bot_message():
    req = request.json
    if not req:
        jsonData = request.data.decode('utf8').replace("'", '"')
        jsonDict = json.loads(jsonData)
        # return 'Wrong data'
    else:
        jsonDict = json.loads(req)
    print(jsonDict)

    # jsonString = json.loads(request.json)
    data = jsonDict['data']

    hubId = jsonDict['id']

    groundPH = data['groundPH']
    waterPPM = data['waterPPM']
    waterOpacity = data['waterOpacity']
    waterSalt = data['waterSalt']
    waterPH = data['waterPH']
    airPM25 = data['airPM25']
    airPPM = data['airPPM']

    print(hubId, groundPH, waterPPM, waterOpacity, waterSalt, waterPH, airPM25, airPPM)



    db_sess = db_session.create_session()

    parcel = Parcel(
        groundPH=groundPH,
        waterPPM=waterPPM,
        waterOpacity=waterOpacity,
        waterSalt=waterSalt,
        waterPH=waterPH,
        airPM25=airPM25,
        airPPM=airPPM,
        date=datetime.datetime.now()
    )
    db_sess.add(parcel)

    db_sess.commit()

    return "Succes"


@app.route("/getMarker/<filename>")
def get_marker(filename):
    return send_file('static/imgs/' + filename)


if __name__ == "__main__":
    db_session.global_init("data.db")
    app.run(host="0.0.0.0")


