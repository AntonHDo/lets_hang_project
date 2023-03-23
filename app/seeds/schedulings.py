from app.models import db, Scheduling, SCHEMA, environment
from sqlalchemy.sql import text
from datetime import datetime, timedelta, date


def seed_schedulings():
    scheduling1 = Scheduling(
        user_id=1,
        friend_id=2,
        location_id=1,
        date=datetime(2023, 3, 22),
        time_start=datetime(2023, 3, 22, 10, 30),
        time_end=datetime(2023, 3, 22, 11, 30),
        status="Lets Hang!"
    )
    scheduling2 = Scheduling(
        user_id=2,
        friend_id=1,
        location_id=2,
        date=datetime(2023, 3, 23),
        time_start=datetime(2023, 3, 23, 14, 0),
        time_end=datetime(2023, 3, 23, 15, 0),
        status="Declined"
    )
    scheduling3 = Scheduling(
        user_id=2,
        friend_id=3,
        location_id=2,
        date=datetime(2023, 3, 24),
        time_start=datetime(2023, 3, 24, 14, 0),
        time_end=datetime(2023, 3, 24, 15, 0),
        status="Scheduled"
    )
    db.session.add_all([scheduling1, scheduling2, scheduling3])
    db.session.commit()

def undo_schedulings():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.schedulings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM schedulings")

    db.session.commit()
