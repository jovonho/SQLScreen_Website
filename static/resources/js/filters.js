var tmx_filters = [
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
		id: 'beta',
		label: 'Beta',
		type: 'double',
		operators: numeric_ops
	},
	{
		id: 'datatype',
		label: 'Product Type',
		type: 'string',
		input: 'select',
		values: { 'equity': 'equity', 'etf': 'etf' },
		operators: select_string_ops
	},
	{
		id: 'day200MovingAvg',
		label: '200-Day Moving Average',
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
		values: { 'CAD': 'CAD', 'USD': 'USD' },
		operators: select_string_ops
	},
	{
		id: 'dividendFrequency',
		label: 'Dividend Frequency',
		type: 'string',
		input: 'select',
		values: { 'Annual': 'Annual', 'Monthly': 'Monthly', 'Quarterly': 'Quarterly', 'Semi-Annual': 'Semi-Annual' },
		operators: select_string_ops
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
		id: 'dividendYield',
		label: 'Dividend Yield',
		type: 'double',
		operators: numeric_ops
	},
	{
		id: 'email',
		label: 'Company Email Address',
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
		id: 'exchangeName',
		label: 'Exchange Name',
		type: 'string',
		input: 'select',
		values: { 'TSX Venture Exchange': 'TSX Venture Exchange', 'Toronto Stock Exchange': 'Toronto Stock Exchange' },
		operators: select_string_ops
	},
	{
		id: 'fullAddress',
		label: 'Company Address',
		type: 'string',
		operators: string_ops
	},
	{
		id: 'industry',
		label: 'Industry',
		type: 'string',
		input: 'select',
		values: { 'Aerospace & Defense': 'Aerospace & Defense', 'Agriculture': 'Agriculture', 'Asset Management': 'Asset Management', 'Banks': 'Banks', 'Beverages - Alcoholic': 'Beverages - Alcoholic', 'Beverages - Non-Alcoholic': 'Beverages - Non-Alcoholic', 'Biotechnology': 'Biotechnology', 'Building Materials': 'Building Materials', 'Business Services': 'Business Services', 'Capital Markets': 'Capital Markets', 'Chemicals': 'Chemicals', 'Conglomerates': 'Conglomerates', 'Construction': 'Construction', 'Consumer Packaged Goods': 'Consumer Packaged Goods', 'Credit Services': 'Credit Services', 'Diversified Financial Services': 'Diversified Financial Services', 'Drug Manufacturers': 'Drug Manufacturers', 'Education': 'Education', 'Farm & Heavy Construction Machinery': 'Farm & Heavy Construction Machinery', 'Forest Products': 'Forest Products', 'Furnishings, Fixtures & Appliances': 'Furnishings, Fixtures & Appliances', 'Hardware': 'Hardware', 'Healthcare Plans': 'Healthcare Plans', 'Healthcare Providers & Services': 'Healthcare Providers & Services', 'Industrial Distribution': 'Industrial Distribution', 'Industrial Products': 'Industrial Products', 'Insurance': 'Insurance', 'Interactive Media': 'Interactive Media', 'Manufacturing - Apparel & Accessories': 'Manufacturing - Apparel & Accessories', 'Media - Diversified': 'Media - Diversified', 'Medical Devices & Instruments': 'Medical Devices & Instruments', 'Medical Diagnostics & Research': 'Medical Diagnostics & Research', 'Medical Distribution': 'Medical Distribution', 'Metals & Mining': 'Metals & Mining', 'Oil & Gas': 'Oil & Gas', 'Other Energy Sources': 'Other Energy Sources', 'Packaging & Containers': 'Packaging & Containers', 'Personal Services': 'Personal Services', 'REITs': 'REITs', 'Real Estate': 'Real Estate', 'Restaurants': 'Restaurants', 'Retail - Cyclical': 'Retail - Cyclical', 'Retail - Defensive': 'Retail - Defensive', 'Semiconductors': 'Semiconductors', 'Software': 'Software', 'Steel': 'Steel', 'Telecommunication Services': 'Telecommunication Services', 'Transportation': 'Transportation', 'Travel & Leisure': 'Travel & Leisure', 'Utilities - Independent Power Producers': 'Utilities - Independent Power Producers', 'Utilities - Regulated': 'Utilities - Regulated', 'Vehicles & Parts': 'Vehicles & Parts', 'Waste Management': 'Waste Management' },
		operators: select_string_ops
	},
	{
		id: 'longDescription',
		label: 'Description',
		type: 'string',
		operators: ['contains']
	},
	{
		id: 'name',
		label: 'Name',
		type: 'string',
		operators: string_ops
	},
	{
		id: 'openPrice',
		label: 'Open Price',
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
		id: 'percentChange',
		label: 'Percent Change',
		type: 'double',
		operators: numeric_ops
	},
	{
		id: 'phoneNumber',
		label: 'Company Phone Number',
		type: 'string',
		operators: string_ops
	},
	{
		id: 'prevClose',
		label: 'Previous Close',
		type: 'double',
		operators: numeric_ops
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
		id: 'returnOnAssets',
		label: 'Return on Assets',
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
		id: 'sector',
		label: 'Sector',
		type: 'string',
		input: 'select',
		values: { 'Basic Materials': 'Basic Materials', 'Communication Services': 'Communication Services', 'Consumer Cyclical': 'Consumer Cyclical', 'Consumer Defensive': 'Consumer Defensive', 'Energy': 'Energy', 'Financial Services': 'Financial Services', 'Healthcare': 'Healthcare', 'Industrials': 'Industrials', 'Real Estate': 'Real Estate', 'Technology': 'Technology', 'Utilities': 'Utilities' },
		operators: select_string_ops
	},
	{
		id: 'shareOutStanding',
		label: 'Shares Outstanding',
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
		id: 'symbol',
		label: 'Symbol',
		type: 'string',
		operators: string_ops
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
		id: 'volume',
		label: 'Volume',
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
		id: 'website',
		label: 'Company Website',
		type: 'string',
		operators: string_ops
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
	}]
