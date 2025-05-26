from flask import Flask
from api.user import user_bp
import os
import firestore  

def create_app():
    app = Flask(__name__)
    
    app.register_blueprint(user_bp)
    
    # Test route to verify the app is running
    @app.route('/')
    def index():
        return "Welcome to the Flask API!"
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5001)

