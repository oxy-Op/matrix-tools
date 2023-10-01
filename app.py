from numpy import array
from flask import Flask, jsonify, render_template, request
from os import path, walk


app = Flask(__name__)

# extra_dirs = ['templates','static']
# extra_files = extra_dirs[:]
# for extra_dir in extra_dirs:
#     for dirname, dirs, files in walk(extra_dir):
#         for filename in files:
#             filename = path.join(dirname, filename)
#             if path.isfile(filename):
#                 extra_files.append(filename)


def matrix_calculation(data):
    calculation = ''
    try:
        if data['matrix'] == 2:
            x = array(data['matrix1'])
            y = array(data['matrix2'])
            calculation = x @ y
        if data['matrix'] == 3:
            x = array(data['matrix1'])
            y = array(data['matrix2'])
            z = array(data['matrix3'])
            calculation = x @ y @ z
        return {"status":"success","matrix":calculation.tolist()}
    except ValueError as e:
        return {"status":"error","error": str(e)}

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/matrix', methods=['POST'])
def matrix():
    result = matrix_calculation(request.json)
    return jsonify(result)

if __name__ == "__main__":
#     app.jinja_env.auto_reload = True
#     app.config['TEMPLATE_AUTO_RELOAD'] = True
    app.run(host='0.0.0.0',debug=True, port=5200 )