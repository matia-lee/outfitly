from flask import jsonify
from database.database import db_session
from database.models import Outfits

def get_fits():
    clothes = db_session.query(Outfits)
    clothes_list = [{"outfit_id": image.outfit_id, "username": image.username, "headwear": image.headwear, "top": image.top, "bottom": image.bottom, "footwear": image.footwear, "fit_name": image.fit_name} for image in clothes]
    return jsonify(clothes_list)