module.exports = async (req, res) => {

	const lel = Object.assign({}, {lel: 'kmao'}, {fdsa: 12})

  console.log(req.session)

	return res.json(lel);

};