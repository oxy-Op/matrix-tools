from flask import Flask, jsonify, render_template
from os import path, walk


app = Flask(__name__, template_folder="templates", static_folder="static")

extra_dirs = ['templates','static']
extra_files = extra_dirs[:]
for extra_dir in extra_dirs:
    for dirname, dirs, files in walk(extra_dir):
        for filename in files:
            filename = path.join(dirname, filename)
            if path.isfile(filename):
                extra_files.append(filename)



@app.route("/")
def hello():
    return render_template("index.html")

if __name__ == "__main__":
    app.jinja_env.auto_reload = True
    app.config['TEMPLATE_AUTO_RELOAD'] = True
    app.run(host='0.0.0.0',debug=True, port=5200 , extra_files=extra_files)