from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, Regexp

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

def bio_length(form, field):
    bio = field.data
    if len(bio) > 150:
        raise ValidationError('Bio must be 150 characters or less.')

def phone_length(form, field):
    phone_number = field.data
    if len(phone_number) > 10:
        raise ValidationError('Please enter valid U.S. phone number.')

class EditUserForm(FlaskForm):
    fullName = StringField('fullName', validators=[name_required])
    username = StringField(
        'username', validators=[username_required])
    website = StringField('website',
    # validators=[Regexp('(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)', message='Please provide a valid website')]
    )
    bio = TextAreaField('bio', validators=[bio_length])
    email = StringField('email', validators=[email_required])
    phoneNumber = StringField('phoneNumber',
    # validators=[Regexp('^(\\d{3}[- ]?){2}\\d{4}$', message="Please provide a valid phone number.")]
    )
    gender = StringField('gender')
