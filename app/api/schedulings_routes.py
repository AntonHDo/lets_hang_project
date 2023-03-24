from flask import Blueprint, jsonify, session, request
from app.models import db, Scheduling
from app.forms.schedulings_form import SchedulingForm
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime

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
        date_str = res["date"]
        date_obj = datetime.strptime(date_str, "%Y-%m-%d").date()
        time_start_obj = datetime.strptime(res["time_start"], '%H:%M').time()
        time_end_obj = datetime.strptime(res["time_end"], '%H:%M').time()
        scheduling = Scheduling(
            date=date_obj,
            time_start=time_start_obj,
            time_end=time_end_obj,
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
        date_str = res["date"]
        date_obj = datetime.strptime(date_str, "%Y-%m-%d").date()
        time_start_obj = datetime.strptime(res["time_start"], '%H:%M').time()
        time_end_obj = datetime.strptime(res["time_end"], '%H:%M').time()
        scheduling.date = date_obj
        scheduling.time_start = time_start_obj
        scheduling.time_end = time_end_obj
        scheduling.status = res["status"]
        scheduling.user_id = res["user_id"]
        scheduling.friend_id = res["friend_id"]
        scheduling.location_id = res["location_id"]
        db.session.commit()
        return scheduling.to_dict()


@schedulings_routes.route("/<int:id>/status", methods=["PUT"])
def update_scheduling_status(id):
    scheduling = Scheduling.query.get(id)
    res = request.get_json()
    if scheduling:
        scheduling.status=res["status"]
        db.session.commit()
        return scheduling.to_dict()
