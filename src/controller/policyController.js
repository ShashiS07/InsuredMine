const policyModel = require('../model/policyModel')

// ===============================policy create================================================

const createPolicy = async (req, res) => {
    try {
        let data = req.body
        if (!Object.keys(data).length) return res.status(400).send({ status: false, message: "Please Provide policy details" })

        let { policy_mode, policy_number, premium_amount, policy_type, policy_start_date, policy_end_date } = data
        // check all fields are present or not. If not give error accordingly.

        if (!policy_mode) return res.status(400).send({ status: false, message: "Please provide policy_mode" })
        if (!policy_number) return res.status(400).send({ status: false, message: "Please provide policy_number" })
        if (!premium_amount) return res.status(400).send({ status: false, message: "Please provide premium_amount" })
        if (!policy_type) return res.status(400).send({ status: false, message: "Please provide policy_type" })
        if (!policy_start_date) return res.status(400).send({ status: false, message: "Please provide policy_start_date" })
        if (!policy_end_date) return res.status(400).send({ status: false, message: "Please provide policy_end_date" })

        // if all fields are present insert document in collection

        let policyDetails = await policyModel.create(data)
        return res.stutus(201).send({ stutus: true, message: "Success", policies: policyDetails })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

// ===========================get policies==========================================

const getPolicies = async (req, res) => {
    try {
        let policies = await policyModel.find({ isDeleted: false })
        if (!policies.length) return res.status(404).send({ status: false, message: "policies are not available" })
        return res.status(200).send({ status: true, message: "Success", policies: policies })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
// =====================get policy by id============================================
const getpolicybyId = async (req, res) => {
    try {
        let id=req.params.id
        let policy = await policyModel.findOne({_id:id, isDeleted: false })
        if (!policy) return res.status(404).send({ status: false, message: "Policy Not Found" })

        return res.status(200).send({ status: true, message: "Success", policy: policy })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

// =============================update Policy===========================================

const updatePolicy = async (req, res) => {
    try {
        let id = req.params.id
        let dataForUpdate = req.body
        if (!Object.keys(dataForUpdate).length) return res.status(400).send({ status: false, message: "Please provide data for update" })

        let updatedPolicy = await policyModel.findByIdAndUpdate({ _id: id }, { $set: dataForUpdate }, { new: true })
        if (!updatedPolicy) return res.status(404).send({ status: false, message: "Policy Not Found" })
        return res.status(200).send({ status: true, message: "Updated", policy: updatedPolicy })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

// ================================delete policy========================================

const deletePolicy = async (req, res) => {
    try {
        let id = req.params.id
        let deletedPolicy = await policyModel.findByIdAndUpdate({ _id: id }, { $set: { isDeleted: true } }, { new: true })
        if (!deletedPolicy) return res.status(404).send({ status: false, message: "Policy Not Found or Already deleted" })
        return res.status(200).send({ status: true, message: "Policy Deletion Successful" })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

// ==========================================================================================
module.exports = { createPolicy,getPolicies,getpolicybyId,updatePolicy,deletePolicy }