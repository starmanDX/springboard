from models import db, connect_db, Todo
from app import app

db.drop_all()
db.create_all()

todos = [
    Todo(title="Feed the chickens"),
    Todo(title="Water Orchids"),
    Todo(title="Wash Dishes", done=True),
    Todo(title="Work out"),
    Todo(title="No really, work out!", done=True),
    Todo(title="Collect chicken eggs")
]

db.session.add_all(todos)
db.session.commit()
