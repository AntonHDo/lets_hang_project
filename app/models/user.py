from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .scheduling import Scheduling
from .notification import Notification

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("locations.id"), ondelete="CASCADE"), nullable=True)
    profile_picture = db.Column(db.String)
    date_of_birth = db.Column(db.String, nullable=False)
    gender = db.Column(db.String, nullable=False)
    about_me = db.Column(db.String(2000), nullable=False)

    #relationships
    location = db.relationship("Location", back_populates="users")

    def delete_user(self):
        # Delete related schedulings
        schedulings = db.session.query(Scheduling).filter(
            (Scheduling.user_id == self.id) | (Scheduling.friend_id == self.id)
        ).all()
        for scheduling in schedulings:
            scheduling.delete_scheduling()

        # Delete related notifications
        notifications = db.session.query(Notification).filter(
            (Notification.user_id == self.id) | (Notification.other_user_id == self.id)
        ).all()
        for notification in notifications:
            db.session.delete(notification)

        self.location_id = None
        db.session.commit()
        # Delete the user itself
        db.session.delete(self)
        db.session.commit()


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'location_id': self.location_id,
            'profile_picture': self.profile_picture,
            'date_of_birth': self.date_of_birth,
            'gender': self.gender,
            'about_me': self.about_me
        }
