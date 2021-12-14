const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const Network = require ('../models/cluster_network.model');
var Ansible = require('node-ansible');
const fs = require('fs');
const os = require('os');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));


router. get('/create', asyncHandler(createNetwork) );

async function createNetwork(req, res) {
    
    //create a directory for the organizaton, var directory and kubeconfig directory
    var networkDir = req.body.homedir+'/'+ req.body.name + '/var/kubeconfig';
    if (!fs.existsSync(networkDir)){
        fs.mkdirSync(networkDir, { recursive: true });
    }
    var networkHome = req.body.homedir+'/'+ req.body.name;

    // variables for the playbook
    const playbook_vars = {
        AKS_resource_group: req.body.name,
        AKS_location: "northeurope",
        aks_name: req.body.name,
        k8s_version: "1.22.2",
        node_count: 3,
        home_dir: networkHome
    }

    // var command = new Ansible.AdHoc().module('shell').hosts('local').args("echo 'hello'");
    // command.exec();
    var command = new Ansible.Playbook().playbook('azure_aks')
                                    .variables(playbook_vars);

    var promise = command.exec({cwd:"/Users/admin/Project_codes/dyce-mini-backend-framework/server/playbooks"})
   
    command.on('stdout', function(data) { console.log(data.toString()); });
    command.on('stderr', function(data) { console.log(data.toString()); });

    

    promise.then((result => {
        console.log(result.output);
        console.log(result.code);
        res.send('Success')
    },(err) => {
        console.error(err);
        res.sendStatus(500)
      }))

    


}