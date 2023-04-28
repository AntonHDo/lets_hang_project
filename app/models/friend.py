from .db import db, SCHEMA, environment, add_prefix_for_prod


class Friend(db.Model):
    __tablename__ = "friends"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    friend_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    status = db.Column(db.String, nullable=False)

    #relationships
    user = db.relationship("User", foreign_keys=[user_id])
    friend = db.relationship("User", foreign_keys=[friend_id])



    def delete_friend(self):
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
            "user_id": self.user_id,
            "friend_id": self.friend_id,
            "user": user_dict,
            "friend":friend_dict,
            "status": self.status
        }
