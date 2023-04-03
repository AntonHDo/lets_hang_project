from .db import db, SCHEMA, environment, add_prefix_for_prod

class Notification(db.Model):
    __tablename__ = "notifications"
    if environment == "production":
         __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    other_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    scheduling_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("schedulings.id")), nullable=True)
    type = db.Column(db.String(50), nullable=False)
    message = db.Column(db.String(255), nullable=False)
    read = db.Column(db.Boolean, default=False, nullable=False)

    #relationships
    user = db.relationship("User", foreign_keys=[user_id])
    other_user = db.relationship("User", foreign_keys=[other_user_id])
    scheduling = db.relationship("Scheduling", back_populates="notifications", foreign_keys=[scheduling_id])
    def decline(self):
        if self.scheduling:
            self.scheduling.status = "declined"  # update the scheduling status to "declined"
            db.session.delete(self)  # delete the notification
            db.session.commit()

    def to_dict(self):
        scheduling_dict = self.scheduling.to_dict() if self.scheduling else None
        return{
            "id": self.id,
            "user_id": self.user_id,
            "other_user_id": self.other_user_id,
            "user": self.user.to_dict(),
            "other_user": self.other_user.to_dict(),
            "scheduling_id": self.scheduling_id,
            "type": self.type,
            "message": self.message,
            "read": self.read,
            "scheduling": scheduling_dict
        }
