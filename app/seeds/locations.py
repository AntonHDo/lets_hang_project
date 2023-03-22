from app.models import db, Location, SCHEMA, environment
from sqlalchemy.sql import text

def seed_locations():
    location1 = Location(
        location_name="MovementSC",
        city="Santa Clara",
        state="California",
        country="United State",
        preview_img="https://i.imgur.com/foTau4Y.png"
    )
    location2 = Location(
        location_name="MovementSV",
        city="Sunnyvale",
        state="California",
        country="United State",
        preview_img="https://i.imgur.com/YMxk6Um.jpeg"
    )

    db.session.add_all([
        location1,
        location2,
    ])

    db.session.commit()

def undo_locations():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.locations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM locations")

    db.session.commit()
