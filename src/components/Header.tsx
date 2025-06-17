
import { Bug } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-destructive/10 rounded-lg">
            <Bug className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-card-foreground">BugTracker</h1>
            <p className="text-sm text-muted-foreground">Fast bug reporting & assignment</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
