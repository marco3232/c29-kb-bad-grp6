from flask import Flask, request, jsonify
# from flask_cors import CORS

app = Flask(__name__)
# CORS(app)

# @app.route('/tripplan')
# def index():
#     return "Flask server"

@app.route('/tripplan', methods = ['POST'])
def postdata():
    data = request.get_json()
    print(data)
# do something with this data variable that contains the data from the node server
    # return json.dumps({"newdata":"hereisthenewdatayouwanttosend"})
    return jsonify({ "result" : data})


if __name__ == "__main__":
    app.run(port=5000)


