Authentication:
    POST /api/auth/register - Register a new user
    POST /api/auth/login - User login
    POST /api/auth/logout - User logout

Task Management:
    GET /api/tasks - Get all tasks for the authenticated user
    GET /api/tasks/:id - Get a specific task by ID
    POST /api/tasks - Create a new task
    PUT /api/tasks/:id - Update an existing task
    DELETE /api/tasks/:id - Delete a task

User Profile:
    GET /api/profile - Get user profile information
    PUT /api/profile - Update user profile information
    DELETE /api/profile - Delete user account

Categories/Tags:
    GET /api/categories - Get all categories/tags
    POST /api/categories - Create a new category/tag
    PUT /api/categories/:id - Update an existing category/tag
    DELETE /api/categories/:id - Delete a category/tag

Search:
    GET /api/search?q=query - Search for tasks by name or description

Statistics:
    GET /api/statistics - Get statistics about tasks (e.g., completed tasks count, overdue tasks count, etc.)

Reminders:
    POST /api/reminders - Set a reminder for a task
    PUT /api/reminders/:id - Update a reminder
    DELETE /api/reminders/:id - Delete a reminder

Collaboration (if applicable):
    GET /api/tasks/:id/members - Get members assigned to a task
    POST /api/tasks/:id/members - Assign a member to a task
    DELETE /api/tasks/:id/members/:memberId - Remove a member from a task