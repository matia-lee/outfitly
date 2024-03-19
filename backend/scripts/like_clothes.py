from flask import request, jsonify
from database.database import db_session
from database.models import ImageModel

def like_clothes():
    data = request.get_json()
    image_id = data.get('imageId')

    if not image_id:
        return jsonify(error="Missing image id"), 400
    
    image_like = db_session.query(ImageModel).filter_by(id=image_id).first()

    if not image_like:
        return jsonify(erro="Error finding image id"), 404
    
    try:
        if image_like.like == "like":
            image_like.like = None
        else:
            image_like.like = "like"

        db_session.commit()
    except Exception as e:
        db_session.rollback() 
        print(e)
        return jsonify(error="Error saving to database"), 500
    
    return jsonify(message="Upload committed successfully"), 200