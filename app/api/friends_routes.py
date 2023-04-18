from flask import Blueprint, jsonify, session, request
from app.models.friend import db, Friend

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

@friends_routes.route("/<int:id>", methods=["DELETE"])
def delete_a_friend(id):
    friend_to_delete = Friend.query.get(id)

    if friend_to_delete:
        friend_to_delete.delete_friend()
        return {"message": "Friend Deleted"}
    else:
        return {"error": "Friend not found."}, 404
