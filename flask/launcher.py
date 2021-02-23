import pymysql
from flask import Flask, jsonify, request, session, render_template
from flask_restful import reqparse, abort, Api, Resource
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash

app = Flask(__name__)
api = Api(app)

@app.route('/Sign-up',methods=['POST'])
def signup():
    if request.method == 'POST':
        info = request.form
        email = info['email']
        password = info['password']
        name = info['name']
        return redirect(request.url)
    return render_template("index.html")


    
if __name__ == '__main__':
    app.run('0.0.0.0', port=5000)