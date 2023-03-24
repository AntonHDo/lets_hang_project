from .db import db, SCHEMA, environment, add_prefix_for_prod

class Notification(db.Model):
    __tablename__ = "notifications"
    if environment == "production":
         __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    other_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    #relationships
    user = db.relationship("User", foreign_keys=[user_id])
    other_user = db.relationship("User", foreign_keys=[other_user_id])

    def to_dict(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "other_user_id": self.other_user_id,
            "user": self.user.to_dict(),
            "other_user": self.other_user.to_dict(),
        }
