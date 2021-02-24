# Increazy CLI

Command line tool to manage and develop locally the pwas created in the Increazy dashboard.

[See this documentation in Portuguese](./README-pt.md)


## Installation

To install run the commands below:

```bash
yarn global add increazy
# or
npm install increazy -g

# the first time, log in to your Increazy account 
increazy login
```

## Recognized commands

| Command  | Action                                                           |
|----------|------------------------------------------------------------------|
| deploy   | Sends the project to deploy                                      |
| end-task | Finish the current task (git merge)                              |
| get      | Download a project in the current folder                         |
| login    | Login your Increazy account                                      |
| rebase   | Download the project, updating the current task code with online |
| serve    | See a preview of the pwa layout                                  |
| sync     | Synchronizes current task                                        |
| task     | Create or get a separate task for you (git branch)               |
| tasks    | View all tasks and activate them at the moment                   |
| help     | Display help for command                                         |


## Workflow

Let's briefly show the sequence you must follow to have a workflow fully adapted to Git:

1. `increazy get` - the first thing is to download the project, when downloading you will have to put the URL of the Git repository previously created for the project.
2. `cd folder` - enter the project folder.
3. `increazy task` - create a new task, so you can separate your code from other developers.
4. `increazy rebase` - (optional) at any time you can rebase to get all the code from the dashboard online, so if any developer has edited the project on the dashboard you will get updates.
5. `increazy sync` - (optional) at any time you can synchronize your task, if another developer is working on it at the same time you will get updates from him.
6. `increazy serve` - you can start a local server to quickly edit some code, this command does not execute the PWA itself, it just serves a static code similar to the final layout.
7. `increazy deploy` - in addition to testing the layout locally, you can send your task to a test environment, for that use deploy and choose a suitable test environment to upload changes.
8. `increazy end-task` - when you finish your task, run this command to mix your task code with the main project code.
9. `increazy deploy` - at the end of the task you will probably want to put it into production, then run the deploy again, but now sending it directly to production.