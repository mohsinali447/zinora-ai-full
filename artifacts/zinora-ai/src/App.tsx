import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Signup from "@/pages/signup";
import ForgotPassword from "@/pages/forgot-password";
import Conversations from "@/pages/conversations";
import AiSettings from "@/pages/ai-settings";
import Billing from "@/pages/billing";
import Knowledge from "@/pages/knowledge";
import Analytics from "@/pages/analytics";
import Team from "@/pages/team";
import Integrations from "@/pages/integrations";
import Profile from "@/pages/profile";
import Notifications from "@/pages/notifications";
import Support from "@/pages/support";

import Features from "@/pages/features";
import Pricing from "@/pages/pricing";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Faq from "@/pages/faq";
import Blog from "@/pages/blog";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* Public Pages */}
      <Route path="/" component={Home} />
      <Route path="/features" component={Features} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/faq" component={Faq} />
      <Route path="/blog" component={Blog} />

      {/* Auth Pages */}
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/forgot-password" component={ForgotPassword} />

      {/* Dashboard Pages */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/conversations" component={Conversations} />
      <Route path="/ai-settings" component={AiSettings} />
      <Route path="/billing" component={Billing} />
      <Route path="/knowledge" component={Knowledge} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/team" component={Team} />
      <Route path="/integrations" component={Integrations} />
      <Route path="/profile" component={Profile} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/support" component={Support} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
