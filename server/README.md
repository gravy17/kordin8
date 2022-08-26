# Server

## Setup

1. Clone the repo:

```
git clone https://github.com/decadevs/week-8-mini-project-group_5
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

6. Install the VSCode Extension `Prettier ESLint`

7. Create 2 files: `.env` and `.db.env`. Copy the contents of `sample.env` into `.env` and the contents of `sample.db.env` into `.db.env` (You can use passwords and usernames of your choosing in both files but DB_PASSWORD and POSTGRES_PASSWORD should match, as well as DB_USER and POSTGRES_USER; the rest should remain as is)

8. Start up docker and get the database instance running with

```
docker compose up
```

9. For development- In separate terminals:

```
yarn compile
```

and

```
yarn dev
```

this server is configured to run on port 3001 unless otherwise specified with an environment variable

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
git commit -am "Commit message here" && git pull
```

- Resolve any merge conflicts. Ensure that the app still builds and runs correctly.

4. Create a pull request: the base/destination branch should be `develop` and the compare/source branch should be your feature branch.

## Standards

Standards will be maintained automatically by the settings in .vscode/settings.json and governed by settings in the .eslintrc.json. A build with eslint is necessary to qualify changes for a pull request.
