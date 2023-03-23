from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
         username='Demo',
         email='demo@aa.io',
         password='password',
         first_name='Demo',
         last_name='User',
         profile_picture="https://i.imgur.com/qlfoNpB.png",
         location_id=1,
         date_of_birth='1990-01-01',
         gender='Male',
         about_me='I am a demo user'
         )

    marnie = User(
         username='marnie',
         email='marnie@aa.io',
         password='password',
         first_name='Marnie',
         last_name='Smith',
         profile_picture="https://i.imgur.com/QYEbkIp.png",
         location_id=2,
         date_of_birth='1992-05-16',
         gender='Female',
         about_me='I am Marnie'
        )

    bobbie = User(
         username='bobbie',
         email='bobbie@aa.io',
         password='password',
         first_name='Bobbie',
         last_name='Johnson',
         profile_picture="https://i.imgur.com/8ZsfRqA.png",
         location_id=2,
         date_of_birth='1988-10-20',
         gender='Non-binary',
         about_me='I am Bobbie'
        )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
