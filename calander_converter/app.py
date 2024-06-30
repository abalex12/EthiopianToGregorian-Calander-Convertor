from flask import Flask, render_template, request, jsonify
from EthiopianDateConverter import EthiopianDateConverter

app = Flask(__name__, static_folder='static')

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/convert", methods=["GET"])
def convert():
    conversion_type = request.args.get("conversionType")
    result = ""

    if conversion_type == "gregorianToEthiopian":
        gregorian_date = request.args.get("gregorianDate")
        try:
            year, month, day = map(int, gregorian_date.split("-"))
            ethiopian_date = EthiopianDateConverter.to_ethiopian(year, month, day)
            result = f"(yyyy/mm/dd):{ethiopian_date[0]}/{ethiopian_date[1]}/{ethiopian_date[2]}"
        except ValueError as e:
            result = str(e)
    elif conversion_type == "ethiopianToGregorian":
        ethiopian_year = int(request.args.get("ethiopianYear"))
        ethiopian_month = int(request.args.get("ethiopianMonth"))
        ethiopian_day = int(request.args.get("ethiopianDay"))
        try:
            gregorian_date = EthiopianDateConverter.to_gregorian(ethiopian_year, ethiopian_month, ethiopian_day)
            result = f"(yyyy/mm/dd):{gregorian_date.year}/{gregorian_date.month}/{gregorian_date.day}"
        except ValueError as e:
            result = str(e)

    return result

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
