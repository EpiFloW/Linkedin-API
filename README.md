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

### User
```text
register (/users/register) :
  params :  isAdmin (boolean)
            isBanned (boolean)
            email (string)
            name (string)
            surname (string)
            age (integer)
            profilePicture (string)
            country (string)
            password (string)

  return : userId


login (/users/login) :
  params :  email (string)
            password (string)

  return : userId
           Bearer token


getUserProfile (/users/getCurrentUser):
  headers : Autorization : Bearer {token}
            Content-Type : application/x-www-form-urlencoded

  return : current User

updateUserProfile (/users/update) :
  headers : Autorization : Bearer {token}
            Content-Type : application/x-www-form-urlencoded

  params : country (string)

  return : user updated


getUsers (/users/get) :
  params : fields (string)
           order (string)
           userId (integer)

  return : user
```

### Post
```text
create (/posts/create) :
  headers : Autorization : Bearer {token}
            Content-Type : application/x-www-form-urlencoded

  params : content (string)

  return : ppost id

edit (/posts/edit) :
  params : postId (integer)
           content (string)

  return : post

getPosts (/posts/get) :
  params : fields (string)
           order (string)
           userId (integer)

  return : post

```

### Comment
```text
create (/comments/create) :
  params :  postId (integer)
            userId (integer)
            content (string)

delete :
  params :  commentId (string)

edit :
  params :  commentId (string)
            content (string)
```

### School
```text
```

### Organization
```text
```

### OrganizationsRelationship
```text
```

### SchoolsRelationship
```text
```
