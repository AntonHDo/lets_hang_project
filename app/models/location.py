from .db import db, SCHEMA, environment, add_prefix_for_prod


class Location(db.Model):
    __tablename__ = "locations"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    location_name = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(255), nullable=False)
    preview_img = db.Column(db.String(255), nullable=False)

    # relationships
    users = db.relationship("User", back_populates="location")
    schedulings = db.relationship("Scheduling", back_populates="location")

    def to_dict(self):
        return {
            "id": self.id,
            "location_name": self.location_name,
            "city": self.city,
            "state": self.state,
            "country": self.country,
            "preview_img": self.preview_img,
            # "users": [user.to_dict() for user in self.users],
            # "schedulings": [scheduling.to_dict() for scheduling in self.schedulings]
        }
