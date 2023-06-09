# InsuredMine
# OverView
- In this project, we can upload/attach csv file.
- After converting csv file into JSON, we can insert documents into Database By filtering them according to agents,users,policies and user_accounts.
- In This project, we can also perform CRUD operations for Users, Accounts and  Policies
# For Running this project

- To install packages do *npm i* in terminal

- After that use *npm start* for start the server

### API's

- CRUD Api's(POST,GET,PUT,DELETE) for Users,Accounts,Policy
- One more Api i.e POST for uploading/attaching CSV file to mongoDb and also insert documents into Collections(Agent,User,Policy,User_Accounts) accoringly.

# Endpoints

- server is running on http://localhost:4000/

- To import csv file and inserts documents  in mongoDb use- http://localhost:4000/importcsv

###### Note:- Send file through form-data.

# EndPoints for User

- To create user => use - http://localhost:4000/createuser

- To get all the users => use - http://localhost:4000/getusers

- To get user by id => use - http://localhost:4000/getusers/:id

-- send id in params for updating and deleting.

- To update user => use - http://localhost:4000/updateuser/:id

- To delete user => use - http://localhost:4000/deleteuser/:id

###### NOTE:- id shoud be type of ObjectID. eg:(6440e4a70f2da6d2f28ddffb)

# EndPoints for Policy
- To create policy => use - http://localhost:4000/createpolicy

- To get all the policies => use - http://localhost:4000/getpolicies

- To get the policy by id => use - http://localhost:4000/getpolicies/:id

-- send id in params for updating and deleting.

- To update policy => use - http://localhost:4000/updatepolicy/:id

- To delete policy => use - http://localhost:4000/deletepolicy/:id

###### NOTE:- id shoud be type of ObjectID. eg:(6440e4a70f2da6d2f28ddffb)

# EndPoints for Account
- To create account => use - http://localhost:4000/createaccount

- To get all the accounts => use - http://localhost:4000/getaccounts

- To get account by id  => use - http://localhost:4000/getaccounts/:id

-- send id in params for updating and deleting.

- To update account => use - http://localhost:4000/updateaccount/:id

- To delete account => use - http://localhost:4000/deleteaccount/:id

###### NOTE:- id shoud be type of ObjectID. eg:(6440e4a70f2da6d2f28ddffb)

# Models

- User Model
```
{ userType: { String}, firstname: {String}, email: {String}, city: {String},phone:{String},address:{String},state:{String},dob:{String} }
```
- Agent Model
```
{ agent:{String},producer:{String},company_name:{String}}
```
- Policy Model
```
{policy_mode:{Number},policy_number:{String},premium_amount:{Number},policy_type:{String},policy_start_date:{String},policy_end_date:{String}}
```
- User Account Model
```
{category_name:{String},csr:{String},account_name:{String},account_type:{String},zip:{String}}
```


### Tech-Stacks/Package Used

- Express.js
- MongoDB
- CSVTOJSON
- Multer
