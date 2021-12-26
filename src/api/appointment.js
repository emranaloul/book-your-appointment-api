const client = require('../db')

const createAppointment = async data =>{
    try {
        let {buyer_id, seller_id, appointment, note} = data;
        let SQL = 'INSERT INTO appointment (buyer_id, seller_id, appointment, note) VALUES ($1,$2,$3,$4) RETURNING *;'
        let safeValues = [buyer_id, seller_id, appointment, note]
        let result = await client.query(SQL,safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const getAppointment = async id =>{
    try {
        let SQL = 'SELECT * from appointment WHERE id =$1 OR buyer_id=$1 OR seller_id=$1;'
        let result = await client.query(SQL,[id])
        return result.rows;
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteAppointment = async id =>{
    try {
        let SQL = 'DELETE FROM appointment WHERE id =$1 RETURNING *;'
        let result = await client.query(SQL, [id])
        return result.rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateAppointment = async data =>{
    try {
        let {note,id,appointment} = data;
        let SQL = 'UPDATE appointment SET note=$1, appointment=$3 WHERE id=$2 RETURNING *;'
        let safeValues = [note,id,appointment]
        let result = await client.query(SQL,safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateAppointmentStatus = async data =>{
    try {
        let {status,id} = data;
        let SQL = 'UPDATE appointment SET status=$1 WHERE id=$2 RETURNING *;'
        let safeValues = [status,id]
        let result = await client.query(SQL,safeValues);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {createAppointment,updateAppointment,getAppointment,deleteAppointment,updateAppointmentStatus}