from flask import Flask
from flask_cors import CORS

def comparator():
    # Create Flask app
    app = Flask(__name__)

    CORS(app)

    # Load configuration
    # app.config.from_pyfile('config.py')

    # Register blueprints (routes)
    from . import routes
    app.register_blueprint(routes.bp)

    return app
