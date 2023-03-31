from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, db
from app.forms import SignUpForm

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_user_info(id):
    user = User.query.get(id)
    res = request.get_json()
    if user:

        user.first_name = res.get('first_name', user.first_name)
        user.last_name = res.get('last_name', user.last_name)
        user.location_id = res.get('location_id', user.location_id)
        user.profile_picture = res.get('profile_picture', user.profile_picture)
        user.gender = res.get("gender", user.gender)
        user.about_me = res.get("about_me", user.about_me)
        db.session.commit()
        return user.to_dict()


@user_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_user(id):
    """
    Delete a user by id and returns a success message
    """
    user = User.query.get(id)

    if user:
        user.delete_user()  # Call the delete_user method from the User class
        return {'message': f'Successfully deleted user with id {id}'}
    else:
        return {'error': f'User with id {id} not found'}, 404


@user_routes.route('/check', methods=['POST'])
def check_username_email():
    """check if username and email exist"""
    data = request.get_json()
    username_exists = User.query.filter(User.username == data['username']).first() is not None
    email_exists = User.query.filter(User.email == data['email']).first() is not None

    return jsonify({
        'usernameExists': username_exists,
        'emailExists': email_exists
    })
