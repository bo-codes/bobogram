from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms.edituser_form import EditUserForm
from app.forms.edit_pfp_form import EditPfpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            full_name=form.data['fullName'],
            profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg'
            # avatar=form.data['avatar']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@auth_routes.route('/accounts/<int:id>', methods=["PUT"])
@login_required
def update_user(id):
    """
    Updates a logged in user
    """
    user = User.query.get(id)
    if user.id == 1:
        return {'errors': ['You cannot edit the demo user, try creating your own user!']}, 403
    else:
        form = EditUserForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        print("\n\n\n\n USER BACKEND", user.bio, '\n\n\n\n')
        if form.validate_on_submit():
            print("MADE IT PAST FORM VALIDATE")
            # user = User.query.filter(User.id == id).first()

            user.full_name = form.data['fullName']
            user.username = form.data['username']
            user.website = form.data['website']
            user.bio = form.data['bio']
            user.email = form.data['email']
            user.phone_number = form.data['phoneNumber']
            user.gender = form.data['gender']

            db.session.commit()
            return user.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@auth_routes.route('/accounts/pfp/<int:id>', methods=["PUT"])
@login_required
def update_pfp(id):
    """
    Updates a logged in user
    """
    user = User.query.get(id)
    if user.id == 1:
        return {'errors': ['You cannot edit the demo user, try creating your own user!']}, 403
    else:
        form = EditPfpForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():

            user.profile_picture = form.data['profilePicture']

            db.session.commit()
            return user.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/dashboard/<int:id>', methods=["DELETE"])
def delete_user(id):
    """
    Deletes a user account
    """
    user = User.query.get(id)
    if user.id == 1:
        return {'error': ['You cannot delete the demo user.']}, 403
    else:
        db.session.delete(user)
        db.session.commit()
        return {"message": "User deleted successfully"}, 200


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
