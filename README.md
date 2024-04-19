<h3 align="center"># Northcoders News API</h3>
  <p align="center">
    <br />
    <a href="https://github.com/gabenorthcoder/project"><strong>Explore Repo »</strong></a>
    <br />
    <a href="https://project-x8zn.onrender.com/">View Demo</a>
    ·
    <a href="https://github.com/gabenorthcoder/project/issues">Report Bug</a>
    ·
  </p>
</div>

<!-- ABOUT THE PROJECT -->

# Northcoders News API

Northcoders News API version: 1.0.0, a backend project, serving Northcoders news articles, topic comments etc

## Endpoints:

GET /api: Returns a JSON of all endpoints

## Requirements:

1. Node: 21.6.2
2. PostgreSQL: 14.11
3. pg: 8.7.3
4. pg-format: 1.0.4

## Cloning the Repo:

```
git clone https://github.com/gabenorthcoder/project.git
```

## Setting Up the Database

Make sure you use the example env file format to create two env files and have the <database> names saved in them.

1. env.test <PGDATABASE=nc_news_test>
2. env.development <PGDATABASE=nc_news>

# List of NPM commands

```
npm install                  # Installs all node_modules with all dependencies
npm start                    # Start server in production (with node)
npm run dev                  # Start server in development mode (with nodemon)
npm run test                 # Run Jest tests
npm start                    # Start server with node
npm run setup-dbs            # Setup Development Databases
npm run seed                 # Creates database tables and inserts seed data in development mode
npm run seed-prod            # Creates database tables and inserts seed data in production mode

```
