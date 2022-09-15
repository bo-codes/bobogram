from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError

def name_required(form, field):
    full_name = field.data
    if len(full_name) <= 0:
        raise ValidationError('Name required.')

def username_required(form, field):
    username = field.data
    if len(username) <= 0:
        raise ValidationError('Username required.')

def email_required(form, field):
    email = field.data
    if len(email) <= 0:
        raise ValidationError('Email required.')

class EditUserForm(FlaskForm):
    fullName = StringField('fullName', validators=[name_required])
    username = StringField(
        'username', validators=[username_required])
    website = StringField('website')
    bio = TextAreaField('bio')
    email = StringField('email', validators=[email_required])
    phoneNumber = StringField('phoneNumber')
    gender = StringField('gender')
