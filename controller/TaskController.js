const Task = require("../models/Task")

let message = ""
let type = ""

const getAllTasks = async (req, res) => {
    try {
        setTimeout(() => {
            message = ""
        }, 2000)
        const tasksList = await Task.find();
        /* console.log(tasksList) */
        return res.render("index", {
            tasksList,
            task: null,
            taskDelete: null,
            message,
            type
        })

    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

const createTask = async (req, res) => {
    const task = req.body;

    if (!task.task) {
        message = "Insira uma texto antes de adicionar o item!"
        type = "danger"
        return res.redirect("/")
    }

    try {
        await Task.create(task)
        message = "Item adicionado com sucesso"
        type = "success"
        return res.redirect("/")
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
};

const getByID = async (req, res) => {
    try {
        const tasksList = await Task.find();

        if (req.params.method == "update") {
            const task = await Task.findOne({ _id: req.params.id })
            res.render("index", { task, tasksList, taskDelete: null, message, type })
        } else {
            const taskDelete = await Task.findOne({ _id: req.params.id })
            //console.log(req.params.id)
            res.render("index", { task: null, tasksList, taskDelete, message, type })
        }
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}

const updateOneTask = async (req, res) => {
    try {
        const task = req.body
        await Task.updateOne({ _id: req.params.id }, task)
        message = "Item atualizada com sucesso!"
        type = "success"
        res.redirect("/")
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}

const deleteOneTask = async (req, res) => {
    const id = req.params.id

    try {
        await Task.deleteOne({ _id: id })
        message = "Item apagado com sucesso"
        type = "success"
        res.redirect("/")
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}

const TaskCheck = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id })

        if (task.check) {
            task.check = false
        } else {
            task.check = true
        }

        await Task.updateOne({ _id: req.params.id }, task)
        res.redirect("/")

    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getByID,
    updateOneTask,
    deleteOneTask,
    TaskCheck
}
