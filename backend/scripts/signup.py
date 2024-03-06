from flask import request, jsonify
from database.database import db_session
from database.models import User
from sqlalchemy.exc import IntegrityError

def signup(): 
    data = request.get_json()
    try:
        new_user = User(username=data['username'], email=data['email'])
        db_session.add(new_user)
        db_session.commit()
        return jsonify({"message": "User added successfully."}), 201
    except IntegrityError as e:
        db_session.rollback()
        if 'email' in str(e.orig):
            return jsonify({"message": "Email already in use"}), 409
        elif 'username' in str(e.orig):
            return jsonify({"message": "Username taken"}), 409
        else:
            return jsonify({"message": "Error occured"}), 409