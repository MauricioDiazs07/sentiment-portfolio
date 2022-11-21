from flask import Flask
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager, jwt_required
import os

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024
app.config["JWT_SECRET_KEY"] = "super-secret-1232342"

jwt = JWTManager(app)
cors = CORS(app)

@app.get('/')
def main():
    return "holi xd"

if __name__ == '__main__':
    HOST = os.environ.get("HOST", '0.0.0.0')
    port = int(os.environ.get("PORT", 5000))
    app.run(host=HOST, port=port, debug=True)