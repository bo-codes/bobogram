from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, Regexp

class EditPfpForm(FlaskForm):
    profilePicture = StringField('profilePicture', validators=[DataRequired()])
