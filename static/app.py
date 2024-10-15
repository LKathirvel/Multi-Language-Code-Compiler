from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

# Define a route for the home page
@app.route('/')
def home():
    return render_template('index.html')

# Route for serving static files (CSS, JS, images)
@app.route('/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    # Create static directory if it doesn't exist
    os.makedirs('static', exist_ok=True)
    app.run(debug=True)
