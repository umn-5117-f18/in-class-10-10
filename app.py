import os

from flask import Flask, abort, jsonify, redirect, render_template, request, url_for

import db


app = Flask(__name__)


@app.before_first_request
def initialize():
    db.setup()


@app.errorhandler(404)
def page_not_found(error):
    return render_template("404.html"), 404


@app.route('/')
def home():
    with db.get_db_cursor() as cur:
        cur.execute("SELECT * FROM movie order by title")
        movies = [record for record in cur]
    return render_template("home.html", movies=movies)


@app.route('/scrolling')
def scrolling():
    return render_template("scrolling.html")


@app.route('/autocomplete')
def autocomplete():
    return render_template("autocomplete.html")


@app.route('/movies/<movie_id>')
def movie(movie_id):
    with db.get_db_cursor() as cur:
        cur.execute("SELECT * FROM movie where movie_id=%s", (movie_id,))
        movie = cur.fetchone()

    if not movie:
        return abort(404)

    return render_template("movie.html", movie=movie)


def find_movies(query):
    with db.get_db_cursor() as cur:
        if not query or query == "":
            cur.execute("SELECT * FROM movie order by title")
        else:
            # XXX: hack for query wildcard characters w/ correct escaping
            query_wildcard = f"%{query}%"
            cur.execute("SELECT * FROM movie where title ilike (%s) order by title",
                        (query_wildcard,))
        return [record for record in cur]


@app.route('/search')
def search():
    query = request.args.get('query')
    movies = find_movies(query)
    return render_template("movie-list.html", movies=movies)


@app.route('/api/title-autocomplete')
def title_autocomplete():
    query = request.args.get('query')
    movies = find_movies(query)
    # note that I changed db.py to use RealDictCursor, which renders
    # query results to more natural JSON
    return jsonify(movies)


if __name__ == '__main__':
    pass
