# -*- coding: utf-8 -*-

from flask import Flask, redirect, render_template, redirect
from flask_login import LoginManager, login_required, UserMixin, login_user, logout_user
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import *
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

metadata = MetaData()

engine = create_engine(DATABASE)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()

class Book(Base):
    __tablename__ = 'Book'
    isbn = Column('isbn', Integer, primary_key=True)
    title = Column('title', String(200))
    price = Column('price', Integer)
    publish = Column('publish', String(200))
    published = Column('published', String(200))

    def __init__(self, isbn, title, price, publish, published):
        self.isbn = isbn
        self.title = title
        self.price = price
        self.publish = publish
        self.published = published

cur = db_session.query(Book).all()

app = Flask(__name__)
app.app_context().push()
login_manager = LoginManager()
login_manager.init_app(app)
app.config['SECRET_KEY'] = "secret"

db_uri = 'sqlite:///login.db'
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
db = SQLAlchemy(app)

class User(UserMixin, db.Model):
    __tablename__ = 'User'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text())
    mail = db.Column(db.Text())
    def __init__(self,name, mail):
        self.name = name
        self.mail = mail

db.create_all()

class LoginForm(FlaskForm):
    name = StringField('名前')
    mail = StringField('メールアドレス')
    submit = SubmitField('ログイン')

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def index():
    return render_template('top.html')

@app.route('/member')
@login_required
def member():
    return render_template('member.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()

    if form.validate_on_submit():
        if form.name.data == 'ANDoblog' and form.mail.data == 'test@mail':
            user = User(form.name.data)
            login_user(user)
            return redirect('/member')
        else:
            return 'ログインに失敗しました'
        
    return render_template('login.html', form=form)

@app.route('/logout')
def logout():

    logout_user()

    return render_template('logout.html')

if __name__ == '__main__':
    app.run(host="localhost", port=8888, debug=True)
