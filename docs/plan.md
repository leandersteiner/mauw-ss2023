# Plan

- User
  - Id
  - username
  - password

- Team
  - id
  - name
  - private

- Projects
  - id
  - owner: Team|User
  - member: User[]
  - boards: Board[]
  - private
  - (github)

- Board
- id
- state
- title
  - tasks: Task[]

- Task
  - id
  - title
  - description
  - assignee: User
  - priority
  - state
  - sprint
  - comments
  - (pull-request)

- Sprint
  - id
  - start
  - end

- Sprints are optional
- Sprints are mainly for organizing tasks

## UI

- Login
- Registration
- Project Overview
- Task Overview (create, update)
- Sprint Overview
- Boards
 - Tasks
- Settings
