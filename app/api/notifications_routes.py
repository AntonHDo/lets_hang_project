from flask import Blueprint, jsonify, session, request
from app.models import db, Notification

notifications_routes = Blueprint("notifications", __name__)

@notifications_routes.route("/")
def get_all_notifications():
    notifications = Notification.query.all()
    return [notification.to_dict() for notification in notifications]


@notifications_routes.route("/<int:id>")
def get_single_notification(id):
    notification = Notification.query.get(id)
    notificationDictionary = notification.to_dict()
    return notificationDictionary


@notifications_routes.route("/", methods=["POST"])
def create_new_notification():
    res = request.get_json()
    scheduling_id = res.get("scheduling_id", None)
    notification = Notification(
        user_id=res["user_id"],
        other_user_id=res["other_user_id"],
        scheduling_id=scheduling_id,
        type="scheduling_request",
        message=res["message"],
        read=False
    )
    db.session.add(notification)
    db.session.commit()
    return jsonify(notification.to_dict())


@notifications_routes.route("/<int:id>", methods=["DELETE"])
def delete_a_notification(id):
    notification = Notification.query.get(id)
    if notification:
        if notification.type == "scheduling_request":
            notification.decline()
            return {"Response": "Successfully declined the scheduling request and deleted the notification."}
        else:
            db.session.delete(notification)
            db.session.commit()
            return {"Response": "Successfully deleted the notification."}
    else:
        return {"Error": "Notification not found"}, 404
