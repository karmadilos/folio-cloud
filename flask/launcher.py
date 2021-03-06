import datetime
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
    db='project',
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
        sql = 'SELECT id FROM users WHERE email = %s'
        cursor.execute(sql,email)
        result = cursor.fetchone()
        if result is not None:
            error = '{} 계정은 이미 등록된 계정입니다.'.format(email)

        # 에러가 발생하지 않았다면 회원가입 실행
        if error is None:
            sql = "INSERT INTO `users` (`email`, `password`,`name`) VALUES (%s, %s, %s)"
            cursor.execute(sql, ( email, generate_password_hash(password), name))
            db.commit()
            return jsonify(status = "success", error = error , result = {"name": name, "email": email})
        
        
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
        
        sql = 'SELECT id, email, password FROM users WHERE email = %s'
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
    return jsonify(status = "fail", error = error)

class Education(Resource):
    @jwt_required()
    def get(self,id):
        current_user = get_jwt_identity()   
        sql = "SELECT * FROM `educations` WHERE user_id = (%s)"
        cursor.execute(sql, id)
        educations = cursor.fetchall()
        result = [{
            "id" : education[0],
            "s_name" : education[1],
            "major" : education[2],
            "state" : education[3],
            "user_id" : education[4],
        } for education in educations]
        return jsonify(status = "success", result = result)

    @jwt_required()    
    def post(self):
        current_user = get_jwt_identity()
        데이터 = request.get_json()
        s_name = 데이터['s_name']
        major = 데이터['major']
        state = 데이터['state']
        error = None
        # s_name 없다면?
        if not s_name:
            error = 's_name 유효하지 않습니다.'
        # major 없다면?
        if not major:
            error = 'major 유효하지 않습니다.'
        # state 없다면?
        elif not state:
            error = 'state 유효하지 않습니다.'
        # 에러가 발생하지 않았다면 회원가입 실행
        if error is None:
            sql = "INSERT INTO educations (`s_name`,`major`,`state`,`user_id`) VALUES (%s,%s,%s,%s)"
            cursor.execute(sql, (s_name, major, state ,current_user[1]))
            db.commit()
            return jsonify(status = "success", result = {"s_name": s_name})
        return jsonify(status = "fail", result = {"error": error})
    
    @jwt_required()    
    def put(self,id):
        current_user = get_jwt_identity()
        데이터 = request.get_json()
        s_name = 데이터['s_name']
        major = 데이터['major']
        state = 데이터['state']
        print(s_name, major, state, id)
        sql = "UPDATE educations SET `s_name` = %s,`major` = %s,`state`= %s WHERE id = %s"
        cursor.execute(sql, (s_name, major, state ,id))
        db.commit()
        return jsonify(status = "success", result = {"s_name": s_name})
    
    @jwt_required()
    def delete(self,id):
        current_user = get_jwt_identity()
        데이터 = request.get_json()
        id = 데이터['id']
        sql = "DELETE FROM `educations` WHERE `id` = %s"
        cursor.execute(sql, id)
        db.commit()        
        return jsonify(status = "success", result = "delete")
api.add_resource(Education, '/educations', '/educations/<int:id>')

class Award(Resource):
    @jwt_required()
    def get(self,id):
        current_user = get_jwt_identity()   
        sql = "SELECT * FROM `awards` WHERE user_id = (%s)"
        cursor.execute(sql, id)
        awards = cursor.fetchall()
        result = [{
            "id" : award[0],
            "a_name" : award[1],
            "a_description" : award[2],
            "user_id" : award[3],
        } for award in awards]
        return jsonify(status = "success", result = result)

    @jwt_required()    
    def post(self):
        current_user = get_jwt_identity()
        데이터 = request.get_json()
        a_name = 데이터['a_name']
        a_description = 데이터['a_description']
        error = None
        # a_name 없다면?
        if not a_name:
            error = 'a_name 유효하지 않습니다.'
        # a_description 없다면?
        if not a_description:
            error = 'a_description 유효하지 않습니다.'
        # 에러가 발생하지 않았다면 회원가입 실행
        if error is None:
            sql = "INSERT INTO awards (`a_name`,`a_description`,`user_id`) VALUES (%s,%s,%s)"
            cursor.execute(sql, (a_name, a_description ,current_user[1]))
            db.commit()
            return jsonify(status = "success", result = {"a_name": a_name})
        return jsonify(status = "fail", result = {"error": error})
    
    @jwt_required()    
    def put(self,id):
        current_user = get_jwt_identity()
        데이터 = request.get_json()
        a_name = 데이터['a_name']
        a_description = 데이터['a_description']
        sql = "UPDATE awards SET `a_name` = %s,`a_description` = %s WHERE id = %s"
        cursor.execute(sql, (a_name, a_description, id))
        db.commit()
        return jsonify(status = "success", result = {"a_name": a_name})
    
    @jwt_required()
    def delete(self,id):
        current_user = get_jwt_identity()
        데이터 = request.get_json()
        id = 데이터['id']
        sql = "DELETE FROM `awards` WHERE `id` = %s"
        cursor.execute(sql, id)
        db.commit()        
        return jsonify(status = "success", result = "delete")
api.add_resource(Award, '/awards', '/awards/<int:id>')

class Certificate(Resource):
    @jwt_required()
    def get(self,id):
        current_user = get_jwt_identity()  
        sql = "SELECT * FROM `certificates` WHERE user_id = %s"
        cursor.execute(sql,id)
        certificates = cursor.fetchall()
        result = [{
            "id" : certificate[0],
            "c_name" : certificate[1],
            "c_agency" : certificate[2],
            "issue_date" : certificate[3].strftime('%Y-%m-%d'),
            "user_id" : certificate[4],
        } for certificate in certificates]
        return jsonify(status = "success", result = result)

    @jwt_required()    
    def post(self):
        current_user = get_jwt_identity()
        데이터 = request.get_json()
        print(데이터)
        c_name = 데이터['c_name']
        c_agency = 데이터['c_agency']
        issue_date = 데이터['issue_date']
        sql = "INSERT INTO certificates (`c_name`,`c_agency`,`issue_date`,`user_id`) VALUES (%s,%s,%s,%s)"
        cursor.execute(sql, (c_name, c_agency, issue_date ,current_user[1]))
        db.commit()
        return jsonify(status = "success", result = {"c_name": c_name})
    
    @jwt_required()    
    def put(self,id):
        current_user = get_jwt_identity()
        데이터 = request.get_json()
        print("데이터 : " , 데이터)        
        c_name = 데이터['c_name']
        c_agency = 데이터['c_agency']
        issue_date = 데이터['issue_date']
        print(c_name)
        sql = "UPDATE certificates SET `c_name` = %s,`c_agency` = %s,`issue_date`= %s WHERE id = %s"
        cursor.execute(sql, (c_name, c_agency, issue_date ,id))
        db.commit()
        return jsonify(status = "success", result = {"c_name": c_name})
    
    @jwt_required()
    def delete(self,id):
        current_user = get_jwt_identity()
        데이터 = request.get_json()
        id = 데이터['id']
        sql = "DELETE FROM `certificates` WHERE `id` = %s"
        cursor.execute(sql, id)
        db.commit()        
        return jsonify(status = "success", result = "delete")
api.add_resource(Certificate, '/certificates','/certificates/<int:id>')

class Project(Resource):
    @jwt_required()
    def get(self,id):
        sql = "SELECT * FROM `projects` WHERE user_id = %s"
        cursor.execute(sql, id)
        projects = cursor.fetchall()
        result = [{
            "id" : project[0],
            "p_name" : project[1],
            "p_description" : project[2],
            "start_date" : project[3].strftime('%Y-%m-%d'),
            "end_date" : project[4].strftime('%Y-%m-%d'),
            "user_id" : project[5],
        } for project in projects]
        return jsonify(status = "success", result = result)

    @jwt_required()    
    def post(self):
        current_user = get_jwt_identity()
        데이터 = request.get_json()
        print(데이터)
        p_name = 데이터['p_name']
        p_description = 데이터['p_description']
        start_date = 데이터['start_date']
        end_date = 데이터['end_date']
        sql = "INSERT INTO projects (`p_name`,`p_description`,`start_date`,`end_date`,`user_id`) VALUES (%s,%s,%s,%s,%s)"
        cursor.execute(sql, (p_name, p_description, start_date, end_date ,current_user[1]))
        db.commit()
        return jsonify(status = "success", result = {"p_name": p_name})
    
    @jwt_required()    
    def put(self,id):
        current_user = get_jwt_identity()
        데이터 = request.get_json()     
        p_name = 데이터['p_name']
        p_description = 데이터['p_description']
        start_date = 데이터['start_date']
        end_date = 데이터['end_date']
        sql = "UPDATE projects SET `p_name` = %s,`p_description` = %s,`start_date`= %s,`end_date`= %s WHERE id = %s"
        cursor.execute(sql, (p_name, p_description, start_date, end_date ,id))
        db.commit()
        return jsonify(status = "success", result = {"p_name": p_name})
    
    @jwt_required()
    def delete(self,id):
        current_user = get_jwt_identity()
        데이터 = request.get_json()
        id = 데이터['id']
        sql = "DELETE FROM `projects` WHERE `id` = %s"
        cursor.execute(sql, id)
        db.commit()        
        return jsonify(status = "success", result = "delete")
api.add_resource(Project, '/projects','/projects/<int:id>')
    
class User(Resource):
    @jwt_required()
    def get(self,id): 
        sql = "SELECT * FROM users WHERE id = (%s)"
        cursor.execute(sql, id)
        user = cursor.fetchone()
        result ={
            "id" : user[0],
            "email" : user[1],
            "name" : user[3],
            "intro" : user[4],
        }
        return jsonify(status = "success", result = result)

    @jwt_required()    
    def put(self,id):
        current_user = get_jwt_identity()
        데이터 = request.get_json()
        print(데이터)
        name = 데이터['name']
        email = 데이터['email']
        intro = 데이터['intro']
        sql = "UPDATE users SET `name` = %s,`email` = %s,`intro`= %s WHERE id = %s"
        cursor.execute(sql, (name, email, intro ,id))
        db.commit()
        return jsonify(status = "success", result = {"name": name})
    
api.add_resource(User, '/users' ,'/users/<int:id>')

class UserList(Resource):
    def get(self):
        sql = "SELECT * FROM `users`"
        cursor.execute(sql)
        users = cursor.fetchall()
        result= [{
            "id": user[0],
            "email": user[1],
            "name": user[3],
            "intro": user[4],
        } for user in users]
        return jsonify(status = "success", result = result)
api.add_resource(UserList, '/users/list')
if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True , threaded=False)