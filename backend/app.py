from flask import Flask, request, jsonify
from flask_cors import CORS
from database.database import init_db
from scripts.signup import signup
from scripts.get_username import get_username
import boto3
from uuid import uuid4
from werkzeug.utils import secure_filename
from scripts.background_remover import remove_background_and_save
from PIL import Image
from database.models import ImageModel
from database.database import db_session
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"]}})


#for database
#for signing up/ logging in 
app.add_url_rule('/signup', view_func=signup, methods=['POST'])
#for grabbing username for authcontext
app.add_url_rule('/get_username', view_func=get_username, methods=['GET'])

s3 = boto3.client('s3', aws_access_key_id=os.getenv('aws_access_key_id'), aws_secret_access_key=os.getenv('aws_secret_access_key'), region_name=os.getenv('region_name'))
BUCKET_NAME = 'outfitly'

temp_file_paths = {}

@app.route('/temporary_upload', methods=['POST'])
def upload_file():
    global temp_file_paths 

    if 'file' not in request.files:
        return jsonify(error="No file part"), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify(error="No selected file"), 400
    if file.content_type != 'image/png':
        return jsonify(error="Only png allowed"), 400
    if file:
        original_filename = secure_filename(file.filename)
        unique_id = uuid4().hex
        filename = f"{unique_id}_{original_filename}"
        temp_input_path = os.path.join('/tmp', filename)
        processed_file_path = os.path.join('/tmp', 'processed_' + filename)  
        
        file.save(temp_input_path)
        
        remove_background_and_save(temp_input_path, processed_file_path)

        with Image.open(processed_file_path) as img:
            img = img.resize((400, 320))
            img = img.rotate(270)
            img.save(processed_file_path)

        temp_file_paths[filename] = {
            'path': processed_file_path,
            'temp_input_path': temp_input_path
        }

        try:
            s3.upload_file(processed_file_path, BUCKET_NAME, 'path/in/bucket/' + filename)
        except Exception as e:
            print(e)
            return jsonify(error=str(e)), 500
        file_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/path/in/bucket/{filename}"

        return jsonify({
            'message': 'File uploaded successfully, awaiting confirmation',
            'tempId': filename,
            'url': file_url
        }), 200

@app.route('/commit_upload', methods=['POST'])
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

@app.route('/get_clothes', methods=['GET'])
def get_clothes():
    clothes = db_session.query(ImageModel)
    clothes_list = [{"id": image.id, "username": image.username, "file_url": image.file_url, "interaction": image.interaction} for image in clothes]
    return jsonify(clothes_list)

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

if __name__ == '__main__':
    init_db()
    app.run(debug=True)