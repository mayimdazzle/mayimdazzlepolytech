import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Updated to Corporate Light Theme defaults */}
      <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-primary/20 selection:text-primary">
        <Router />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;