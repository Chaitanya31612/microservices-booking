## Steps to run the project

1. Have skaffold installed and run `skaffold dev` in the root directory of the project
2. for running in ubuntu install minikube and run `minikube start` and then `skaffold dev`
3. Use `skaffold dev --port-forward` to forward the ports to the host machine

OR
4. run `minukube service -all` to get the url of the service and open it in the browser
5. run `minikube dashboard` to see the dashboard of the cluster
6. run `minikube stop` to stop the cluster
7. run `minikube delete` to delete the cluster
8. run `minikube addons list` to see the addons installed

## Creating secret in kube cluster

1. Create a secret in the cluster using the command `kubectl create secret generic jwt-secret --from-literal=JWT_KEY=your_secret_key`

## Solution to the Auth Status on the client side

1. using `getServerSideProps` to get the currentUser on the initial page load don't work if we hit `/api/users/currentuser` because `getServerSideProps` runs on the server and the request to `/api/users/currentuser` is made on the client pod which throws error of not found.
2. To solve this we need to make a forward that request to the ingress-nginx controller which will then forward the request with the cookie from the browser to the correct service (auth service) and then return the response to the client.
3. So we need to make a proxy request to the ingress-nginx controller which will then forward the request to the correct service.
4. The request need to made on `"http://SERVICENAME.NAMESPACE.svc.cluster.local/api/users/currentuser"` which in our case is,
    `"http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser"`. and pass the headers as well.
    To get the namespace run `kubectl get namespace` and to get the service name run `kubectl get services -n NAMESPACE`
