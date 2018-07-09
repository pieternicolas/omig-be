module.exports = async (req, res) => {

	const lel = Object.assign({}, {lel: 'kmao'}, {fdsa: 12})

	return res.json(lel);

};