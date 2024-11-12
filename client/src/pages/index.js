import axios from "axios";

export default function Landing({ currentUser }) {
  return currentUser ? (
    <div>You are signed in</div>
  ) : (
    <div>You are not signed in</div>
  );
}

// this runs on the server on each request
export async function getServerSideProps({ req }) {
  // using kubernetes, if we make a request, it will be under the client pod and will not be routed by
  // ingress-nginx to the api pod, so for that, we need to route the request to ingress nginx service
  // which will then route it to the api pod (auth service) according to ingress configuration
  // kubectl get namespaces - to get ingress namespace
  // kubectl get services -n ingress-nginx - to get ingress service

  // this request is essentially a proxy request between the browser and the auth service pod through the ingress-nginx
  // passing the headers from the browser to the ingress-nginx, then to the auth service pod for the auth cookie
  const { data } = await axios.get(
    // "http://SERVICENAME.NAMESPACE.svc.cluster.local/api/users/currentuser",
    "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
    {
      headers: req.headers,
    }
  );

  return { props: data };
}
