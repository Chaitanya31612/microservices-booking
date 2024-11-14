import "@/styles/globals.css";
import Layout from "./_layout";
import axios from "axios";
import Header from "@/components/common/Header";
import { UserProvider } from "@/contexts/UserContext";

const App = ({ Component, pageProps, currentUser }) => {
  return (
    <UserProvider>
      <Header currentUser={currentUser} />
      <main className="pt-16">
        <Component {...pageProps} />
      </main>
    </UserProvider>
  );
};

// appContext is different from individual page context, it contains Component and ctx(this contains req)
App.getInitialProps = async (appContext) => {
  const { req } = appContext.ctx;
  if (!req || !req.headers) {
    return { currentUser: null };
  }
  const { data } = await axios.get(
    // "http://SERVICENAME.NAMESPACE.svc.cluster.local/api/users/currentuser",
    "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
    {
      headers: req.headers,
    }
  );

  return { ...data };
};

export default App;
