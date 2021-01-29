# MAIN
# USAGE
# python main.py --ip 0.0.0.0
# this is the main python file

# import the necessary packages
from flask import Response, Flask, request, render_template, send_from_directory, redirect, url_for
import socket
import sys
import os
import threading
import argparse
import time
import logging
import json


# initialize a flask object
template_dir = os.path.abspath('webapp/public')
app = Flask(__name__, template_folder=template_dir)

# construct the argument parser
# ap = argparse.ArgumentParser()
# ap.add_argument("-i", "--ip", type=str, default="",
#     help="ip address of the device")
# ap.add_argument("-l", "--log", type=str, default="log",
#     help="where log will out put, enter a file name or cmd to log to terminal")
# args = vars(ap.parse_args())


#routing to index.html
@app.route("/")
def index():
    return render_template("index.html")
# going back to index page
@app.route("/index.html")
def backToIndex():
    return render_template("index.html")
# about page
@app.route("/about.html")
def about():
    return render_template("about.html")
# style sheet
@app.route("/style/<path:path>")
def send_style(path):
    return send_from_directory('webapp/public/style',path)
# jquery stuff
@app.route("/script/<path:path>")
def send_script(path):
    return send_from_directory('webapp/public/script',path)
# assests folder
@app.route("/assets/<path:path>")
def send_assets(path):
    return send_from_directory('webapp/public/assets',path)
# js files
@app.route("/js/<path:path>")
def send_js(path):
    return send_from_directory('webapp/public/js',path)

ap = argparse.ArgumentParser()
ap.add_argument("-i", "--ip", type=str, default="",
    help="ip address of the device")
args = vars(ap.parse_args())

# run the flask app
app.run(host=args["ip"], debug=True, threaded=True, use_reloader=False)