# Plan

- User

  - Id
  - username
  - password

- Team

  - id
  - name
  - private
  - owner: User
  - members: User[]
  - projects: Project[]

- Project

  - id
  - name
  - private
  - team: Team
  - boards: Board[]
  - members: User[]
  - taskStates: TaskState[]
  - sprints: Sprint[]

- Board

  - id
  - title
  - project: Project
  - columns: BoardColumn[]

- BoardColumn

  - id
  - title
  - state: TaskState
  - tasks: Task[]

- Task

  - id
  - name
  - description
  - done
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

- Organization

  - id
  - name
  - teams: Team[]

- Comment

  - id
  - comment
  - task: Task
  - creator: User

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

## Settings

### Project / Team

- set default sprint duration
