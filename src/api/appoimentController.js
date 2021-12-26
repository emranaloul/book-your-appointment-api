const {createAppointment,updateAppointment,getAppointment,deleteAppointment,updateAppointmentStatus } = require('./appointment')

const createAppointmentHandler = async (req, res) => {
    try {
        let result = await createAppointment(req.body)
        res.status(201).json({
            message: 'Appointment created successfully',
            ...result
        })
    } catch (error) {
        res.send(error.message)
    }

}

const getAppointmentHandler = async (req, res) => {
    try {
        let id = req.user.id || req.params.id;
        let result = await getAppointment(id)
        res.status(200).json(result)
    } catch (error) {
        res.send(error.message)
    }
}

const deleteAppointmentHandler = async (req, res) => {
    try {
        let result = await deleteAppointment(req.body.id)
        res.status(200).json({
            message: 'Appointment has been deleted successfully',
            ...result})
    } catch (error) {
        res.send(error.message)
    }
}

const updateAppointmentHandler = async (req, res) => {
    try {
        let result = await updateAppointment(req.body)
        res.status(200).json({
            message: 'Appointment has been updated successfully',
            ...result
        })
    } catch (error) {
        res.send(error.message)
    }
}

const updateAppointmentStatusHandler = async (req, res) => {
    try {
        let result = await updateAppointmentStatus(req.body)
        res.status(200).json({
            message: 'Appointment status has been updated successfully',
            ...result
        })
    } catch (error) {
        res.send(error.message)
    }
}


module.exports = {createAppointmentHandler,getAppointmentHandler,deleteAppointmentHandler,updateAppointmentStatusHandler,updateAppointmentHandler}
