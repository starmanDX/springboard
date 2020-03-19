"""Seed file to make sample data for db."""

from models import Department, Employee, db
from app import app

db.drop_all()
db.create_all()

d1 = Department(dept_code="mktg", dept_name="Marketing", phone="619-555-5555")
d2 = Department(dept_code="acct", dept_name="Accounting", phone="619-111-5439")
d3 = Department(dept_code="r&d", dept_name="Research And Development", phone="619-988-7878")
d4 = Department(dept_code="sales", dept_name="Sales", phone="619-638-7008")
d5 = Department(dept_code="it", dept_name="Information Technology", phone="619-128-6693")
river = Employee(name="River Bottom", state="NY", dept_code="mktg")
joaquin = Employee(name="Joaquin Phoenix", dept_code="acct")
octavia = Employee(name="Octavia Spencer",  state="CA", dept_code="mktg")
larry = Employee(name="Larry David", dept_code="r&d")
kirk = Employee(name="Kirk Cobain",  state="AZ", dept_code="it")
rain = Employee(name="Rain Phoenix",  state="VA", dept_code="it")
summer = Employee(name="Summer Winters",  state="OR", dept_code="sales")

db.session.add_all([d1,d2,d3,d4,d5])

db.session.commit()

db.session.add_all([river, joaquin, octavia, larry, kirk, rain, summer])

db.session.commit()
