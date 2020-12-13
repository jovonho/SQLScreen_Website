var tmx_filters = [
{
	id: 'symbol',
	label: 'Symbol',
	type: 'string',
	operators: string_ops
},
{
	id: 'name',
	label: 'Name',
	type: 'string',
	operators: string_ops
},
{
	id: 'price',
	label: 'Last Price',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'priceChange',
	label: 'Price Change',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'percentChange',
	label: 'Percent Change',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'exchangeName',
	label: 'Exchange Name',
	type: 'string',
	input: 'select',
	values: {'Toronto Stock Exchange': 'Toronto Stock Exchange', 'TSX Venture Exchange': 'TSX Venture Exchange'},
	 operators: select_string_ops
},
{
	id: 'sector',
	label: 'Sector',
	type: 'string',
	input: 'select',
	values: {'Real Estate': 'Real Estate', 'Healthcare': 'Healthcare', 'Basic Materials': 'Basic Materials', 'Consumer Cyclical': 'Consumer Cyclical', 'Industrials': 'Industrials', 'Energy': 'Energy', 'Utilities': 'Utilities', 'Consumer Defensive': 'Consumer Defensive', 'Technology': 'Technology', 'Financial Services': 'Financial Services', 'Communication Services': 'Communication Services'},
	 operators: select_string_ops
},
{
	id: 'industry',
	label: 'Industry',
	type: 'string',
	operators: string_ops
},
{
	id: 'volume',
	label: 'Volume',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'openPrice',
	label: 'Open Price',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'dayHigh',
	label: 'Day High',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'dayLow',
	label: 'Day Low',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'MarketCap',
	label: 'Market Cap',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'MarketCapAllClasses',
	label: 'Market Cap (All Classes)',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'peRatio',
	label: 'Price to Earnings',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'prevClose',
	label: 'Previous Close',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'dividendFrequency',
	label: 'Dividend Frequency',
	type: 'string',
	input: 'select',
	values: {'Annual': 'Annual', 'Quarterly': 'Quarterly', 'Semi-Annual': 'Semi-Annual', 'Monthly': 'Monthly'},
	 operators: select_string_ops
},
{
	id: 'dividendYield',
	label: 'Dividend Yield',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'dividendAmount',
	label: 'Dividend Amount',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'dividendCurrency',
	label: 'Dividend Currency',
	type: 'string',
	input: 'select',
	values: {'USD': 'USD', 'CAD': 'CAD'},
	 operators: select_string_ops
},
{
	id: 'beta',
	label: 'Beta',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'eps',
	label: 'EPS',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'exDividendDate',
	label: 'Ex-Dividend Date',
	type: 'datetime',
	placeholder: 'YYYY-MM-DD',
	validation: {
		format: 'YYYY-MM-DD'
	},
	operators: datetime_ops
},
{
	id: 'longDescription',
	label: 'Description',
	type: 'string',
	operators: string_ops
},
{
	id: 'website',
	label: 'Website',
	type: 'string',
	operators: string_ops
},
{
	id: 'email',
	label: 'Email',
	type: 'string',
	operators: string_ops
},
{
	id: 'phoneNumber',
	label: 'Phone Number',
	type: 'string',
	operators: string_ops
},
{
	id: 'fullAddress',
	label: 'Full Address',
	type: 'string',
	operators: string_ops
},
{
	id: 'employees',
	label: 'Employees',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'shareOutStanding',
	label: 'Shares Outstanding',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'totalDebtToEquity',
	label: 'Total Debt to Equity',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'totalSharesOutStanding',
	label: 'Total Shares Outstanding',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'sharesESCROW',
	label: 'Escrowed Shares',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'vwap',
	label: 'VWAP',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'dividendPayDate',
	label: 'Dividend Pay Date',
	type: 'datetime',
	placeholder: 'YYYY-MM-DD',
	validation: {
		format: 'YYYY-MM-DD'
	},
	operators: datetime_ops
},
{
	id: 'weeks52high',
	label: '52 Weeks High',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'weeks52low',
	label: '52 Weeks Low',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'alpha',
	label: 'Alpha',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'averageVolume10D',
	label: '10-Day Average Volume',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'averageVolume30D',
	label: '30-Day Average Volume',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'averageVolume50D',
	label: '50-Day Average Volume',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'priceToBook',
	label: 'Price to Book',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'priceToCashFlow',
	label: 'Price to Cash Flow',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'returnOnEquity',
	label: 'Return on Equity',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'returnOnAssets',
	label: 'Return on Assets',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'day21MovingAvg',
	label: '21-Day Moving Average',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'day50MovingAvg',
	label: '50-Day Moving Average',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'day200MovingAvg',
	label: '200-Day Moving Average',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'dividend3Years',
	label: '3 Years Dividend',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'dividend5Years',
	label: '5 Years Dividend',
	type: 'double',
	operators: numeric_ops
},
{
	id: 'datatype',
	label: 'Product Type',
	type: 'string',
	input: 'select',
	values: {'etf': 'etf', 'equity': 'equity'},
	 operators: select_string_ops
}]
