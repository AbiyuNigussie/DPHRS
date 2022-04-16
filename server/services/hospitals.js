const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const hospitals = require('../routes/hospitals');


const getMultiple = async (page = 1) => {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT ID, HospitalName, OwnerShip, Address, BedCapacity, IncorporationDate FROM hospitals LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};
    return {
        data,
        meta
    };
};

const create = async (hospitals) => {
    const result = await db.query(
        `INSERT INTO hospitals 
    (HospitalName, OwnerShip, Address, BedCapacity, IncorporationDate) 
    VALUES 
    ('${hospitals.HospitalName}', '${hospitals.OwnerShip}', '${hospitals.Address}', '${hospitals.BedCapacity}', '${hospitals.IncorporationDate}')`
    );

    let message = `Error in creating  Hospital details`;

    if(result.affectedRows){
        message = 'Hospitals datail created successfully!';
    }

    return {message};
}

const update = async (id, hospitals) => {
    const result = await db.query(
        `UPDATE hospitals
        SET HospitalName="${hospitals.HospitalName}", OwnerShip="${hospitals.OwnerShip}",
        Address="${hospitals.Address}", BedCapacity="${hospitals.BedCapacity}",
        IncorporationDate="${hospitals.IncorporationDate}"
        WHERE ID=${id}
        `
    );
    let message = `Error in Updating Hospitals Detail`;

    if(result.affectedRows) {
        message = `Hospital datails updated Successfully!`;
    }

    return {message};
}

const remove = async (id) => {
    const result = await db.query(
        `DELETE FROM hospitals WHERE ID=${id}`
    );
    let message = `Error in deleting Hospitals detail!`;

    if(result.affectedRows) {
        message = `Hospitals detail deleted Successfully!`;
    }

    return {message};
}

module.exports = {
    getMultiple,
    create,
    update,
    remove
}
