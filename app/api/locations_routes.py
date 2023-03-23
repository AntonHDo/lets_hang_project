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
