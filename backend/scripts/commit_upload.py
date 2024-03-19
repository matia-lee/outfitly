from flask import request, jsonify
from database.database import db_session
from database.models import ImageModel

def commit_upload():
    data = request.get_json()
    url = data.get('url')
    username = data.get('username')
    interaction = data.get('interaction')
    
    if not url:
        return jsonify(error="Missing image url"), 400
    elif not username:
        return jsonify(error="Missing username"), 400
    elif not interaction:
        return jsonify(error="Missing interaction"), 400
    
    try:
        image_record = ImageModel(username=username, file_url=url, interaction=interaction)
        db_session.add(image_record)
        db_session.commit()
    except Exception as e:
        db_session.rollback() 
        print(e)
        return jsonify(error="Error saving to database"), 500

    return jsonify(message="Upload committed successfully", url=url, interaction=interaction), 200