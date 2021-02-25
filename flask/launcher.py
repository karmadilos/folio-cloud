import pymysql
from flask import Flask, jsonify, request, session, render_template
from flask_restful import reqparse, abort, Api, Resource
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash
from flask_cors import CORS
app = Flask(__name__)
api = Api(app)
CORS(app)

db = pymysql.connect(
    host='localhost',
    port=3306,
    user='root',
    password='',
    db='racer',
    charset='utf8'
)
cursor = db.cursor()

app.config["JWT_SECRET_KEY"] = "super-secret"
jwt = JWTManager(app)
app.config.from_mapping(SECRET_KEY='dev')

@app.route('/signup', methods=('GET', 'POST'))
def register():
    # POST 요청을 받았다면?
    if request.method == 'POST':
        # 아이디와 비밀번호를 폼에서 가져옵니다.
        
        email = request.form['email']
        password = request.form['password']
        name = request.form['name']

        error = None

        # 이메일이 없다면?
        if not email:
            error = 'Email이 유효하지 않습니다.'
        # 아이디가 없다면?
        if not name:
            error = 'name 유효하지 않습니다.'
        # 비밀번호가 없다면?
        elif not password:
            error = 'Password가 유효하지 않습니다.'
        # 이미 등록된 계정이라면?
        sql = 'SELECT id FROM user WHERE email = %s'
        cursor.execute(sql, (email,))
        result = cursor.fetchone()
        if result is not None:
            error = '{} 계정은 이미 등록된 계정입니다.'.format(email)

        # 에러가 발생하지 않았다면 회원가입 실행
        if error is None:
            sql = "INSERT INTO `user` (`email`, `password`,`name`) VALUES (%s, %s, %s)"
            cursor.execute(sql, ( email, generate_password_hash(password), name))
            db.commit()
            return jsonify(status = "success", result = {"name": name, "email": email})
        
        
    # 에러 메세지를 반환합니다.
    return jsonify(status = "fail", result = {"error": error})


@app.route('/login', methods=('GET', 'POST'))
def login():
    # POST 요청을 받았다면?
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        
        error = None
        
        sql = 'SELECT email, password, name FROM user WHERE email = %s'
        cursor.execute(sql, (email))
        user = cursor.fetchone()
        
        # 입력한 유저의 정보가 없을 때
        if user is None:
            error = '등록되지 않은 계정입니다.'
        
        # 비밀번호가 틀렸을 때
        # user는 tuple 타입으로 데이터 반환, user[0]은 email user[1]은 password 
        if not (user == None or check_password_hash(user[1], password)):
            error = 'password가 틀렸습니다.'

        # 정상적인 정보를 요청받았다면?
        if error is None:
            # 로그인을 위해 기존 session을 비웁니다.
            session.clear()
            # 지금 로그인한 유저의 정보로 session을 등록합니다.
            session['user_id'] = user[0]
            access_token = create_access_token(identity=email)
            return jsonify(access_token = access_token, user_id = user[2])
    return jsonify(status = "fail", result = {"error": error})

@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@app.route('/logout')
def logout():
    # 현재 session을 비워줍니다.
    session.clear()
    print(session)
    return jsonify(status = "success", result = {"msg": "logout!"})

    
if __name__ == '__main__':
    app.run('0.0.0.0', port=5000)