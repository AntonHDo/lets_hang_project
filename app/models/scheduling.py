from .db import db, SCHEMA, environment, add_prefix_for_prod
from datetime import date, datetime


class Scheduling(db.Model):
    __tablename__ = "schedulings"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date(), default=date.today())
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
    notifications = db.relationship("Notification", back_populates="scheduling", cascade="all, delete-orphan")

    def delete_scheduling(self):
    # Delete related notifications
        for notification in self.notifications:
            db.session.delete(notification)

    # Delete the scheduling itself
        db.session.delete(self)
        db.session.commit()

    def __init__(self, user_id, friend_id, **kwargs):
        if user_id == friend_id:
            raise ValueError("User and friend cannot be the same.")
        self.user_id = user_id
        self.friend_id = friend_id
        super().__init__(**kwargs)

    def to_dict(self):
        user_dict = self.user.to_dict() if self.user else None
        friend_dict = self.friend.to_dict() if self.friend else None
        return{
            "id": self.id,
            "date": self.date.strftime('%Y-%m-%d'),
            "time_start": self.time_start.strftime('%H:%M'),
            "time_end": self.time_end.strftime('%H:%M'),
            "status": self.status,
            "user_id": self.user_id,
            "friend_id": self.friend_id,
            "location_id": self.location_id,
            "user": user_dict,
            "friend": friend_dict
        }
