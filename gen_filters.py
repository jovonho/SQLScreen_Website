import json
import re
from dbhandler import DbHandler

label_dict = {
    "symbol": "Symbol",
    "name": "Name",
    "price": "Last Price",
    "priceChange": "Price Change",
    "percentChange": "Percent Change",
    "exchangeName": "Exchange Name",
    "exShortName": "Exchange Short Name",
    "exchangeCode": "Exchange Code",
    "marketPlace": "Market Place",
    "sector": "Sector",
    "industry": "Industry",
    "volume": "Volume",
    "openPrice": "Open Price",
    "dayHigh": "Day High",
    "dayLow": "Day Low",
    "MarketCap": "Market Cap",
    "MarketCapAllClasses": "Market Cap (All Classes)",
    "peRatio": "Price to Earnings",
    "prevClose": "Previous Close",
    "dividendFrequency": "Dividend Frequency",
    "dividendYield": "Dividend Yield",
    "dividendAmount": "Dividend Amount",
    "dividendCurrency": "Dividend Currency",
    "beta": "Beta",
    "eps": "EPS",
    "exDividendDate": "Ex-Dividend Date",
    "shortDescription": "Short Description",
    "longDescription": "Description",
    "website": "Website",
    "email": "Email",
    "phoneNumber": "Phone Number",
    "fullAddress": "Full Address",
    "employees": "Employees",
    "shareOutStanding": "Shares Outstanding",
    "totalDebtToEquity": "Total Debt to Equity",
    "totalSharesOutStanding": "Total Shares Outstanding",
    "sharesESCROW": "Escrowed Shares",
    "vwap": "VWAP",
    "dividendPayDate": "Dividend Pay Date",
    "weeks52high": "52 Weeks High",
    "weeks52low": "52 Weeks Low",
    "alpha": "Alpha",
    "averageVolume10D": "10-Day Average Volume",
    "averageVolume30D": "30-Day Average Volume",
    "averageVolume50D": "50-Day Average Volume",
    "priceToBook": "Price to Book",
    "priceToCashFlow": "Price to Cash Flow",
    "returnOnEquity": "Return on Equity",
    "returnOnAssets": "Return on Assets",
    "day21MovingAvg": "21-Day Moving Average",
    "day50MovingAvg": "50-Day Moving Average",
    "day200MovingAvg": "200-Day Moving Average",
    "dividend3Years": "3 Years Dividend",
    "dividend5Years": "5 Years Dividend",
    "datatype": "Product Type",
    "__typename": "",
}

# Used to create the draft label dictionary which is then manually enhanced
def generate_label_dict(filename):
    with open("./fields", "r") as infile, open(filename, "w") as outfile:
        outfile.write("{\n\t")

        key_vals = []
        for line in infile:
            field, ftype = line.replace(",", "").rstrip().split(" ")

            field_words = re.findall("(^[a-z][^A-Z0-9]*|[A-Z][^A-Z0-9]*|[0-9]+)", field)
            field_words = list(map(lambda x: x.capitalize(), field_words))

            field_label = " ".join(field_words)

            key_vals.append(f'"{field}": "{field_label}"')

        outfile.write(",\n\t".join(key_vals))
        outfile.write("\n}\n")


def gen_filters():

    db = DbHandler()
    conn = db.create_connection()

    with open("./fields", "r") as infile, open("./static/resources/js/filters.js", "w") as outfile:
        outfile.write("var tmx_filters = [\n")
        filter_list = []
        for line in infile:
            field, ftype = line.replace(",", "").rstrip().split(" ")

            # Skip these fields
            if (
                field == "__typename"
                or field == "exShortName"
                or field == "exchangeCode"
                or field == "marketPlace"
                or field == "shortDescription"
            ):
                continue

            field_label = label_dict[field]
            print(field + ": " + field_label)

            # Output filter template depending on field type
            if ftype == "numeric" or ftype == "bigint" or ftype == "int":
                filter_list.append(
                    f"{{\n\tid: '{field}',\n\tlabel: '{field_label}',\n\ttype: 'double',\n\toperators: numeric_ops\n}}"
                )
                # outfile.write(
                #     f"{{\n\tid: '{field}',\n\tlabel: '{field_label}',\n\ttype: 'double',\n\toperators: numeric_ops\n}},\n"
                # )

            elif ftype == "timestamp":
                # outfile.write(
                filter_list.append(
                    f"{{\n\tid: '{field}',\n\tlabel: '{field_label}',\n\ttype: 'datetime',\n\tplaceholder: 'YYYY-MM-DD',\n\tvalidation: {{\n\t\tformat: 'YYYY-MM-DD'\n\t}},\n\toperators: datetime_ops\n}}"
                )

            elif ftype == "text":

                values = db.execute(conn, f"select distinct {field} from quotes;")

                if len(values) < 54:
                    values = {x[0]: x[0] for x in values if x[0] is not None}

                    if len(values) != 0:
                        # print(values)
                        # outfile.write(
                        filter_list.append(
                            f"{{\n\tid: '{field}',\n\tlabel: '{field_label}',\n\ttype: 'string',\n\tinput: 'select',\n\tvalues: {values},\n\t operators: select_string_ops\n}}"
                        )

                else:
                    filter_list.append(
                        # outfile.write(
                        f"{{\n\tid: '{field}',\n\tlabel: '{field_label}',\n\ttype: 'string',\n\toperators: string_ops\n}}"
                    )

        outfile.write(",\n".join(filter_list))
        outfile.write("]\n")


if __name__ == "__main__":

    # db = DbHandler()
    # conn = db.create_connection()
    # field = "exchangeCode"
    # num_values = db.execute(conn, f"select count(distinct {field}) from quotes;")
    # print(num_values[0][0])
    # values = db.execute(conn, "select distinct exchangeCode from quotes;")

    # print(values)

    gen_filters()