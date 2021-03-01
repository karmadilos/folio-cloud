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

parser = reqparse.RequestParser()
parser.add_argument("email")
parser.add_argument("password")
parser.add_argument("name")

@app.route('/signup', methods=('GET', 'POST'))
def register():
    # POST 요청을 받았다면?
    if request.method == 'POST':
        # 아이디와 비밀번호를 폼에서 가져옵니다.
        데이터 = request.get_json()
        email = 데이터['email']
        password = 데이터['password']
        name = 데이터['name']

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
        데이터 = request.get_json()
        email = 데이터['email']
        password = 데이터['password']
        
        error = None
        
        sql = 'SELECT id, email, password FROM user WHERE email = %s'
        cursor.execute(sql, (email))
        user = cursor.fetchone()
        
        # 입력한 유저의 정보가 없을 때
        if user is None:
            error = '등록되지 않은 계정입니다.'
        
        # 비밀번호가 틀렸을 때
        # user는 tuple 타입으로 데이터 반환, user[1]은 email user[2]은 password 
        if not (user == None or check_password_hash(user[2], password)):
            error = 'password가 틀렸습니다.'

        # 정상적인 정보를 요청받았다면?
        if error is None:
            access_token = create_access_token(identity=(email,user[0]))
            return jsonify(access_token = access_token, user_id = user[0])
    return jsonify(status = "fail", result = {"error": error})

class User(Resource):
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()   
        sql = "SELECT * FROM `user` WHERE id = (%s)"
        cursor.execute(sql, (current_user[1]))
        user = cursor.fetchone()
        print(user)
        return jsonify(status = "success", result = user)
    
    # @jwt_required()    
    # def put(self):
    #     current_user = get_jwt_identity()
    #     args = parser.parse_args()
        
    #     return jsonify(status = "success", result = {})
    
    # @jwt_required()
    # def delete(self):
    #     current_user = get_jwt_identity()
    #     args = parser.parse_args() 
    #     sql = "DELETE FROM `education` WHERE `id` = %s AND `user_id` = %s"
    #     cursor.execute(sql, (args['num'], current_user['id']))
    #     db.commit()
        
        # return jsonify(status = "success", result = "delete")
api.add_resource(User, '/user')

class Education(Resource):
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()   
        sql = "SELECT * FROM `education` WHERE user_id = (%s)"
        cursor.execute(sql, (current_user[1]))
        education = cursor.fetchall()
        print(education)
        return jsonify(status = "success", result = education)

    @jwt_required()    
    def post(self):
        current_user = get_jwt_identity()
        # args = parser.parse_args()
        데이터 = request.get_json()
        s_name = 데이터['s_name']
        major = 데이터['major']
        state = 1
        sql = "INSERT INTO education (`s_name`,`major`,`state`,`user_id`) VALUES (%s,%s,%s,%s)"
        cursor.execute(sql, (s_name, major, state ,current_user[1]))
        db.commit()
        return jsonify(status = "success", result = {"s_name": s_name})
    
    # @jwt_required()    
    # def put(self):
    #     current_user = get_jwt_identity()
    #     args = parser.parse_args()
        
    #     return jsonify(status = "success", result = {})
    
    # @jwt_required()
    # def delete(self):
    #     current_user = get_jwt_identity()
    #     args = parser.parse_args() 
    #     sql = "DELETE FROM `education` WHERE `id` = %s AND `user_id` = %s"
    #     cursor.execute(sql, (args['num'], current_user['id']))
    #     db.commit()
        
        # return jsonify(status = "success", result = "delete")
api.add_resource(Education, '/education')

class Award(Resource):
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()   
        sql = "SELECT * FROM `awards` WHERE user_id = (%s)"
        cursor.execute(sql, (current_user[1]))
        awards = cursor.fetchall()
        return jsonify(status = "success", result = awards)

    @jwt_required()    
    def post(self):
        current_user = get_jwt_identity()
        데이터 = request.get_json()
        a_name = 데이터['a_name']
        a_description = 데이터['a_description']
        sql = "INSERT INTO awards (`a_name`,`a_description`,`user_id`) VALUES (%s,%s,%s)"
        cursor.execute(sql, (a_name, a_description, current_user[1]))
        db.commit()
        return jsonify(status = "success", result = {"a_name": a_name})
    
    # @jwt_required()    
    # def put(self):
    #     current_user = get_jwt_identity()
    #     args = parser.parse_args()
        
    #     return jsonify(status = "success", result = {})
    
    # @jwt_required()
    # def delete(self):
    #     current_user = get_jwt_identity()
    #     args = parser.parse_args() 
    #     sql = "DELETE FROM `education` WHERE `id` = %s AND `user_id` = %s"
    #     cursor.execute(sql, (args['num'], current_user['id']))
    #      db.commit()
        
    #     return jsonify(status = "success", result = "delete")
api.add_resource(Award, '/awards')

class Certificate(Resource):
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()   
        args = parser.parse_args()     
        sql = "SELECT * FROM `certificates` WHERE user_id = (%s)"
        cursor.execute(sql, (current_user[1]))
        certificates = cursor.fetchall()
        return jsonify(status = "success", result = certificates)

    @jwt_required()    
    def post(self):
        current_user = get_jwt_identity()
        # args = parser.parse_args()
        데이터 = request.get_json()
        c_name = 데이터['c_name']
        c_agency = 데이터['c_agency']
        issue_date = "2099-09-09"
        sql = "INSERT INTO certificates (`c_name`,`c_agency`,`issue_date`,`user_id`) VALUES (%s,%s,%s,%s)"
        cursor.execute(sql, (c_name, c_agency, issue_date ,current_user[1]))
        db.commit()
        return jsonify(status = "success", result = {"c_name": c_name})
    
    # @jwt_required()    
    # def put(self):
    #     current_user = get_jwt_identity()
    #     args = parser.parse_args()
        
    #     return jsonify(status = "success", result = {})
    
    # @jwt_required()
    # def delete(self):
    #     current_user = get_jwt_identity()
    #     args = parser.parse_args() 
    #     sql = "DELETE FROM `education` WHERE `id` = %s AND `user_id` = %s"
    #     cursor.execute(sql, (args['num'], current_user['id']))
    #     db.commit()
        
        # return jsonify(status = "success", result = "delete")
api.add_resource(Certificate, '/certificates')

class Project(Resource):
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        sql = "SELECT * FROM `project` WHERE user_id = (%s)"
        cursor.execute(sql, (current_user[1]))
        project = cursor.fetchall()
        return jsonify(status = "success", result = project)

    @jwt_required()    
    def post(self):
        current_user = get_jwt_identity()
        데이터 = request.get_json()
        p_name = 데이터['p_name']
        p_description = 데이터['p_description']
        start_date = '2000-01-01'
        end_date = '2001-01-01'
        sql = "INSERT INTO project (`p_name`,`p_description`,`start_date`,`end_date`,`user_id`) VALUES (%s,%s,%s,%s,%s)"
        cursor.execute(sql, (p_name, p_description, start_date, end_date, current_user[1]))
        db.commit()
        return jsonify(status = "success", result = {"p_name": p_name})
    
    # @jwt_required()    
    # def put(self):
    #     current_user = get_jwt_identity()
    #     args = parser.parse_args()
        
    #     return jsonify(status = "success", result = {})
    
    # @jwt_required()
    # def delete(self):
    #     current_user = get_jwt_identity()
    #     args = parser.parse_args() 
    #     sql = "DELETE FROM `education` WHERE `id` = %s AND `user_id` = %s"
    #     cursor.execute(sql, (args['num'], current_user['id']))
    #     db.commit()
        
        # return jsonify(status = "success", result = "delete")
api.add_resource(Project, '/project')
    
if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)