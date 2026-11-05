Joineazy -- Assignment & Review Dashboard
A responsive, role-based assignment management dashboard built with
React and Tailwind CSS. Joineazy provides a simple workspace
where students can view and submit assignments, while admins
(professors) can create and manage assignments and monitor student
submission progress.
Project links
GitHub repository:
https://github.com/riyanshigaur8-ai/joineazy-dashboard
Live application: `ADD_YOUR_VERCEL_DEPLOYMENT_URL_HERE`
Demo video: `ADD_YOUR_DEMO_VIDEO_LINK_HERE`
> Replace the live application and demo video placeholders before
> submitting the project.
1. Problem statement
In a classroom or training environment, assignment instructions, due
dates, submission status, and progress can become difficult to track
when they are managed through separate messages or spreadsheets.
Students need a clear view of their pending and completed work, while
instructors need a convenient way to distribute assignments and monitor
submissions.
2. Proposed solution
Joineazy brings these workflows into one dashboard with two role-based
experiences:
Students can view assignments assigned to them, check
descriptions and due dates, open any provided external submission
link, confirm that they have submitted their work, and track their
overall progress.
Admins / Professors can create, edit, and delete assignments,
assign them to all students or selected students, and review
submission status and class completion progress for assignments they
created.
The project uses seeded demo accounts and browser `localStorage` instead
of a backend, as permitted by the task.
3. Features
Authentication and role-based access
Mock login using seeded user accounts; no real authentication
service is involved.
Two roles: Admin and Student.
Protected, role-specific dashboard routes.
Each dashboard displays data relevant to the signed-in demo user.
Student dashboard
Displays assignments assigned to the signed-in student.
Shows assignment information such as title, description, due date,
and submission status.
Provides a two-step submission confirmation:
The student selects Yes, I have submitted.
A final confirmation dialog is shown before the status is
changed to Submitted.
Displays an overall submission progress indicator.
Submission records are stored in `localStorage` and remain available
after a page refresh.
Admin dashboard
Create new assignments.
Edit existing assignments.
Delete assignments after confirmation.
Assign an assignment to all students or selected students.
View assignments created by the currently signed-in admin.
Review student submission status and assignment completion progress.
General
Responsive interface for desktop and mobile layouts.
Shared assignment state through React Context.
Browser persistence through `localStorage`.
Reusable components and a separated folder structure.
4. Technology stack
---
Technology                          Purpose
---
React                               Component-based user interface
Vite                                Development server and production
build
Tailwind CSS                        Responsive styling and utility
classes
React Router                        Client-side routing and protected
routes
Context API                         Shared authentication and
assignment state
React Hooks                         Component state and lifecycle
handling
Lucide React                        Interface icons
Browser localStorage                Persistence for demo users,
assignments, and submissions
Vercel                              Deployment
5. Project structure
``` text
joineazy-dashboard/
├── public/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── AssignmentContext.jsx
│   ├── data/
│   │   ├── users.js
│   │   └── assignments.js
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── StudentDashboard.jsx
│   ├── utils/
│   │   └── storage.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```
6. Component and state architecture
Application entry point
`main.jsx` mounts the React application and wraps it with the router
and context providers.
`App.jsx` defines the application routes and connects the login and
dashboard pages.
Authentication
`AuthContext.jsx` manages the current mock user and
authentication-related actions.
`ProtectedRoute.jsx` checks whether a user is signed in and whether
their role is permitted to access a route.
`Login.jsx` provides the demo login interface and seeded account
options.
Assignment management
`AssignmentContext.jsx` maintains the shared assignment list and
exposes functions to add, update, and delete assignments.
`AdminDashboard.jsx` provides the admin interface for assignment
management and submission monitoring.
`StudentDashboard.jsx` displays the signed-in student's assigned
work and submission workflow.
Data and persistence
`data/users.js` contains the seeded demo users.
`data/assignments.js` contains the initial assignment data.
`utils/storage.js` provides reusable helpers for reading from and
writing to browser `localStorage`.
The Context API keeps assignment data consistent between the dashboards
during the current browser session. The storage utility persists the
demo data across page refreshes.
7. Demo accounts
The application uses mock login. Select a demo account or enter its
email address in the login screen. No password or real authentication
is required.
Role                  Demo email
---
Admin / Professor 1   `admin1@joineazy.com`
Admin / Professor 2   `admin2@joineazy.com`
Student 1             `student1@joineazy.com`
Student 2             `student2@joineazy.com`
Student 3             `student3@joineazy.com`
Student 4             `student4@joineazy.com`
Student 5             `student5@joineazy.com`
8. Run the project locally
Prerequisites
Install the following before running the project:
Node.js (LTS version recommended)
npm (included with Node.js)
Git
Step 1: Clone the repository
``` bash
git clone https://github.com/riyanshigaur8-ai/joineazy-dashboard.git
```
Step 2: Open the project directory
``` bash
cd joineazy-dashboard
```
Step 3: Install dependencies
``` bash
npm install
```
Step 4: Start the development server
``` bash
npm run dev
```
Vite will print a local URL in the terminal, usually:
``` text
http://localhost:5173
```
Open that URL in your browser.
Step 5: Create a production build
``` bash
npm run build
```
The production-ready files are generated in the `dist/` directory.
To preview the production build locally:
``` bash
npm run preview
```
9. Data and design decisions
Mock authentication: The task does not require a backend or real
authentication, so seeded demo users are used to demonstrate
role-based workflows.
React Context: Authentication and assignment state are shared
through Context rather than passing data through many component
layers.
localStorage: Assignments and submission records are saved in
the browser so the demo state survives refreshes.
Role-based views: Admin and student dashboards expose different
workflows and data.
Component-based structure: Pages, shared components, context,
seed data, and storage helpers are separated to keep the code
understandable and maintainable.
Responsive styling: Tailwind CSS utility classes are used to
adapt the interface to different screen sizes.
10. Important limitations
This is a frontend assignment demo; it does not use a backend,
server database, or production authentication.
`localStorage` is specific to the browser and device in which the
application is opened. Data is not synchronized between different
users' devices or browsers.
Mock login and client-side route protection are for demonstration
only and are not security mechanisms.
Assignment submission is represented by a confirmation and a locally
stored status. It does not upload a file to a server.
Clearing browser storage may reset or remove locally saved demo
data.
11. Deployment
The project is deployed using Vercel.
Typical Vercel build settings:
Setting            Value
---
Framework preset   Vite
Install command    `npm install`
Build command      `npm run build`
Output directory   `dist`
Root directory     `./`
Add your actual Vercel deployment URL in the Project links section
at the top of this README.
12. Assignment scope
This project was developed for the Joineazy -- Frontend Intern
Assignment: Assignment & Review Dashboard. It addresses the requested
student and admin workflows using React, Tailwind CSS, React hooks,
role-based views, and browser persistence without a backend.
---
Developed by: Riyanshi Gaur  
Repository:
riyanshigaur8-ai/joineazy-dashboard
