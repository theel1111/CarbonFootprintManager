from flask import Blueprint, request, jsonify
from models.user_model import create_user, get_user_by_account, verify_password

user_bp = Blueprint('user', __name__)

@user_bp.route('/user/register', methods=['POST'])
def register():
    data = request.json
    account = data.get('account')
    password = data.get('password')
    user_name = data.get('user_name')

    if not account or not password or not user_name:
        return jsonify({"error": "Account, password, and user name are required"}), 400

    existing_user = get_user_by_account(account)
    if existing_user:
        return jsonify({"error": "User already exists"}), 409

    create_user(account, password, user_name)  
    return jsonify({"message": "User registered successfully"}), 201



@user_bp.route('/user/login', methods=['POST'])
def login():
    data = request.json
    if data is None:
        return jsonify({"error": "Invalid JSON or missing Content-Type header"}), 400
    
    account = data.get('account')
    password = data.get('password')

    if not account or not password:
        return jsonify({"error": "Account and password required"}), 400

    user = get_user_by_account(account)
    if user and verify_password(user['password'], password):
        return jsonify({"message": "Login successful", "user": user}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401
