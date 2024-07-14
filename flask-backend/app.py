from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)

# Set up the SQLite database
db_path = os.path.join(os.path.dirname(__file__), 'comments.db')

def init_db():
    with sqlite3.connect(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS comments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                postId TEXT,
                comment TEXT,
                rating INTEGER
            )
        ''')
        conn.commit()

init_db()

# Helper function to handle database errors
def handle_db_error(err):
    print(err)
    return jsonify({'error': 'Internal Server Error'}), 500

# Route to get comments for a specific post
@app.route('/api/posts/<post_id>/comments', methods=['GET'])
def get_comments(post_id):
    try:
        with sqlite3.connect(db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT comment, rating FROM comments WHERE postId = ?', (post_id,))
            rows = cursor.fetchall()
            return jsonify(rows)
    except Exception as err:
        return handle_db_error(err)

# Route to post a comment for a specific post
@app.route('/api/posts/<post_id>/comments', methods=['POST'])
def post_comment(post_id):
    data = request.json
    comment = data.get('comment')
    rating = data.get('rating')

    try:
        with sqlite3.connect(db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('INSERT INTO comments (postId, comment, rating) VALUES (?, ?, ?)', (post_id, comment, rating))
            conn.commit()
            cursor.execute('SELECT comment, rating FROM comments WHERE postId = ?', (post_id,))
            rows = cursor.fetchall()
            return jsonify(rows)
    except Exception as err:
        return handle_db_error(err)

# Route to get the average rating for a specific post
@app.route('/api/posts/<post_id>/rating', methods=['GET'])
def get_average_rating(post_id):
    try:
        with sqlite3.connect(db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT AVG(rating) AS averageRating FROM comments WHERE postId = ?', (post_id,))
            row = cursor.fetchone()
            return jsonify({'averageRating': row[0]})
    except Exception as err:
        return handle_db_error(err)

# Start the server
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=port)
