# Todo App

This is a simple Todo App that allows you to manage your tasks and keep track of your todos. 
It was created as part of the Odin Project course. The requirements were as follows:

## Requirements
- [x] Your ‘todos’ are going to be objects that you’ll want to dynamically create, which means either using factories or constructors/classes to generate them.
- [x] Brainstorm what kind of properties your todo-items are going to have. At a minimum they should have a title, description, dueDate and priority. You might also want to include notes or even a checklist.
- [x] Your todo list should have projects or separate lists of todos. When a user first opens the app, there should be some sort of ‘default’ project to which all of their todos are put. Users should be able to create new projects and choose which project their todos go into.
- [x] You should separate your application logic (i.e. creating new todos, setting todos as complete, changing todo priority etc.) from the DOM-related stuff, so keep all of those things in separate modules.
- [x] The look of the User Interface is up to you, but it should be able to do the following:
      - [x] view all projects
      - [x] view all todos in each project (probably just the title and duedate… perhaps changing color for different priorities)
      - [x] expand a single todo to see/edit its details
      - [x] delete a todo

- [x] Use the date-fns library in your code.
- [x] We haven’t learned any techniques for actually storing our data anywhere, so when the user refreshes the page, all of their todos will disappear! You should add some persistence to this todo app using the Web Storage API. localStorage (docs here) allows you to save data on the user’s computer. 

## Features

- Create new todos with a name, details, due date, priority, and project.
- View all todos or filter them by project or completion status.
- Sort todos by due date, date created, priority, and completetion status.
- Edit and update existing todos.
- Mark todos as completed or uncompleted.
- Delete todos.
<!-- - Responsive design for easy use on different devices. -->

## Technologies Used

- HTML
- CSS
- JavaScript


## Usage

- Creating a Todo:
  - Enter the todo name, details, due date, and priority in the provided fields.
  - Click the "Add Todo" button to create the todo.

- Viewing Todos:
  - All todos will be displayed initially.
  - Use the filter options to view todos by project or completion status.
  - Click on table column headers to sort todos my date created, due date, priority, or completion status.

- Editing a Todo:
  - Click on a todo to open the popup for editing.
  - Modify the todo details as needed.
  - Click the "Save" button to update the todo.

- Marking a Todo as Completed:
  - In the popup or todo list, toggle the checkbox to mark a todo as completed or uncompleted.

- Deleting a Todo:
  - In the popup, click the delete icon to remove a todo.

## Contributing

Contributions to the Todo App are welcome! If you find any bugs or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## Acknowledgements

- This Todo App was inspired by the need for a simple and efficient task management system.
- Special thanks to the contributors and developers who have contributed to similar projects and open-source resources.
