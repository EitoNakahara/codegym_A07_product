# -*- coding: utf-8 -*-

from flask import Flask, redirect, render_template, request
from flask_login import LoginManager, login_required, UserMixin, login_user, logout_user
from flask_wtf import FlaskForm
from flask_wtf.csrf import CSRFProtect
from wtforms import StringField, SubmitField
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import *
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.orm import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column
from sqlalchemy.types import Integer, String
import MySQLdb
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
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()

class User(Base):
    __tablename__ = 'Users'
    id = Column('id', Integer, primary_key=True)
    name = Column('name', String(200))
    age = Column('age', Integer)
    description = Column('description', Text)
    topics = Column('topics', TEXT)
    created_at = Column('created_at', TIMESTAMP, server_default=current_timestamp())
    updated_at = Column('updated_at', TIMESTAMP, nullable=False, server_default=text('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))

    def __init__(self, id, name, age, description, topics, created_at, updated_at):
        self.id = id
        self.name = name
        self.age = age
        self.description = description
        self.topics = topics
        self.created_at = created_at
        self.updated_at = updated_at

    def __repr__(self):
        return 'User'

class LoginUser(UserMixin, User):
    def get_id(self):
        return self.id

def main(args):
    Base.metadata.drop_all(bind=engine)
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

@app.route('/login', methods=['GET'])
def form():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    name = request.form.get("name", "")

    try:
        user = LoginUser.query.filter(LoginUser.name == name).one_or_none()
        if user == None:
            return render_template('login.html', error="指定のユーザーは存在しません")
        else:
            login_user(user, remember=True)
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
    app.run(host="localhost", port=8888, debug=True)
