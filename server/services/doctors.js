const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const doctors = require('../routes/doctors');


const getMultiple = async (page = 1) => {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT Doctor_id, FirstName, LastName, Age, Gender, Address, WorksAt FROM doctors LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};
    return {
        data,
        meta
    };
};

const create = async (doctors) => {
    const result = await db.query(
        `INSERT INTO doctors 
    (FirstName, LastName, Age, Gender, Address, WorksAt) 
    VALUES 
    ('${doctors.FirstName}', '${doctors.LastName}', '${doctors.Age}', '${doctors.Gender}', '${doctors.Address}', '${doctors.WorksAt}')`
    );

    let message = `Error in creating  Doctor details`;

    if(result.affectedRows){
        message = 'Doctors datail created successfully!';
    }

    return {message};
}

const update = async (id, doctors) => {
    const result = await db.query(
        `UPDATE doctors
        SET FirstName="${doctors.FirstName}", LastName="${doctors.LastName}",
        Age="${doctors.Age}", Gender="${doctors.Gender}",
        Address="${doctors.Address}", WorksAt="${doctors.WorksAt}"
        WHERE Doctor_id=${id}
        `
    );
    let message = `Error in Updating doctors Detail`;

    if(result.affectedRows) {
        message = `doctors datails updated Successfully!`;
    }

    return {message};
}

const remove = async (id) => {
    const result = await db.query(
        `DELETE FROM doctors WHERE Doctor_id=${id}`
    );
    
    let message = `Error in deleting Hospitals detail!`;

    if(result.affectedRows) {
        message = `Doctors detail deleted Successfully!`;
    }
    return {message};
}

module.exports = {
    getMultiple,
    create,
    update,
    remove
}