const pool = require("../../db");
const queries = require("./queries");

const readDataSet = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.readDataSet, [id], (error, results) =>{
        if (error)
         res.send(`Invalid input please enter valid input`);
        res.status(200).json(results.rows);
    });
};

const createDataSet = (req, res) => {
    const {id, dataset_id, type, name, validation_config, extraction_config, dedup_config, data_schema, denorm_config, router_config, dataset_config, tags, data_version, status, created_by, updated_by, created_date, updated_date, published_date} = req.body;
    // check for id 
    pool.query(queries.checkIdExists, [id], (error, results) => {
        if (results.rows.length) {
            res.status(404).send(`Id already exists.`);
        }
        //add data to database
        pool.query(queries.createDataSet,[id, dataset_id, type, name, validation_config, extraction_config, dedup_config, data_schema, denorm_config, router_config, dataset_config, tags, data_version, status, created_by, updated_by, created_date, updated_date, published_date], (error, results) =>{
            if (error)
             res.send(`Invalid input please enter valid input`);
            res.status(201).send(` New dataset is created successfully`);
        })
    });
};

const deleteDataSet = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.readDataSet, [id], (error,results) => {
        const noobsrvfound = !results.rows.length;
        if (noobsrvfound) {
          res.status(404).send(`dataset is not exist in with id ${req.params.id}.`);
        }
        pool.query(queries.deleteDataSet,[id], (error, results) => {
            if (error) 
             res.status(500).send(`Invalid input please enter valid input`);
            res.status(200).send(`dataset is deleted successfully.`);
        })
    });
};

const updateDataSet = (req,res) => {
    const id = parseInt(req.params.id);
    const { dataset_id, type, name, validation_config, extraction_config, dedup_config, data_schema, denorm_config, router_config, dataset_config, tags, data_version, status, created_by, updated_by, created_date, updated_date, published_date } = req.body;
    pool.query(queries.readDataSet,[id], (error, results) => {
        const noobsrvfound = !results.rows.length;
        if (noobsrvfound) {
          res.status(404).send(`dataset is not exist in database.`);
        }
        pool.query(queries.updateDataSet, [dataset_id, type, name, validation_config, extraction_config, dedup_config, data_schema, denorm_config, router_config, dataset_config, tags, data_version, status, created_by, updated_by, created_date, updated_date, published_date, id],(error, results) => {
            if (error) 
             res.status(500).send(`Invalid input please enter valid input`);
            res.status(200).send(`dataset updated successfully.`);
        })
    });
};

//const PatchData = (req,res) => {
 //   const id = parseInt(req.params.id);


 //   pool.query(queries.getobsrvById,[id], (error, results) => {
 //       const noobsrvfound = !results.rows.length;
 //       if (noobsrvfound) {
 //         res.send("Obsrv is not exist in database.");
 //       }

//}

module.exports = {
    readDataSet,
    createDataSet,
    deleteDataSet,
    updateDataSet,
    
};