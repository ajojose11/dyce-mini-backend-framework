const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const Network = require ('../models/cluster_network.model');
var Ansible = require('node-ansible');
const fs = require('fs');
const yaml = require('js-yaml');
const os = require('os');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));


router.post('/create', asyncHandler(createNetwork) );
router.get('/list', asyncHandler(listNetwork));

async function getExplorer(data) {

    data.forEach(item => {
        if (item.status == 1) {
            try {
            var path = item.homedir + '/spec.yaml'
            var file = yaml.load(fs.readFileSync(path))
            item.explorerIP = 'http://' + file.fabric.endpoint_address + ':7004';
            } catch (err) { 
                item.explorerIP = null
                return 
                }
        }
        else item.explorerIP = null
    })

    return data;
}

async function listNetwork(req, res) {
    var networks = await Network.find({user: req.query._id}).lean()
    networks = await getExplorer(networks)
    res.json(networks);
}



async function createNetwork(req, res) {
    
    //create a directory for the organizaton, var directory and kubeconfig directory
    var networkDir = req.body.homedir+'/'+ req.body.name + '/vars/kubeconfig';
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
    var cluster_network = {
        user: req.body._id,
        name: req.body.name,
        cloudProvider: 'azure',
        homedir: networkHome,
        status: 0    
    }
    try {
    var user = await Network.create(cluster_network);
    } catch (err) {

        res.status(500).json({
            error: "name_already_exists"
        })
        return;
    }

    try{
    var command = new Ansible.Playbook().playbook('azure_aks')
                                    .variables(playbook_vars);

    var promise = command.exec({cwd:"/home/ubuntu/dyce-mini-backend-framework/server/playbooks"})
   
    command.on('stdout', function(data) { console.log(data.toString()); });
    command.on('stderr', function(data) { console.log(data.toString()); });

    

    promise.then(async (result) => {
        console.log(result.output);
        console.log(result.code);
        await Network.findOneAndUpdate({name: req.body.name }, {status: 1})
        res.json({status: 'Success', message: "network_up_done"});
    }, async (err) => {
        console.error(err);
        await Network.findOneAndUpdate({name: req.body.name }, {status: 2})
        res.status(500).json({
            error: "network_up_failed"
        })
      })
    } catch (err) {
        await Network.findOneAndUpdate({name: req.body.name }, {status: 2})
        res.status(500).json({
            error: "network_up_failed"
        })
    }
    


}