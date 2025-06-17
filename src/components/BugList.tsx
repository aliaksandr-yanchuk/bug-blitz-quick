
import { Bug, TeamMember } from '@/pages/Index';
import BugCard from './BugCard';
import { Badge } from '@/components/ui/badge';

interface BugListProps {
  bugs: Bug[];
  teamMembers: TeamMember[];
  onUpdateBug: (bug: Bug) => void;
}

const BugList = ({ bugs, teamMembers, onUpdateBug }: BugListProps) => {
  const bugsByStatus = {
    open: bugs.filter(bug => bug.status === 'open'),
    'in-progress': bugs.filter(bug => bug.status === 'in-progress'),
    done: bugs.filter(bug => bug.status === 'done')
  };

  const statusConfig = {
    open: { 
      title: 'Open', 
      color: 'bg-destructive/5 border-destructive/20', 
      count: bugsByStatus.open.length 
    },
    'in-progress': { 
      title: 'In Progress', 
      color: 'bg-yellow-50 border-yellow-200', 
      count: bugsByStatus['in-progress'].length 
    },
    done: { 
      title: 'Done', 
      color: 'bg-emerald-50 border-emerald-200', 
      count: bugsByStatus.done.length 
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {Object.entries(statusConfig).map(([status, config]) => (
        <div key={status} className={`rounded-lg border-2 ${config.color} p-4`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">{config.title}</h2>
            <Badge variant="secondary" className="text-xs">
              {config.count}
            </Badge>
          </div>
          
          <div className="space-y-3">
            {bugsByStatus[status as keyof typeof bugsByStatus].map(bug => (
              <BugCard 
                key={bug.id} 
                bug={bug} 
                teamMembers={teamMembers}
                onUpdateBug={onUpdateBug}
              />
            ))}
            
            {bugsByStatus[status as keyof typeof bugsByStatus].length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No bugs in {config.title.toLowerCase()}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BugList;
