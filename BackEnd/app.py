# -*- coding: utf-8 -*-

from flask import Flask, redirect, render_template, request, make_response, jsonify, Blueprint
from flask_login import LoginManager, login_required, UserMixin, login_user, logout_user
from flask_wtf.csrf import CSRFProtect
from sqlalchemy import *
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.orm import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column
from sqlalchemy.types import Integer, String
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

@app.route('/')
def index():
    return render_template('top.html')


@app.route('/signup', methods=['GET'])
def signupForm():
    return render_template('signup.html')

@app.route('/signup', methods=['POST'])
def signup():

    input_mail = request.form.get("mail", "")

    input_password = request.form.get("password", "")

    if input_mail == None:
        return render_template('signup.html', error='please enter your mail')

    elif input_password == None:
        return render_template('signup.html', error='please enter your password')
    
    user = User(input_mail, input_password) 
    session.add(user)
    session.commit()

    return render_template('login.html', error='signup succeeded!')

@app.route('/login', methods=['GET'])
def loginForm():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    try:
        input_mail = request.form.get("mail", "")
        mail = session.query(User).filter(User.mail == input_mail).one_or_none()

        input_password = request.form.get("password", "")
        password = session.query(User).filter(User.password == input_password).one_or_none()

        if mail == None:
            return render_template('login.html', error='The mail does not exist')

        elif password == None:
            return render_template('login.html', error='Password incorrect')
        else:
            login_user(mail, remember=True)
    except Exception as e:
        return render_template('member.html')
    return render_template('member.html')

@app.route('/logout')
def logout():

    logout_user()

    return render_template('logout.html')

@app.route('/member')
@login_required
def member():
    return render_template('member.html')

if __name__ == '__main__':
    app.run()
