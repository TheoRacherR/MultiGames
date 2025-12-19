# MultiGames
Multi-games project

## Build project

### 1. Get the project locally 
```
git clone git@github.com:TheoRacherR/OxygenBnb.git
```

### 1.1 Install all of the node modules
```
cd back/
```
```
cd npm install
```
```
cd ../../app
```
```
cd npm install
```

### 2.1 Create a .env file on root folder with those variables (that you have to fill) here's an exemple:
```
DB_TYPE=postgres
PG_HOST=db
PG_USER=postgres
PG_PASSWORD=postgres
PG_DB=postgres
PG_PORT=5432
NEST_PORT=3333
NODE_ENV_DEV=true
REACT_PORT=3000
```

### 2.2 Create a .env file on app/ folder with those variables (that you have to fill) here's an exemple:
```
REACT_APP_NODE_ENV_DEV=true
REACT_APP_URL_NEST_PROD=https://google.fr/
REACT_APP_URL_NEST_DEV=http://localhost:3333/
```

### 2.3 Create a .env file on back/ folder with those variables (that you have to fill) here's an exemple:
```
PG_HOST=db
PG_USER=postgres
PG_PASSWORD=postgres
PG_DB=postgres
PG_PORT=5432
NEST_PORT=3333
jwt_secret=8$hTMXK$hbbBc6qSmcPESofDL6Kd
NODE_ENV_DEV=true
```

### 3. Finally, Build the project
```
docker compose up --build
```
