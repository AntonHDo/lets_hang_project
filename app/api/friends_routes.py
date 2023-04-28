from flask import Blueprint, jsonify, session, request
from app.models.friend import db, Friend
from app.models.user import User
from flask_login import current_user

friends_routes = Blueprint("friends", __name__)

@friends_routes.route("/")
def get_all_friends():
    friends = Friend.query.all()
    return [friend.to_dict() for friend in friends]

@friends_routes.route("/<int:id>")
def get_single_friend(id):
    friend = Friend.query.get(id)
    friendDictionary = friend.to_dict()
    return friendDictionary

@friends_routes.route("/", methods=["POST"])
def create_new_friend():
    res = request.get_json()
    friend = Friend(
        user_id=res["user_id"],
        friend_id=res["friend_id"],
        status=res["status"]
    )
    db.session.add(friend)
    db.session.commit()
    return friend.to_dict()

@friends_routes.route("<int:id>/status", methods=["PUT"])
def update_friend_status(id):
    friend = Friend.query.get(id)
    res = request.get_json()
    if(friend):
        friend.status=res["status"]
        db.session.commit()
        return friend.to_dict()

# @friends_routes.route('/<int:friend_id>', methods=['DELETE'])
# def delete_a_friend(friend_id):
#     print(f"Friend ID to delete: {friend_id}")
#     current_user_id = current_user.id
#     print(f"Current user ID: {current_user_id}")

#     # Find the friend relationship you want to delete
#     friend_to_delete = Friend.query.filter(
#         ((Friend.user_id == current_user_id) & (Friend.friend_id == friend_id)) |
#         ((Friend.user_id == friend_id) & (Friend.friend_id == current_user_id))
#     ).first()

#     if not friend_to_delete:
#         return {"errors": ["Friendship not found."]}
#     print("FRIEND TO DELETE \n\n\n\n\n", friend_to_delete.to_dict())
#     friend_to_delete.delete_friend()
#     return {"message": "Friendship deleted."}
@friends_routes.route('/<int:friend_id>', methods=['DELETE'])
def delete_a_friend(friend_id):
    print(f"Friend ID to delete: {friend_id}")
    current_user_id = current_user.id
    print(f"Current user ID: {current_user_id}")

    # Find the friend relationships you want to delete
    friendships_to_delete = Friend.query.filter(
        ((Friend.user_id == current_user_id) & (Friend.friend_id == friend_id)) |
        ((Friend.user_id == friend_id) & (Friend.friend_id == current_user_id))
    ).all()

    if not friendships_to_delete:
        return {"errors": ["Friendship(s) not found."]}

    # Delete all matching friendships
    for friendship in friendships_to_delete:
        friendship.delete_friend()

    return {"message": "Friendship(s) deleted."}
