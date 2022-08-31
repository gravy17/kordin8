# Server

## Setup

1. Clone the repo:

```
git clone git@github.com:decadevs/week-8-mini-project-group_5.git
```

2. Switch to the dev branch:

```
git switch develop
```

3. Navigate to the part of the app you will work on:

```
cd server
```

4. **Important:** Checkout a new branch e.g

```
git checkout -b new_feature
```

5. Install packages with

```
yarn
```

6. Install the VSCode Extension `Prettier ESLint`. While working on the project, you need to _*disable*_ both `ESLint` and `Prettier` extensions if you have them, to avoid interference.

7. Create 2 files: `.env` and `.db.env`. Copy the contents of `.env.sample` into `.env` and the contents of `.db.env.sample` into `.db.env` (You can use passwords and usernames of your choosing in both files but DB_PASSWORD and POSTGRES_PASSWORD should match, as well as DB_USER and POSTGRES_USER; the rest should remain as is)

8. Start up docker. If it is not running the next step will fail.

9. For development- In separate terminals:

- ```
  yarn compile
  ```

- ```
  yarn servedb
  ```

- ```
  yarn dev
  ```

this server is configured to run on port 3001 unless otherwise specified with an environment variable.
Make sure you have the folders `controllers`, `middleware`, `models`, and `utils`

- While the app is running, you can explore the database with a GUI at localhost:8080; the credentials will match the .env variables- System: PostgreSQL, server: postgresql, username: same as DB_USERNAME, password: same as DB_PASSWORD, database: same as DATABASE

## Seeding the DB with a Superadmin

A superadmin is required for an admin to be able to create other admins. Follow these steps to seed the database with a superadmin:

- ```
  npx sequelize-cli db:migrate
  ```

- ```
  npx sequelize-cli db:seed:all
  ```

## What To Do Next

- Note: Some code style is automatic, but not all. Let this be your guide: https://google.github.io/styleguide/javascriptguide.xml

- [ ] Create a new controller
- [ ] Create a new route or add to an existing route
- [ ] Test your feature (At least 1 test)
- [ ] Document your feature on the Postman Collection here: https://www.postman.com/altimetry-meteorologist-19263221/workspace/kordin8/collection/23045732-4866f388-2d19-467d-a872-c6e0a8a8201e?action=share&creator=23045732. Fork the collection and document your feature on the your fork. Then submit a pull request for the collection.

## When you complete a feature

1. Build the app: `yarn build`

- The linter will run and try to format your code. Fix any problems that the linter raises.

2. Check that it runs correctly:

```
yarn test
```

and

```
yarn start
```

3. Sync with the remote:

```
git commit -am "Commit message here" && git pull origin develop
```

- Resolve any merge conflicts. Ensure that the app still builds and runs correctly.

4. Create a pull request: the base/destination branch should be `develop` and the compare/source branch should be your feature branch.

## Standards

Standards will be maintained automatically by the settings in .vscode/settings.json and governed by settings in the .eslintrc.json. A successful build with eslint is necessary to qualify changes for a pull request.
