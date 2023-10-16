# COMP 3123 - ASSIGNMENT 1

**LIVE SITE**
```
 https://thankful-cardigan-hare.cyclic.cloud 
```

## ENDPOINTS

*Sign up*
http://localhost:8080/api/v1/user/signup

```
Payload
{
    username,
    password,
    email
}

```

*Log in*
http://localhost:8080/api/v1/user/login

```
Payload
{
    username or password,
    password,
}

```

*Get all employees*
http://localhost:8080/api/v1/emp/employees

*Create employee*
http://localhost:8080/api/v1/emp/employees

*Get Specific employee*
http://localhost:8080/api/v1/emp/employees/{eid}

*Update employee*
http://localhost:8080/api/v1/emp/employees/{eid}

*Delete employee*
http://localhost:8080/api/v1/emp/employees?eid=xxx




## Sample users

```
    username : test,
    password : test,
    email : test@test.com

    username : admin,
    password : admin,
    email : admin@admin.com
```

