const displayItems = (data, pageNumber, itemsPerPage) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageItems = data.slice(startIndex, endIndex);

    return currentPageItems
}

module.exports = {
    getTasks(req, res) {
        let { page, perPage } = req.query
        page = page || 1 //default page
        perPage = perPage || 5 //default length per page
        const result = displayItems(req.data.tasks, page, perPage)
        res.status(200).send({
            result: result,
            page: page,
            perPage: perPage
        })
    },
    addTask(req, res) {
        req.data.tasks.push(req.body)
        res.status(201).send({"id": req.data.tasks.length})
    },
    updateTask(req, res) {
        const id = req.params.taskId
        req.data.tasks[id-1] = req.body
        res.status(200).send(req.data.tasks[id-1])
    },
    removeTask(req, res) {
        req.data.tasks.splice(req.params.taskId - 1, 1)
        res.status(204).send({"result":"task deleted succesfully"})
    }
}