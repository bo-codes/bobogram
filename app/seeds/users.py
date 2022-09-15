from app.forms.signup_form import profile_picture
from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demo', email='demo@aa.io', password='password', full_name='Demo Dominic', profile_picture='https://bobogrambucket.s3.amazonaws.com/a1c9bbe867cc42f38c44cb7c10f1c118.jpeg')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', full_name='Marnicus Mono', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    bobbie = User(
        username='bobbie', email='bobbi@aa.io', password='password', full_name='Bobbi Bo-lover', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    bobo = User(
        username='bobo', email='bobo@aa.io', password='password', full_name='Bobo Bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/83376c8d72a44e00af0395262997a5ea.jpeg')
    bo = User(
        username='bo', email='bo@aa.io', password='password', full_name='Bo Bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/56867299c6c84453a7656df55a172e4c.jpeg')
    bojus = User(
        username='bojus', email='bojus@aa.io', password='password', full_name='Bojus Bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/e9c985c1d66841499c46e965b6576651.jpeg')
    baby = User(
        username='baby', email='baby@aa.io', password='password', full_name='Baby Akin', profile_picture='https://bobogrambucket.s3.amazonaws.com/43f65119c2c345f89b7e8a87ccc433f0.jpg')
    bibo = User(
        username='bibo', email='bibo@aa.io', password='password', full_name='Bibo Bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/dc2c8a72f2784b6497ab7caacda7ed1c.jpg')
    boni = User(
        username='boni', email='boni@aa.io', password='password', full_name='Boni Bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/7c7c785147bc4bec9cb0a608759e48bb.jpeg')
    bobi = User(
        username='bobi', email='bobi@aa.io', password='password', full_name='Bobi Bobus', profile_picture='	https://bobogrambucket.s3.amazonaws.com/9b3750732ba940f0b9127a499561ee36.jpeg')
    bobu = User(
        username='bobu', email='bobu@aa.io', password='password', full_name='Bobu Bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/03d20fc664d64801a83536ed18e698ea.jpeg')
    swan = User(
        username='swan', email='swan@aa.io', password='password', full_name='Swan Thing', profile_picture='https://bobogrambucket.s3.amazonaws.com/baf3b66dce3140f2966be78053e61530.jpg')
    coolguysteve = User(
        username='coolguysteve', email='coolguysteve@aa.io', password='password', full_name='Cool Guy Steve', profile_picture='https://bobogrambucket.s3.amazonaws.com/67794a7211874a7296083fdad522d1bf.jpg')
    sus = User(
        username='sus', email='sus@aa.io', password='password', full_name='Sus Bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/ef3d95d6e9714403a5d124c340300edc.jpg')
    mondo = User(
        username='mondo', email='mondo@aa.io', password='password', full_name='Mondo Bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/11144f8a66634cb0b5752ea4c12318b0.jpg')
    stu = User(
        username='stu', email='stu@aa.io', password='password', full_name='Stu Bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/a1c9bbe867cc42f38c44cb7c10f1c118.jpeg')
    pop = User(
        username='pop', email='pop@aa.io', password='password', full_name='Pop Bobus', profile_picture='https://bobogrambucket.s3.amazonaws.com/189aeeeb08204fb0b5225334dfd38563.jpeg')
    amy = User(
        username='amy', email='amy@aa.io', password='password', full_name='Amee ee', profile_picture='https://bobogrambucket.s3.amazonaws.com/f62090fa9ba042c9bd52133ff00ea186.jpeg')
    kirby = User(
        username='kirby', email='kirby@aa.io', password='password', full_name='Kirby Poyo', profile_picture='https://bobogrambucket.s3.amazonaws.com/55afffd57e9e468ca367260b18be4bd2.jpg')
    el = User(
        username='el', email='el@aa.io', password='password', full_name='El Schatz', profile_picture='https://bobogrambucket.s3.amazonaws.com/b964518089ec40d083d229f57bd3b89d.jpeg')
    lalo = User(
        username='lalo', email='lalo@aa.io', password='password', full_name='Lalo Muahahahahaha', profile_picture='https://bobogrambucket.s3.amazonaws.com/6f00f3e66f084737bb2914c52c05c6db.jpg')
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(bobo)
    db.session.add(bo)
    db.session.add(bojus)
    db.session.add(baby)
    db.session.add(bibo)
    db.session.add(boni)
    db.session.add(bobi)
    db.session.add(bobu)
    db.session.add(swan)
    db.session.add(coolguysteve)
    db.session.add(sus)
    db.session.add(mondo)
    db.session.add(stu)
    db.session.add(pop)
    db.session.add(amy)
    db.session.add(kirby)
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
