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
from sqlalchemy.types import Integer, String, Boolean
import MySQLdb
import sys



USER='root'
PASSWORD='eito8110'#tanisun1150
HOST = 'localhost'
DATABASE = 'mysql://root:eito8110@localhost/tower'

app = Flask(__name__)
login_manager = LoginManager()
login_manager.init_app(app)
# app.config['SECRET_KEY'] = "secret"
# csrf = CSRFProtect(app)

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

# ---------------------------------------------------------------------------------------------------------
# 以下追加変更箇所
# テーブル：タスク一覧の定義 テーブル作成のSQL文はアプリの構成3ページに記載
class Task(Base):
    __tablename__ = 'task'
    id = Column('id', Integer, primary_key=True, autoincrement=True)
    user_id = Column('user_id', Integer)
    content = Column('content', String(100))
    display_flag = Column('display_flag', Boolean)
    valid_flag = Column('valid_flag', Boolean)
    
    def __init__(self, id=None, user_id=None, content=None, display_flag=True, valid_flag=True):
        self.id = id
        self.user_id = user_id
        self.content = content
        self.display_flag = display_flag
        self.valid_flag = valid_flag

# テーブル：タワーの定義
class Tower(Base):
    __tablename__ = 'Done_task'
    task_no = Column('task_no', Integer, primary_key=True, autoincrement=True)
    task_id = Column('task_id', Integer)
    user_id = Column('user_id', Integer)
    created_at = Column('created_at', TIMESTAMP, server_default=current_timestamp())
    
    def __init__(self, task_no=None, task_id=None, user_id=None, created_at=None):
        self.task_no = task_no
        self.task_id = task_id
        self.user_id = user_id
        self.created_at = created_at

# 仮のユーザーを指定
user_id=1

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        #表示フラッグがTrueかつ有効フラッグがTrueのタスクすべてを取得
        tasks = db_session.query(Task).filter(Task.display_flag==True, Task.valid_flag==True, Task.user_id==user_id).all()
        #タワーに載せるこれまでにやったタスクをすべて取得
        towers = db_session.query(Tower).all() 
        return render_template('top.html', tasks=tasks, towers=towers)

    else:
        #新しいタスクを作成
        content = request.form.get('content')
        new_task = Task(content=content, user_id=user_id)
        db_session.add(new_task)
        db_session.commit()
        return redirect('/')

#表示フラッグをFalseにしてタスクを完了状態にする。また、タワーのテーブルに追加する
@app.route('/complete/<int:id>')
def complete_task(id):
    complete_task = db_session.query(Task).filter(Task.id==id, Task.user_id==user_id).all()[0]
    complete_task.display_flag = False
    add_tower = Tower(task_id=id, user_id=user_id)
    db_session.add(complete_task)
    db_session.add(add_tower)
    db_session.commit()
    return redirect('/')

#表示フラッグと有効フラッグをfalseにしてタスクを削除する
@app.route('/delete/<int:id>')
def delete_task(id):
    delete_task = db_session.query(Task).filter(Task.id==id, Task.user_id==user_id).all()[0]
    delete_task.valid_flag = False
    delete_task.display_flag = False
    db_session.add(delete_task)
    db_session.commit()
    return redirect('/')

#表示フラッグがFalseかつ有効フラッグがTrueのタスクを未完了状態にする
@app.route('/reset')
def reset_display_flag():
    reset_tasks = db_session.query(Task).filter(Task.display_flag==False, Task.valid_flag==True, Task.user_id==user_id).all()
    for reset_task in reset_tasks:
        reset_task.display_flag = True
        db_session.add(reset_task)
    db_session.commit()
    return redirect('/')

#ここまで
#----------------------------------------------------------------------------------------------------------------
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
