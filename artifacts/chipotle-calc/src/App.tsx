import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import MenuCategoryPage from "@/pages/MenuCategoryPage";
import ItemPage from "@/pages/ItemPage";
import DietPage from "@/pages/DietPage";
import GuidePage from "@/pages/GuidePage";
import SitemapPage from "@/pages/SitemapPage";

import AboutPage from "@/pages/static/AboutPage";
import MethodologyPage from "@/pages/static/MethodologyPage";
import EditorialPolicyPage from "@/pages/static/EditorialPolicyPage";
import SourcesPage from "@/pages/static/SourcesPage";
import ContactPage from "@/pages/static/ContactPage";
import ChangelogPage from "@/pages/static/ChangelogPage";
import DisclaimerPage from "@/pages/static/DisclaimerPage";
import PrivacyPolicyPage from "@/pages/static/PrivacyPolicyPage";
import TermsPage from "@/pages/static/TermsPage";
import CookiePolicyPage from "@/pages/static/CookiePolicyPage";
import AccessibilityPage from "@/pages/static/AccessibilityPage";
import DmcaPage from "@/pages/static/DmcaPage";
import FaqPage from "@/pages/static/FaqPage";
import MenuIndexPage from "@/pages/MenuIndexPage";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* Home */}
      <Route path="/" component={HomePage} />

      {/* Menu category pages */}
      <Route path="/menu/:category" component={MenuCategoryPage} />

      {/* Individual item pages */}
      <Route path="/item/:slug" component={ItemPage} />

      {/* Dietary filter pages */}
      <Route path="/diet/:name" component={DietPage} />

      {/* Guide pages */}
      <Route path="/guides/:slug" component={GuidePage} />

      {/* FAQ + Menu index */}
      <Route path="/faq" component={FaqPage} />
      <Route path="/menu" component={MenuIndexPage} />

      {/* Sitemap */}
      <Route path="/sitemap" component={SitemapPage} />

      {/* E-E-A-T / Trust pages */}
      <Route path="/about" component={AboutPage} />
      <Route path="/methodology" component={MethodologyPage} />
      <Route path="/editorial-policy" component={EditorialPolicyPage} />
      <Route path="/sources" component={SourcesPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/changelog" component={ChangelogPage} />
      <Route path="/disclaimer" component={DisclaimerPage} />

      {/* Legal pages */}
      <Route path="/privacy-policy" component={PrivacyPolicyPage} />
      <Route path="/terms-of-service" component={TermsPage} />
      <Route path="/cookie-policy" component={CookiePolicyPage} />
      <Route path="/accessibility" component={AccessibilityPage} />
      <Route path="/dmca" component={DmcaPage} />

      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

interface AppProps {
  ssrPath?: string;
}

function App({ ssrPath }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter ssrPath={ssrPath} base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster richColors position="bottom-center" />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
