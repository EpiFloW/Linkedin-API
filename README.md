# Linkedin API

### Lancer l'API en local
Créer trois bases de donnée en local :
`database_linkedin_api_development`
`database_linkedin_api_test`
`database_linkedin_api_production`

```text
"development": {
  "username": "YOUR_USERNAME",
  "password": "YOUR_PASSWORD",
  "database": "database_linkedin_api_development",
  "host": "127.0.0.1",
  "dialect": "mysql",
  "operatorsAliases": false
},
"test": {
  "username": "YOUR_USERNAME",
  "password": "YOUR_PASSWORD",
  "database": "database_linkedin_api_test",
  "host": "127.0.0.1",
  "dialect": "mysql",
  "operatorsAliases": false
},
"production": {
  "username": "YOUR_USERNAME",
  "password": "YOUR_PASSWORD",
  "database": "database_linkedin_api_production",
  "host": "127.0.0.1",
  "dialect": "mysql",
  "operatorsAliases": false
}
```

```shell script
npm install
sequelize db:migrate
```

# API Documentation

### Users
```text
register :
  params :  isAdmin (boolean)
            isBanned (boolean)
            email (string)
            name (string)
            surname (string)
            age (integer)
            profilePicture (string)
            country (string)
            password (string)

login :
  params :  email (string)
            password (string)

getUserProfile

updateUserProfile
```

### Posts
```text
```

### Comments
```text
create :
  params :  postId (string)
            userId (string)
            content (string)

delete :
  params :  commentId (string)

edit :
  params :  commentId (string)
            content (string)
```

### Schools
```text
```

### OrganizationsRelationship
```text
```

### SchoolsRelationship
```text
```

### SchoolsRelationship
```text
```
