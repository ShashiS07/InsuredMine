const accountModel = require('../model/userAccountModel')

// ========================account create=============================================

const accountCreate = async (req, res) => {
    try {
        let data = req.body
        if (!Object.keys(data).length) return res.status(400).send({ status: false, message: "Please Provide data" })

        let { category_name, csr, account_type, account_name, zip } = data

        // check all fields are present or not. If not give error accordingly.

        if (!category_name) return res.status(400).send({ status: false, message: "Please provide category_name" })
        if (!csr) return res.status(400).send({ status: false, message: "Please provide csr" })
        if (!account_type) return res.status(400).send({ status: false, message: "Please provide account_type" })
        if (!account_name) return res.status(400).send({ status: false, message: "Please provide account_name" })
        if (!zip) return res.status(400).send({ status: false, message: "Please provide zip" })

        // if all fields are present insert document in collection

        let accountCreate = await accountModel.create(data)
        return res.status(201).send({ status: true, message: "Success", accounts: accountCreate })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

// ==============================get account=================================================

const getAccount = async (req, res) => {
    try {
        let accounts = await accountModel.find({ isDeleted: false })
        if (!accounts.length) return res.status(404).send({ status: false, message: "account is empty" })
        return res.status(200).send({ status: true, message: "Success", accounts: accounts })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

// =================================Update account===========================================

const updateAccount = async (req, res) => {
    try {
        let id = req.params.id
        let dataForUpdate = req.body
        if (!Object.keys(dataForUpdate).length) return res.status(400).send({ status: false, message: "Please provide data for update" })

        let updatedAccount = await accountModel.findByIdAndUpdate({ _id: id }, { $set: dataForUpdate }, { new: true })
        if (!updatedAccount) return res.status(404).send({ status: false, message: "Account Not Found" })
        return res.status(200).send({ status: true, message: "Updated", account: updatedAccount })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

// ===============================delete user===============================================

const deleteAccount = async (req, res) => {
    try {
        let id = req.params.id
        let deletedAccount = await accountModel.findByIdAndUpdate({ _id: id }, { $set: { isDeleted: true } }, { new: true })
        if (!deletedAccount) return res.status(404).send({ status: false, message: "Account Not Found or Already deleted" })
        return res.status(200).send({ status: true, message: "Account Deletion Successful" })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

// ===================================================================================
module.exports = { accountCreate, getAccount, updateAccount, deleteAccount }