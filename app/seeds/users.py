from app.forms.signup_form import profile_picture
from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demo', email='demo@aa.io', password='password', full_name='Demo Dominic', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', full_name='Marnicus Mono', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', full_name='Bobbi Bo-lover', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    bobo = User(
        username='bobo', email='bobo@aa.io', password='password', full_name='Bobo Bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    bo = User(
        username='bo', email='bo@aa.io', password='password', full_name='Bo Bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    bojus = User(
        username='bojus', email='bojus@aa.io', password='password', full_name='Bojus Bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    bus = User(
        username='bus', email='bus@aa.io', password='password', full_name='Bus Bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    bibo = User(
        username='bibo', email='bibo@aa.io', password='password', full_name='Bibo Bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    boni = User(
        username='boni', email='boni@aa.io', password='password', full_name='Boni Bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    bobi = User(
        username='bobi', email='bobi@aa.io', password='password', full_name='Bobi Bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    bobu = User(
        username='bobu', email='bobu@aa.io', password='password', full_name='Bobu Bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    beaux = User(
        username='beaux', email='beaux@aa.io', password='password', full_name='Beaux Bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    coolguysteve = User(
        username='coolguysteve', email='coolguysteve@aa.io', password='password', full_name='Cool Guy Steve' profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    sus = User(
        username='sus', email='sus@aa.io', password='password', full_name='Sus Bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    mondo = User(
        username='mondo', email='mondo@aa.io', password='password', full_name='Mondo Bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    jun = User(
        username='jun', email='jun@aa.io', password='password', full_name='Jun Bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    stop = User(
        username='stop', email='stop@aa.io', password='password', full_name='Stop Bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    sonambulo = User(
        username='sonambulo', email='sonambulo@aa.io', password='password', full_name='Sonambulo Bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    bu = User(
        username='bu', email='bu@aa.io', password='password', full_name='Bu Bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    el = User(
        username='el', email='el@aa.io', password='password', full_name='El Schatz', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    lalo = User(
        username='lalo', email='lalo@aa.io', password='password', full_name='Lalo Muahahahahaha', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(bobo)
    db.session.add(bo)
    db.session.add(bojus)
    db.session.add(bus)
    db.session.add(bibo)
    db.session.add(boni)
    db.session.add(bobi)
    db.session.add(bobu)
    db.session.add(beaux)
    db.session.add(coolguysteve)
    db.session.add(sus)
    db.session.add(mondo)
    db.session.add(jun)
    db.session.add(stop)
    db.session.add(sonambulo)
    db.session.add(bu)
    db.session.add(el)
    db.session.add(lalo)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
