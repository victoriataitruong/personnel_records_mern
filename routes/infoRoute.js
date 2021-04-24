const router = require('express').Router();
const infoSchema = require('../model/infoModel');
const { getInfo, addInfo, getInfoId, addUpdate, deleteInfo } = require('../controlers/infoCtrl');

// getting info data
router.get('/info', async (req, res) => {
	const info = await infoSchema.find({});
	try {
		await info;
		res.json(info);
	} catch (err) {
		res.status(500).json({ msg: err });
	}
});

//posting info data
router.post('/info', async (req, res) => {
	const { name, occupation, email, data } = req.body;
	const newInfo = new infoSchema({
		name,
		occupation,
		email,
		date: Date.parse(req.body.date)
	});
	await newInfo.save();
	res.json({ msg: 'info added' });
});

//getting specific info data
router.get('/info/:id', async (req, res) => {
	const info = await infoSchema.findById(req.params.id);
	try {
		await info;
		res.json(info);
	} catch (err) {
		res.status(500).json({ msg: err });
	}
});

//   updating this specific id
router.put('/info/update/:id', addUpdate);

//   updating this specific id
router.delete('/info/:id', deleteInfo);

module.exports = router;

// mongodb+srv://blogger21:<password>@cluster0.wnhl9.mongodb.net/<dbname>?retryWrites=true&w=majority

// blogger21
// bloggerman
