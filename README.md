# Three layer Todo app

## It is not a production-ready product!

If you are interested in the details, drop me a mail!

## Backend

- The server is a Node Express setup, with JWT authentication.
- There are protected and open routes in the API.
- The server is connecting to a Postgres database and using Sequelize ORM.
- Storing passwords with bcrypt.
- Using multer for receiving multi POST request (image upload).
- Image files are stored locally in /uploads/images

## Frontend

- create-react-app based.
- using Material-UI, with material-table
- for form handling, using Formik
- NOT GDPR-ready! It stores token in localStorage, and does not inform the user.
- Anyone can register a new user - and can log in with the registered password.
- Everyone is admin user, that is, can edit/delete all other users' doto list.

## Dev config

- Development is configured for dev server 192.168.168.11, so you probably need to configure the proxy value in **client/package.json**
- Postgres and JWT defaults are in the .env file
- when database is connected (credentials are ok, server is up), you need to prepare database with sequelize-cli:

```
git clone https://github.com/webhelyhu/swicon-todo
cd swicon-todo
## edit .env file
npm i
npx sequelize-cli db:create
npx sequelize-cli db:migrate
cd client
npm i
```

- You can start the backend in the root with **npm start** and the client in the client subfolder with **npm start**

# TODO

Lots!!!

## Credits

- Based on a PERN boilerplate (Reno Expo) for authentication.
- Using design elements from Zachary Reece
- Using material-table.com
- Upload handling based on Maximilian Swarzmüller's course
