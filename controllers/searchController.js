  const Worker = require('../models/worker');
  const Hire = require('../models/hire');
 
// Route to search for workers
 exports.searchWorkers = async (req, res) => {
    const {search}= req.query;
 try {
    if (!search) {
        return res.status(400).json({ message: 'Search term is required' });
    }
        // Simple search by name  
        const workers = await Worker.find({
            workertype: { $regex: search, $options: 'i' } // Case-insensitive search
            
        }); 

         
        res.json(workers);
         } catch (error) {
        console.error('Error searching for workers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

 
exports.hireWorker = async (req, res) => {
    const { workerId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: User ID missing' });
    }

    try {
        const worker = await Worker.findById(workerId);
        if (!worker) {
            return res.status(404).json({ message: 'Worker not found' });
        }

        // if (worker.availability !== '2') {
        //     return res.status(400).json({ message: 'Worker is not available' });
        // }

        worker.status = 'hired';
        if (!worker.userId) worker.userId = userId;
        await worker.save();

        const hire = new Hire({
            workerId,
            status: 'pending',
            userId,
        });

        await hire.save();

        res.status(200).json({ message: 'Worker hired successfully', hire });
    } catch (err) {
        console.error('Error hiring worker:', err);
        res.status(500).json({ message: 'Error hiring worker', error: err.message });
    }
};



// Route to delete a hired worker
 
exports.deleteHiredWorker = async (req, res) => {
  const hireId = req.params.id;
   console.log('Delete request received for ID:', req.params.id);

  try {
    const hire = await Hire.findById(hireId);
    if (!hire) {
      return res.status(404).json({ message: 'Hire record not found' });
    }

    await Hire.findByIdAndDelete(hireId);
    res.status(200).json({ message: 'Hire deleted successfully' });
  } catch (err) {
    console.error('Error deleting hire record:', err);
    res.status(500).json({ message: 'Error deleting hire record', error: err.message });
  }



    // Update worker status to available
//     let worker;
//     try {
//         worker = await Worker.findById(workerId);
//         console.log('Worker found:', worker);
//     }
//     catch (err) {
//         console.error('Error finding worker:', err);
//         return res.status(500).json({ message: 'Error finding worker', error: err.message });
//     }
//     if (!worker) {
//         return res.status(404).json({ message: 'Worker not found' });
//     }
//     try {
//         worker.status = 'available';
//         await worker.save();
//         console.log('Worker status updated to available');
//     } catch (err) {
//         console.error('Error updating worker status:', err);
//         return res.status(500).json({ message: 'Error updating worker status', error: err.message });
//     }
//     res.status(200).json({ message: 'Hired worker deleted successfully' });
}


// In your controller

// Route to get all hire records for a user
// exports.getUserHires = async (req, res) => {

//  exports.getUserHires = async (req, res) => {
//   const userId = req.user?.id;

//   if (!userId) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//   const hires = await Hire.find({ userId }).populate('workerId').exec();
// console.log('Hires found:', hires);

//     res.status(200).json({ hires });
//   } catch (err) {
//     console.error('Error fetching hires:', err);
//     res.status(500).json({ message: 'Failed to fetch hire records', error: err.message });
//   }
// };
// Controller: Get all hires by logged-in user
exports.getUserHires = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const hires = await Hire.find({ userId }).populate('workerId').exec();
    res.status(200).json({ hires });
  } catch (err) {
    console.error('Error fetching hires:', err);
    res.status(500).json({ message: 'Failed to fetch hire records', error: err.message });
  }
};
