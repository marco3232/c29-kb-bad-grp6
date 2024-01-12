from flask import Flask, request, jsonify


app = Flask(__name__)


@app.route('/tripplan', methods = ['POST'])
def postdata():
    # data = request.get_json()
    # print(data)

    return jsonify({ "result" : data})


if __name__ == "__main__":
    app.run(port=5000)


