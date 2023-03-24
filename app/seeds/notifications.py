from app.models import db, Notification, Scheduling, SCHEMA, environment
from sqlalchemy.sql import text

def seed_notifications():
    scheduling1 = Scheduling.query.filter_by(user_id=1, friend_id=2).first()
    scheduling2 = Scheduling.query.filter_by(user_id=2, friend_id=1).first()
    scheduling3 = Scheduling.query.filter_by(user_id=2, friend_id=3).first()

    notification1 = Notification(
        user_id=1,
        other_user_id=2,
        scheduling_id=1,
        type="Invite",
        message="User 1 invites you to hang out at Location 1",
        read=False
    )
    notification2 = Notification(
        user_id=2,
        other_user_id=3,
        scheduling_id=2,
        type="Invite",
        message="User 2 invites you to hang out at Location 2",
        read=False
    )
    notification3 = Notification(
        user_id=3,
        other_user_id=1,
        scheduling_id=3,
        type="Invite",
        message="User 3 invites you to hang out at Location 3",
        read=False
    )

    db.session.add_all([
        notification1,
        notification2,
        notification3
    ])

    db.session.commit()


def undo_notifications():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.notifications RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM notifications")

    db.session.commit()
