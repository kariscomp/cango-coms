# Cango-Coms
A service that handles coms with customers and drivers. It will receive messages, add locales and send them via various channels to users.

# Accesing production cluster

The application is currently deployed via a Cluster IP so that it can only be accessed from within the cluster. When we are ready to move to production we will deploy it via a static IP. 

To access the service, you have to run 

`kubectl proxy --port=8080`

This creates a proxy to the cluster.

You can acess swagger here `http://localhost:8080/api/v1/proxy/namespaces/default/services/coms-service:http/explorer_swagger_new/`

And Make http requests such as this:

`curl -X GET --header 'Accept: application/json' 'http://localhost:8080/api/v1/proxy/namespaces/default/services/coms-service:http/api/v1/Vitals'`
