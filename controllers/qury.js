const Tour = require("../models/tourModel");

exports.getAllTours = catchAsync(async (req, res, next) => {
    //     var total =await Tour.count()


    //     const features = new APIFeatures(Tour.find(), req.query)
    //     .filter()
    //     .sort()
    //     .limitFields()
    //     .paginate();
    //   const tours = await features.query;

    //    1st filtering fileds

    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    const query = Tour.find(JSON.parse(queryStr));

    // 2nd sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    // Field limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields);
    } else {
        query = query.select('-__v');
    }

    // 4 pagination

    
  
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);
   
    if(req.query.page){
        const numTours=await Tour.countDocuments();
        if(skip>=numTours) throw new Error("This page does not exist")
    }

    // execute Query
    const tours = await query
    
    res.status(200).json({
        status: 'success',
        results: tour.length,

        data: {
            tours
        }
    });
});
