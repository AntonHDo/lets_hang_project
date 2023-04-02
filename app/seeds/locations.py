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
    location3 = Location(
        location_name="Castle Rock",
        city="Santa Cruz",
        state="California",
        country="United State",
        preview_img="https://i.imgur.com/mUakiK2.jpeg"
    )
    location4 = Location(
        location_name="Oslo Klatresenter",
        city="Oslo",
        state="N/A",
        country="Norway",
        preview_img="https://live.staticflickr.com/816/39037003290_8f24f55cd6_k.jpg"
    )
    location5 = Location(
        location_name="Big Rock",
        city="Black Diabmond",
        state="Alberta",
        country="Canada",
        preview_img="https://i.imgur.com/mDSKYQm.jpeg"
    )

    db.session.add_all([
        location1,
        location2,
        location3,
        location4,
        location5
    ])

    db.session.commit()

def undo_locations():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.locations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM locations")

    db.session.commit()
