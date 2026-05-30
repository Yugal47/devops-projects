from flask import Flask
app = Flask(__name__)

@app.route("/")
def home():
    return {"message": "Backend is running"}

@app.route("/api")
def api():
    return {"status": "backend working"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)