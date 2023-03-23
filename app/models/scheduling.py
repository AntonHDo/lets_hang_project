from .db import db, SCHEMA, environment, add_prefix_for_prod
from datetime import date


class Scheduling(db.Model):
    __tablename__ = "schedulings"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, default=date.today())
    time_start = db.Column(db.Time, nullable=False)
    time_end = db.Column(db.Time, nullable=False)
    status = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    friend_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("locations.id")), nullable=False)

    #relationships
    user = db.relationship("User", foreign_keys=[user_id])
    friend = db.relationship("User", foreign_keys=[friend_id])
    location = db.relationship("Location", back_populates="schedulings")

    def __init__(self, user_id, friend_id, **kwargs):
        if user_id == friend_id:
            raise ValueError("User and friend cannot be the same.")
        self.user_id = user_id
        self.friend_id = friend_id
        super().__init__(**kwargs)

    def to_dict(self):
        return{
            "id": self.id,
            "date": self.date,
            "time_start": self.time_start,
            "time_end": self.time_end,
            "status": self.status,
            "user_id": self.user_id,
            "friend_id": self.friend_id,
            "location_id": self.location_id,
            "user": self.user.to_dict(),
            "friend": self.friend.to_dict(),
        }
