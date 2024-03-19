from flask import request, jsonify
from database.database import db_session
from database.models import Outfits

def save_outfit():
    data = request.json
    new_outfit = Outfits(
        username=data['username'],
        headwear = data.get('headwear', ''),
        top = data.get('top', ''),
        bottom = data.get('bottom', ''),
        footwear = data.get('footwear', ''),
        fit_name = data.get('fit_name', '')
    )
    db_session.add(new_outfit)
    db_session.commit()

    return jsonify({"message": "Outfit saved successfully"}), 200