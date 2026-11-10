# Project Alpha

### Collaborators 


| Name | GitHub |
|---|---|
| Anna | [@AnnaS120](https://github.com/AnnaS120) |
| Dunjee | [@lisa-akadj](https://github.com/lisa-akadj) |
| Nathan Min Hein | [@Nathanmhein](https://github.com/Nathanmhein) |
| Umel Al-Mousawi | [@Webbie-AAA](https://github.com/Webbie-AAA) |



## Overview 

La Fosse project designed to encapuslate everything covered in the course so far:

- Agile methodologies & version control
- UX Design principles
- Frontend Development (HTML,CSS,JavaScript)
- Backend Development (Express, Node.js)
- MVC architecture
- Databases

### Problem Statement

The management team of the Hive group of secondary schools has noticed a lack of engagement in non-STEM subjects over the last two years. They would like to try and reverse this trend and have asked an external team to come up with a solution that places student enjoyment at the heart of the learning experience.

## Project Overview

To solve the problem, we decided that gamification of the learning process was key to developing engagement when it comes to the learning process. 

The demographic we have chosen to aim or project for are Year 7 History students. 

As a result we came up with __The Great Escape__, 
an educational escape room, where students trapped in different historical periods or locations must solve educational puzzles to escape. 

We aim for teachers to incorporate this into their classrooms as a learning tool, that supplements other teaching resources - but we believe that the gamification of the learning process would naturally lead to better engagement and less pressure when it comes to information recall. 

## Getting Started

### Prerequisites 

- __Node.js__

- __npm__

- A cloud-based DBM hosting platform (e.g. [Supabase](https://supabase.com/), [Neon](https://neon.com/), etc...)

### Installation requirements
1. Clone the repo by running:  `git clone your_github_url`

2. `cd` into the __server__ folder

3. Install all the dependencies by running `npm install` on your terminal
    - This project uses:

        - __Express__

        - __Cors__

        - __dotenv__

        - __nodemon__

        - __pg__

4. Setup your database

    - Create a database on [Supabase](https://supabase.com/) or other cloud-based database management systems platform

    - Retrieve the database URL and copy it

    - Create a `.env` file in the root directory with the following:
        - `DB_URL=<your_database_url>`

    - Replace `<your_database_url>` with the database URL you just copied from Supabase

    - Run `npm run setup-db` to setup the database

5. Setup your port

    - Add a `PORT` key assigned to the port of your choice in the `.env` file. 

        - `PORT=<port_of_your_choice>` 

        - Preferably __Port 3000__

6. Run the server

    - Run `npm run dev` to run the server in __development mode__

    - Run `npm run start` to run the server in __production mode__



## Database Schema

This database was created with __Postgres__

`enrolled_students` - Table Name

```sql
 id INT GENERATED ALWAYS AS IDENTITY,
    word VARCHAR(100) NOT NULL,
    num VARCHAR(30) NOT NULL
```

`student_scores`

```sql
id INT GENERATED ALWAYS AS IDENTITY,
first_name VARCHAR(150) NOT NULL,
last_name VARCHAR(150) NOT NULL,
class_group VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR NOT NULL UNIQUE,
PRIMARY KEY(id)
```

### Base URL
`https://localhost:<port>/the_great_escape` 

### API Endpoints





