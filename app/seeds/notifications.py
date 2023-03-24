from app.models import db, Notification, SCHEMA, environment
from sqlalchemy.sql import text

def seed_notifications():
    notification1 = Notification(
        user_id=1,
        other_user_id=2
    )
    notification2 = Notification(
        user_id=2,
        other_user_id=3
    )
    notification3 = Notification(
        user_id=3,
        other_user_id=1
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
