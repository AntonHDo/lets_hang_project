from flask import Blueprint, jsonify, session, request
from app.models import db, Scheduling
from app.forms.schedulings_form import SchedulingForm
from flask_login import current_user, login_user, logout_user, login_required

schedulings_routes = Blueprint("schedulings", __name__)

@schedulings_routes.route("/")
def get_all_schedulings():
    schedulings = Scheduling.query.all()
    return [scheduling.to_dict() for scheduling in schedulings]

@schedulings_routes.route("/<int:id>")
def get_single_scheduling(id):
    scheduling = Scheduling.query.get(id)
    schedulingDictionary = scheduling.to_dict()
    # schedulingDictionary['user'] = scheduling.user.to_dict()
    # schedulingDictionary['locations'] = [location.to_dict() for location in scheduling.locations]
    return schedulingDictionary

@schedulings_routes.route("/", methods=['POST'])
def create_new_scheduling():
    res = request.get_json()
    form = SchedulingForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        scheduling = Scheduling(
            date=res["date"],
            time_start=res["time_start"],
            time_end=res["time_end"],
            status=res["status"],
            user_id=res["user_id"],
            friend_id=res["friend_id"],
            location_id=res["location_id"]
        )
        db.session.add(scheduling)
        db.session.commit()
        return scheduling.to_dict()

@schedulings_routes.route("/<int:id>", methods=["DELETE"])
def delete_a_scheduling(id):
    scheduling = Scheduling.query.get(id)
    if scheduling:
        db.session.delete(scheduling)
        db.session.commit()
        return {"Response": f"Successfully deleted scheduling."}


@schedulings_routes.route("/<int:id>", methods=["PUT"])
def edit_a_scheduling(id):
    scheduling = Scheduling.query.get(id)
    res = request.get_json()
    if scheduling:
        scheduling.date=res["date"],
        scheduling.time_start=res["time_start"],
        scheduling.time_end=res["time_end"],
        scheduling.status=res["status"],
        scheduling.user_id=res["user_id"],
        scheduling.friend_id=res["friend_id"],
        scheduling.location_id=res["location_id"]
        db.session.commit()
        return scheduling.to_dict()
