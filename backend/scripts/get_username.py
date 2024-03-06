from flask import request, jsonify
from database.database import db_session
from database.models import User

def get_username():
    email = request.args.get('email')
    if not email:
        return jsonify({"message": "Could not find email in database"}), 400
    
    user = db_session.query(User).filter_by(email=email).first()
    if user:
        return jsonify({"message": user.username}), 200
    else:
        return jsonify({"message": "User not found"}), 404