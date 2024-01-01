from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

import csv
import datetime
import pytz
import requests
import subprocess
import urllib
import uuid

from flask import redirect, render_template, session
from functools import wraps

# Configure application
app = Flask(__name__)

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

db = SQL("sqlite:///chess_gif.db")

# create tables if it does not exist
def ensure_tables():
    # user tables
    db.execute("""
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    username TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    saves_count INTEGER NOT NULL DEFAULT 0 -- number of GIFs saved by user
)""")
    # FEN table, "linked list", store chess positions, tracking linked positions
    db.execute("""
CREATE TABLE IF NOT EXISTS FEN (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
    PrevID INTEGER NULL,
    NextID INTEGER NULL,
    fen VARCHAR(71),
    datetime CHAR(20),
    user_id INTEGER NOT NULL, 
    FOREIGN KEY(user_id) REFERENCES users(id)
)""")


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        input = request.form.get("input")
        print(input)
        return render_template("index.html", input=input)
    else:
        return render_template("index.html")


def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE username = ?", request.form.get("username"))

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")

@app.errorhandler(404)
def not_found(code=404):
    return render_template("404.html")


def apology(message, code=400):
    """Render message as an apology to user."""
    def escape(s):
        """
        Escape special characters.
        https://github.com/jacebrowning/memegen#special-characters
        """
        for old, new in [("-", "--"), (" ", "-"), ("_", "__"), ("?", "~q"),
                         ("%", "~p"), ("#", "~h"), ("/", "~s"), ("\"", "''")]:
            s = s.replace(old, new)
        return s
    return render_template("apology.html", top=code, bottom=escape(message)), code
# @login_required
# return redirect("/")
