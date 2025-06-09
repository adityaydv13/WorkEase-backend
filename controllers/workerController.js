const Worker = require('../models/worker');

 exports.workerRegister = async (req, res) => {
    const { name, phone, address, workertype, availability,status } = req.body;
      const userId = req.user.id; 
    try {
        const newWorker = new Worker({
            userId, 
            name,
            phone,
            address,
            workertype,
            availability,
            status  
        });

        await newWorker.save();
        res.status(201).json({ msg: 'Worker registered successfully' });
    } catch (error) {
        console.error('Error registering worker:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getCategories = async (req, res) => {
     try {
    const { categoryName } = req.params;

    const workers = await Worker.find({
      workertype: { $regex: new RegExp(`^${categoryName}$`, 'i') }
    });

    res.status(200).json({ success: true, workers });
  } catch (error) {
    console.error('Error fetching workers by category:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
 