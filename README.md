# Installation

```bash
npm i
```

# Enviroment variables

* **PORT** - port for listening
PORT should be set in env.ts file

CONNECTION TO DATABASE SHOULD BE CONFIGURED IN databse.ts file

# Running developer mode

```bash
npm run dev
```

# Seeding db with fixtures

```bash
npm run seed
```
seeds database with fixtures  of Organizations and Buildings
---

# Endpoints

<details>
  <summary><strong>Method: GET, URL: /organizations  </strong> <i> &nbsp&nbsp Get organizations</i></summary> 

Default request will return a full list of organizations available to the user.\
Additional query parameter is supported to narrow the list of organizations in response.
Query Parameter:
* **?organizations=** list of organizations identifiers 

Example response on success:

```json
{
    "success": true,
    "payload": [
        {
            "id": "0527228e-ba6f-4a9a-b2f7-b017921e437b",
            "name": "Jast, Turcotte and Schaefer",
            "legalAddress": "18359 Maynard Pines Apt. 787",
            "phone": "+77074453253",
            "email": "Celestino.Bergnaum22@hotmail.com",
            "isActive": true
        },
        ...
    ]
}
```
Example Response on Failure:
```json

{
    "success": false,
    "message": "message"
}
```
</details>

<details>
  <summary><strong>Method: POST, URL: /organizations  </strong> <i> &nbsp&nbsp Register new organization entry</i></summary> 

Create new organization entry in the database. 

```json
{
  "name": "MyOrganization",
  "legalAddress": "908 Ruecker Ridge Apt. 379",
  "phone": "+77079761717",
  "email": "King58@hotmail.com"
}
```
Requested Fields:
* **name** (string): a name of organization.
* **phone** (string, optional): The phone number.
* **legalAddress** (string, optional): legal address of the organization
* **email** (string, optional): contact email of the organization
* **isActive** (boolean, optional): denotes if organization is active. Automatically generated as true if not provided otherwise

Example response on success:

```json
{
    "success": true,
}
```
</details>

<details>
  <summary><strong>Method: GET, URL: /organizations/:id  </strong> <i> &nbsp&nbsp Get organization by id</i></summary> 
Get organization by id

Example response on success:

```json
{
    "success": true,
    "organization": {
        "id": "0527228e-ba6f-4a9a-b2f7-b017921e437b",
        "name": "SomeOrganizationName",
        "legalAddress": "18359 Maynard Pines Apt. 787",
        "phone": "+77074453253",
        "email": "Celestino.Bergnaum22@hotmail.com",
        "isActive": true
    }
}
```
</details>

<details>
  <summary><strong>Method: GET, URL: /buildings  </strong> <i> &nbsp&nbsp Get buildings</i></summary> 
Default request will return a full list of buildings

Additional query parameters are supported to narrow the list of organizations in response. 

Query Parameter (multiple can be combined in one request):
* **?organizationId=** Filters buildings by an organization
* **?buildings=** list of buildings identifiers 

Example response on success:

```json
{
    "success": true,
    "payload": [
        {
            "id": "bdf63a7c-f92b-4583-8c17-fa60bd9ad933",
            "name": "Building #lWasr",
            "address": "2094 Gislason Motorway Apt. 711",
            "isActive": true,
            "organizationId": "ddbfb80a-3292-4a1e-ad88-bad54cbe0a08"
        },
        ...
    ]
}
```
Example Response on Failure:
```json

{
    "success": false,
    "message": "message"
}
```
</details>

<details>
  <summary><strong>Method: POST, URL: /buildings  </strong> <i> &nbsp&nbsp Register new building entry</i></summary> 

Create new building entry in the database. 
```json
{
    "name": "Office center #1",
    "address": "Some address",
    "organizationId": "ddbfb80a-3292-4a1e-ad88-bad54cbe0a08"
}
```

Requested Fields:
* **name** (string): a name of the building.
* **address** (string): address of the building
* **organizationId** (string): Id of the organization with which the building is associated

Example response on success:

```json
{
    "success": true,
}
```
</details>

<details>
  <summary><strong>Method: GET, URL: /buildings/:id  </strong> <i> &nbsp&nbsp Get building by id</i></summary> 
Get building by id

Example response on success:

```json
{
    "success": true,
    "building": {
        "id": "f59bc65e-932c-4333-b411-3e5d67f96841",
        "name": "Building #aJ05K",
        "address": "5965 Kirlin Stream Suite 129",
        "isActive": true,
        "organizationId": "ddbfb80a-3292-4a1e-ad88-bad54cbe0a08"
    }
}
```
</details>
