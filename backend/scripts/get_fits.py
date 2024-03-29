from flask import jsonify, request
from database.database import db_session
from database.models import Outfits
from sqlalchemy import desc

def get_fits():
    username = request.args.get('username')
    
    if username:
        outfits = db_session.query(Outfits).filter(Outfits.username == username).order_by(desc(Outfits.outfit_id))
    else:
        outfits = db_session.query(Outfits).order_by(desc(Outfits.outfit_id))
    
    outfits_list = [
        {
            "outfit_id": outfit.outfit_id,
            "username": outfit.username,
            "headwear": outfit.headwear,
            "top": outfit.top,
            "bottom": outfit.bottom,
            "footwear": outfit.footwear,
            "fit_name": outfit.fit_name
        } for outfit in outfits
    ]
    return jsonify(outfits_list)