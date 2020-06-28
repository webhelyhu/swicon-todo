# Three layer Todo app

## Not yet in working stage!!!!

## Dev config

- Development is configured for dev server 192.168.168.11, so you may need to configure the proxy value in client/package.json
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

- if user removed from database, token still valid, so "you are logged in", but user=null
- authToken expired: not handled.
- userlist the coded password.

## Credits

- Based on a PERN boilerplate (Reno Expo) for authentication.
- Using design elements from Zachary Reece
