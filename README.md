# dyce-mini-backend-framework

Dyce is a blockchain automation framework with a UI that allows people to quickly setup a Hyperledger Fabric network on a cloud network.
The tools used to implement this application are Docker, Ansible, Kubernetes, Hyperledger Fabric, NodeJS, Express, MongoDB, Mongoose, and Angular


### Prerequisites


* **NodeJS v14**
* **Ansible (latest)**
* **Docker (latest)**
* **Azure paid subscription**
* **Azure CLI**
* **OS: Ubuntu 20.04**



### Environment Setup

  1.  Pull the code from the GitHub repository ```git pull https://github.com/ajojose11/dyce-mini-backend-framework.git```
  2.  Go  to  fabric-automation  directory  and  copy  dyce.sh  file  to  your  EXECUTIONPATH ```cd fabric-automation && cp dyce.sh /usr/local/bin && chmod +x /usr/local/bin/dyce.sh```
  3.  Check if command is working by doing
        ``` dyce -h ```
  4.  Pull the docker image form dockerHub
      ```docker pull ajojose11/dyce_fabric_automation```
  5.  Login into Azure using AzureCLI ```az login```
After all these steps your environment setup is completed


### Server Setup

A NodeJS server is used in this application. To successfully run the server, follow the below steps
 
1.  Change into directory of the server files  ```cd server/```
2.  Install the required packages by  ```npm install```
3.  Run the server by the following command  ```npm start```
4.  
By this, the server will start to listen on the port 5000 


### Angular application setup
1.  Change into the root directory of angular application by  ```cd front-end/```
2.  Install the required packages by  ```npm install```
3.  Change the server address specified in the file ```front-end/src/app/interceptors/header.interceptor.ts``` to ’http://localhost:5000’
4.  After that start angular app by   ```npm start```


After the application is started it will be listening on the port 4200

Go to http://localhost:4200 to access the application
