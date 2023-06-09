from app.models import db, Scheduling, SCHEMA, environment
from sqlalchemy.sql import text
from datetime import datetime, time, date


def seed_schedulings():
    scheduling1 = Scheduling(
        user_id=1,
        friend_id=2,
        location_id=1,
        date=date(2023, 3, 22),
        time_start=time(10, 30),
        time_end=time(11, 30),
        status="Pending"
    )
    scheduling2 = Scheduling(
        user_id=2,
        friend_id=1,
        location_id=2,
        date=date(2023, 3, 23),
        time_start=time(14, 0),
        time_end=time(15, 0),
        status="Declined"
    )
    scheduling3 = Scheduling(
        user_id=2,
        friend_id=3,
        location_id=2,
        date=date(2023, 3, 24),
        time_start=time(14, 0),
        time_end=time(15, 0),
        status="Pending"
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
