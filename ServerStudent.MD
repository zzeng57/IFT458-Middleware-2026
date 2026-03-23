# Server Notes - [Sean Kimminau]
Date: [03/10/2026]

## What I Learned
- The backend use Express.js with MongoDB
- JWT tokens are used for authentication
- The API run on port 4000
- CORS is needed so the mobile app can connect

## Edited a file for MModule 5 Activity 1 - [Kandle Mcgee]
Date: [03/10/2026]

## Edited a file for MModule 5 Activity 1[Mark Jenkins]
Date: [03/10/2026]


########################
# Server Notes - Daniel Paz
Date: 2026.03.14

## What I Learned
- The backend use Express.js with MongoDB
- JWT tokens are used for authentication
- The API run on port 4000
- CORS is needed so the mobile app can connect

################################
# ServerStudent Notes

## Student Information
Name: Belmin Ramdedovic  
Date: 03/18/2026

## What I Learned
- The backend uses Express.js with MongoDB.
- JWT tokens are used for authentication.
- The API runs on port 4000.
- CORS is required so the mobile app can connect to the backend.

## Notes
For this activity, I reviewed the backend setup and learned how the server connects to MongoDB and supports the mobile application through REST API routes. I also confirmed that the backend must run on port 4000 for this assignment. After copying my `config.env` file into the backend folder, I installed the dependencies and started the server using `node server.js`. This helped me understand how the backend and mobile app work together in the Book Exchange Platform project.

################################
# ServerStudent Notes

## Student Information
Name: Heritier Bitambiki
Date: 03/18/2026

## What I Learned

- The backend uses Express.js with MongoDB
- JWT tokens are used for authentication
- The API runs on port 4000
- CORS is required so the mobile app can connect

## Notes

For this activity, I explored how the backend is set up and how it connects to MongoDB using environment variables. I updated the `config.env` file and made sure the server could run properly on port 4000. I then started the backend using `node server.js` and confirmed that the database connection was successful. I also learned how the backend provides API endpoints that allow the mobile app to send and receive data. This activity helped me better understand how the backend and mobile application work together, especially when using JWT for authentication.

# Server Notes - Kandle Mcgee
Date: 03/19/2026

## What I Learned
- The backend use Express.js with MongoDB
- JWT tokens are used for authentication
- The API run on port 4000
- CORS is needed so the mobile app can connect

## Notes
For Module 5: Cloning Repository, I started the frontend React mobile application with npx expo start. The mobile app works with the backend node.js server that runs on port 4000. The backend uses the environment variables in the config.env file to successfully connect to the MongoDB. This Book Exchange backend application uses JWT tokens to authenticate and authorize the user that signs up to access book resources through REST API routes. This project introduced me to Github repository and developing a React mobile application with Node.js and Express.js.

# ServerStudent Notes

## Student Information
Name: Ogunniran David
Date: [03/22/2026]

## What I Learned
- The backend uses Express.js with MongoDB.
- The JWT tokens are used for authentication.
- The API runs on port 4000.
- CORS is required so the mobile app can connect to the backend.

## Notes
For this lab, I set up and ran the backend server for the Book Exchange Platform project. I first reviewed the README file to understand the requirements. Then I copied my `config.env` file into the backend folder to provide the necessary environment variables. After that, I installed all required dependencies using `npm install`. When I encountered an error about a missing module (`dotenv`), I resolved it by installing the required packages and ensuring all dependencies were properly installed.

Next, I started the server using:node server.js

Once the server was running, I opened `http://localhost:4000` in my browser to verify that the backend was working correctly. This activity helped me understand how the backend connects to MongoDB, how environment variables are used, and how the server provides API endpoints for the mobile application. I also learned how important it is to properly install dependencies and troubleshoot errors during setup.


# ServerStudent Notes

## Student Information
Name: Tyler Simunovich
Date: 03/22/2026

## What I Learned
- Learned how to start a backend server and verify it's running correctly.
- Learned how to launch a mobile app with Expo
- Understanding of how the frontend connects with the backend
- Practiced basic Git workflows

# ServerStudent Notes

## Student Information
Name: Harshith Siddardha Manne
Date: 03/22/2026

## What I Learned

1. Cloning a Repository
I learned that git clone creates a full local copy of a remote repository on my machine. Before cloning, I had to make sure my GitHub credentials were configured correctly using:
bashgit config --global user.name "Name of the user"
git config --global user.email "Useremail"
Then I cloned the repo using:
bashgit clone https://github.com/DineshSthapit/IFT458-Middleware-2026.git
cd IFT458-Middleware-2026
Key takeaway: Always verify your credentials and repo URL before cloning, especially for private repositories where authentication matters.

2. Understanding Project Structure
Opening the README.md first taught me the importance of reading documentation before writing any code. The project had two separate parts — a backend and a mobile frontend — each needing their own VS Code instance and terminal. This mirrors how real-world full-stack projects are structured.

3. Running the Backend (Node.js)
I learned that environment variables (stored in config.env) are kept separate from the codebase for security reasons — things like database passwords and API keys should never be committed to GitHub.
Starting the server with:
bashnode server.js
...and then visiting http://localhost:4000 taught me how a backend server listens on a port and serves responses to clients.

4. Running the Mobile App (Expo / React Native)
Using npx expo start and pressing w to open the web preview showed me how React Native can target multiple platforms (iOS, Android, Web) from a single codebase. I learned that Expo handles a lot of the build complexity behind the scenes.

5. The Git Workflow (Status → Add → Commit → Push)
This was the most hands-on learning for me. I now understand each step:
CommandWhat it doesgit statusShows which files are new, modified, or untrackedgit add .Stages all changes for the next commitgit commit -m "message"Saves a snapshot of staged changes with a descriptiongit pushUploads commits to the remote GitHub repository
I repeated this cycle for each deliverable (ServerStudent.MD, screenshots, MobileStudent.MD), which reinforced that Git is a habit, not a one-time action.

6. Adding a Collaborator
I learned how to give another GitHub user access to my repository by going to:
Settings → Collaborators → Add People and entering dsthapit@asu.edu. This is how teams share and review each other's code in professional environments.

7. Overall Reflection
This module connected everything — version control, backend servers, mobile frontends, and collaboration tools — into one real workflow. The biggest challenge was managing credentials and making sure the right GitHub account was authenticated. Going forward, I feel confident cloning repos, running full-stack projects locally, and pushing my work back to GitHub.


# Server Notes - Tyler Long
Date: 3/22/2026

## What I Learned
- The backend uses Express.js with MongoDB
- JWT tokens are used for authentication
- Basic git/github processes and workflows
- F12 can be used to switch to a mobile display 