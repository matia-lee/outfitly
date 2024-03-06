from flask import Flask
from flask_cors import CORS
from database.database import init_db
from scripts.signup import signup

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"]}})


#for database
#for signing up/ logging in 
app.add_url_rule('/signup', view_func=signup, methods=['POST'])

        
if __name__ == '__main__':
    init_db()
    app.run(debug=True)