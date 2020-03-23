from unittest import TestCase

from app import app
from models import db, Todo

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///todos_test_db'
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

db.drop_all()
db.create_all()


class TodoViewsTestCase(TestCase):
    """Tests for views about todos."""

    def setUp(self):
        """Make demo data."""

        Todo.query.delete()
        db.session.commit()

        todo = Todo(title='TestTodo', done=True)
        db.session.add(todo)
        db.session.commit()

        self.todo_id = todo.id

    def tearDown(self):
        """Clean up fouled transactions."""

        db.session.rollback()

    def test_all_todos(self):
        with app.test_client() as client:
            resp = client.get("/api/todos")
            self.assertEqual(resp.status_code, 200)

            self.assertEqual(
                resp.json,
                {'todos': [{
                    'id': self.todo_id,
                    'title': 'TestTodo',
                    'done': True
                }]})

    def test_get_single_todo(self):
        with app.test_client() as client:
            resp = client.get(f"/api/todos/{self.todo_id}")
            self.assertEqual(resp.status_code, 200)

            self.assertEqual(
                resp.json,
                {'todo': {
                    'id': self.todo_id,
                    'title': 'TestTodo',
                    'done': True}})

    def test_create_todo(self):
        with app.test_client() as client:
            resp = client.post(
                "/api/todos", json={
                    "title": "TestTodo2",
                    "done": True
                })
            self.assertEqual(resp.status_code, 201)

            # don't know what ID it will be, so test then remove
            self.assertIsInstance(resp.json['todo']['id'], int)
            del resp.json['todo']['id']

            self.assertEqual(
                resp.json,
                {"todo": {'done': False, 'title': 'TestTodo2'}})

            self.assertEqual(Todo.query.count(), 2)
