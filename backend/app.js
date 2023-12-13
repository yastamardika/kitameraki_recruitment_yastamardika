const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')
const cors = require('cors')
let data = {
    tasks: [
        {
            "title": "Meeting with Client",
            "description": "Discuss project requirements and timelines."
        },
        {
            "title": "Code Review",
            "description": "Review codebase for optimizations and enhancements."
        },
        {
            "title": "Prepare Presentation",
            "description": "Create slides for the upcoming team meeting."
        },
        {
            "title": "Bug Fixing",
            "description": "Identify and resolve critical bugs in the application."
        },
        {
            "title": "Feature Development",
            "description": "Implement new features as per user requirements."
        },
        {
            "title": "Testing Phase",
            "description": "Conduct comprehensive testing for application stability."
        },
        {
            "title": "Documentation",
            "description": "Update project documentation for recent changes."
        },
        {
            "title": "Deployment Planning",
            "description": "Plan deployment strategies for the next release."
        },
        {
            "title": "User Training",
            "description": "Conduct training sessions for new software features."
        },
        {
            "title": "Data Analysis",
            "description": "Analyze user data for better product insights."
        },
        {
            "title": "Security Audit",
            "description": "Perform security checks to ensure system integrity."
        },
        {
            "title": "Customer Support",
            "description": "Assist users with technical issues and inquiries."
        },
        {
            "title": "Optimization Strategies",
            "description": "Brainstorm ideas to optimize system performance."
        },
        {
            "title": "Database Maintenance",
            "description": "Perform routine maintenance tasks for databases."
        },
        {
            "title": "Backup Procedures",
            "description": "Create backup plans for critical data."
        },
        {
            "title": "Sprint Planning",
            "description": "Plan upcoming tasks for the sprint."
        },
        {
            "title": "Code Refactoring",
            "description": "Refactor existing code for better readability and maintainability."
        },
        {
            "title": "UI/UX Design",
            "description": "Design intuitive user interfaces for new features."
        },
        {
            "title": "Stakeholder Meeting",
            "description": "Meet with stakeholders to discuss project progress."
        },
        {
            "title": "Project Evaluation",
            "description": "Evaluate project milestones and goals."
        }
    ]

}

const app = express()
const port = 8000
app.use(bodyParser.json())
app.use(errorhandler())
app.use(cors())

app.use((req, res, next) => {
    req.data = data
    next()
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/tasks', routes.tasks.getTasks)
app.post('/tasks', routes.tasks.addTask)
app.put('/tasks/:taskId', routes.tasks.updateTask)
app.delete('/tasks/:taskId', routes.tasks.removeTask)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})