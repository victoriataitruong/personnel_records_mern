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
router.put('/info/update/:id', async (req, res) => {
	const { name, occupation, email, date } = req.body;
	const info = await infoSchema.findByIdAndUpdate(req.params.id, {
		name,
		occupation,
		email,
		date: Date.parse(req.body.date)
	});
	res.json({ msg: 'Item updated' });
});

//   deleting this specific id
router.delete('/info/:id', async (req, res) => {
	try {
		await infoSchema.findByIdAndDelete(req.params.id);
		res.json({ msg: 'Item deleted' });
	} catch (err) {
		res.status(500).json({ msg: err });
	}
});

module.exports = router;
