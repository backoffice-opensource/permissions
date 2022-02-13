const express = require('express');
const { randomBytes } = require('crypto')

const app = express();

const PORT = 4001;

app.use(express.json());

/***
 * role [ADMIN]
 *  permission [users]
 *    action [0-4]
 */

const permissions = {}
const roles = {}
const users = {};

app.get("/", (req, res) => {
  res.send({ status: 'OK' })
})

app.post("/events", async (req, res) => {
  res.send({ status: 'OK' })
})

/***
 * PERMISSIONS
 */
app.post("/permissions", (req, res) => {
  const { permission_name } = req.body;
  permissions[permission_name] = 1;
  res.send(permissions)
})

app.get("/permissions", (req, res) => {
  res.send(permissions)
})
/***
 * ROLES
 */
 app.get("/roles", (req, res) => {
  res.send(roles)
})
app.post("/roles", (req, res) => {
  const { rol_name, rol_permissions } = req.body;
  const id = randomBytes(4).toString('hex');
  roles[id] = { 
    id, 
    rol: rol_name, 
    permissions: rol_permissions || permissions,
  }
  res.send(roles)
})

app.listen(PORT, () => {
  console.log(`Authorizations Microservice running on port ${PORT}`);
})