
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BugList from '@/components/BugList';
import BugForm from '@/components/BugForm';
import Header from '@/components/Header';

export interface Bug {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'done';
  assignee: string;
  createdAt: Date;
}

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
}

const Index = () => {
  const [bugs, setBugs] = useState<Bug[]>([
    {
      id: '1',
      title: 'Submit button not responding on mobile',
      description: 'The submit button on the contact form is not clickable on iOS Safari. Users report tapping multiple times with no response.',
      status: 'open',
      assignee: 'sarah-chen',
      createdAt: new Date('2024-06-15T10:30:00')
    },
    {
      id: '2',
      title: 'User dashboard loading slowly',
      description: 'Dashboard takes 5+ seconds to load user data. Network tab shows API response is delayed.',
      status: 'in-progress',
      assignee: 'mike-torres',
      createdAt: new Date('2024-06-14T15:20:00')
    },
    {
      id: '3',
      title: 'Email notifications not sending',
      description: 'Users not receiving password reset emails. SMTP logs show connection timeouts.',
      status: 'done',
      assignee: 'alex-kim',
      createdAt: new Date('2024-06-13T09:15:00')
    }
  ]);

  const [showForm, setShowForm] = useState(false);

  const teamMembers: TeamMember[] = [
    { id: 'sarah-chen', name: 'Sarah Chen', avatar: 'SC' },
    { id: 'mike-torres', name: 'Mike Torres', avatar: 'MT' },
    { id: 'alex-kim', name: 'Alex Kim', avatar: 'AK' },
    { id: 'jessica-lopez', name: 'Jessica Lopez', avatar: 'JL' },
    { id: 'david-park', name: 'David Park', avatar: 'DP' }
  ];

  const addBug = (bug: Omit<Bug, 'id' | 'createdAt'>) => {
    const newBug: Bug = {
      ...bug,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setBugs([newBug, ...bugs]);
    setShowForm(false);
  };

  const updateBug = (updatedBug: Bug) => {
    setBugs(bugs.map(bug => bug.id === updatedBug.id ? updatedBug : bug));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bug Tracker</h1>
            <p className="text-gray-600 mt-1">Log and assign bugs in seconds</p>
          </div>
          
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-sm flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Report Bug
          </Button>
        </div>

        {showForm && (
          <div className="mb-8">
            <BugForm 
              onSubmit={addBug} 
              onCancel={() => setShowForm(false)}
              teamMembers={teamMembers}
            />
          </div>
        )}

        <BugList 
          bugs={bugs} 
          teamMembers={teamMembers}
          onUpdateBug={updateBug}
        />
      </main>
    </div>
  );
};

export default Index;
