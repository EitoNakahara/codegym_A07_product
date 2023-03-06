# -*- coding: utf-8 -*-

from flask import Flask, render_template, request
from flask_login import LoginManager, login_required, UserMixin, login_user, logout_user
from flask_wtf.csrf import CSRFProtect
from sqlalchemy import *
from sqlalchemy.orm import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column
from sqlalchemy.types import Integer, String
from flask_cors import CORS, cross_origin
import sys

USER='root'
PASSWORD='tanisun1150'
HOST = 'localhost'
DATABASE = 'mysql://root:tanisun1150@localhost/test1'


app = Flask(__name__)
login_manager = LoginManager()
login_manager.init_app(app)
app.config['SECRET_KEY'] = "secret"
csrf = CSRFProtect(app)
CORS(app)

metadata = MetaData()

engine = create_engine(DATABASE)
session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = session.query_property()

class User(Base):
    __tablename__ = 'Users'
    id = Column('id', Integer, autoincrement=True, primary_key=True)
    name = Column('name', String(200), nullable=true)
    mail = Column('mail', String(200), nullable = false)
    password = Column('password', String(200), nullable=false)
    def __init__(self, mail, password):
        self.mail = mail
        self.password = password

    def __repr__(self):
        return 'User'

class LoginUser(UserMixin, User):
    def get_id(self):
        return self.id

def main(args):
    Base.metadata.create_all(bind=engine)

#このファイルを直接実行したとき、mainメソッドでテーブルを作成する
if __name__ == "__main__":
    main(sys.argv)

@login_manager.user_loader
def load_user(user_id):
    return LoginUser.query.filter(LoginUser.id == user_id).one_or_none()

@app.route('/signup', methods=["GET","POST"])
@cross_origin(origins=["http://localhost:5173"], methods=["GET", "POST"])
def signup():

    input_mail = request.json.get("mail")

    input_password = request.json.get("pass")

    if input_mail == None or input_password == None:
        return {"isRegister": "false"}
    
    user = User(input_mail, input_password) 
    session.add(user)
    session.commit()

    return {"isRegister": "true"}

@app.route('/login', methods=["GET", "POST"])
@cross_origin(origins=["http://localhost:5173"], methods=["GET", "POST"])
def login():

    input_mail = request.json.get("mail")
    input_password = request.json.get("pass")
    result = session.query().filter(User.mail == input_mail, User.password == input_password).one_or_none

    if result == None:
        return {"isAuth": "false"}

    return {"isAuth": "true"}

if __name__ == '__main__':
    app.run(host='localhost', port=8080)
