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
