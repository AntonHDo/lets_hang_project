from flask import Blueprint, jsonify, session, request
from app.models import db, Location
from app.forms.locations_form import LocationForm
from flask_login import current_user, login_user, logout_user, login_required

locations_routes = Blueprint("locations", __name__)


@locations_routes.route("/")
def get_all_locations():
    locations = Location.query.all()
    return [location.to_dict() for location in locations]

@locations_routes.route("/<int:id>")
def get_single_location(id):
    location = Location.query.get(id)
    locationDictionary = location.to_dict()
    return locationDictionary

# @locations_routes.route("/")
# def create_new_location():
#     res = request.get_json()
#     form = LocationForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]
#     if form.validate_on_submit():
#         location = Location(
#           location_name=res["location_name"],
#           city=res["city"],
#           state=res["state"],
#           country=res["country"],
#           preview_img=res["preview_img"],
#         )
#         db.session.add(location)
#         db.session.commit()
#         return location.to_dict()
