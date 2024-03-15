const advancedResults = (model, populate) => async (req, res, next) => {
    try {
        let query;

        const reqQuery = { ...req.query };

        const removeFields = ['select', 'sort', 'page', 'limit'];

        removeFields.forEach(param => delete reqQuery[param]);

        query = {
            where: { ...reqQuery },
            attributes: req.query.select ? req.query.select.split(',') : undefined,
            order: req.query.sort ? req.query.sort.split(',') : [['createdAt', 'DESC']],
            offset: (parseInt(req.query.page, 10) - 1) * parseInt(req.query.limit, 10) || 0,
            limit: parseInt(req.query.limit, 10) || 10,
        };

        const results = await model.findAll(query);

        const totalCount = await model.count({ where: { ...reqQuery } });

        const pagination = {
            total: totalCount,
            currentPage: parseInt(req.query.page, 10) || 1,
            totalPages: Math.ceil(totalCount / parseInt(req.query.limit, 10)) || 1
        };

        res.advancedResults = {
            success: true,
            count: results.length,
            pagination,
            data: results
        };

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = advancedResults;
