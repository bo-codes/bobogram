from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func
from sqlalchemy import DateTime
# from .post import user_posts
from .follow import follows
# from .like import Like
# from .post import Post

class User(db.Model, UserMixin):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(30), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    website = db.Column(db.String(40))
    bio = db.Column(db.String(150))
    email = db.Column(db.String(255), nullable=False, unique=True)
    phone_number = db.Column(db.String(15))
    gender = db.Column(db.String(18))
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_picture = db.Column(db.String(255))
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())


    comments = db.relationship('Comment', back_populates='user')
    posts = db.relationship('Post', back_populates='user', cascade='all, delete', passive_deletes=True)
    likes = db.relationship("Like",
            back_populates="user",
    )

    followed = db.relationship(
        'User', secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.followed_id == id),
        backref=db.backref('follows', lazy='dynamic'), lazy='dynamic')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'username': self.username,
            'website': self.website,
            'bio': self.bio,
            'email': self.email,
            'phone_number': self.phone_number,
            'gender': self.gender,
            'created_at': self.created_at,
            'profile_picture': self.profile_picture,
            'followers': [user.to_dict_short() for user in self.follows],
            'following': [user.to_dict_short() for user in self.followed]
        }

    def to_dict_short(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'username': self.username,
            'email': self.email,
            'profile_picture': self.profile_picture,
            'created_at': self.created_at,
        }

    def follow(self, user):
        if not self.is_following(user):
            self.followed.append(user)

    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)

    def is_following(self, user):
        return self.followed.filter(
            follows.c.followed_id == user.id).count() > 0

    def is_not_following(self, user):
        return self.followed.filter(
            follows.c.followed_id == user.id).count() <= 0
