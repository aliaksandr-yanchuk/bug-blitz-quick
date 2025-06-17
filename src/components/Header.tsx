
import { Bug } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <Bug className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">BugTracker</h1>
            <p className="text-sm text-gray-500">Fast bug reporting & assignment</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
