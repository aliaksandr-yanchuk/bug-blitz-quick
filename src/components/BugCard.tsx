
import { useState } from 'react';
import { ChevronDown, User } from 'lucide-react';
import { Bug, TeamMember } from '@/pages/Index';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface BugCardProps {
  bug: Bug;
  teamMembers: TeamMember[];
  onUpdateBug: (bug: Bug) => void;
}

const BugCard = ({ bug, teamMembers, onUpdateBug }: BugCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const assignedMember = teamMembers.find(member => member.id === bug.assignee);
  
  const statusColors = {
    open: 'bg-red-100 text-red-800 border-red-200',
    'in-progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    done: 'bg-green-100 text-green-800 border-green-200'
  };

  const handleStatusChange = (newStatus: Bug['status']) => {
    onUpdateBug({ ...bug, status: newStatus });
  };

  const handleAssigneeChange = (newAssignee: string) => {
    onUpdateBug({ ...bug, assignee: newAssignee });
    setIsEditing(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-gray-900 line-clamp-2 flex-1 mr-2">
            {bug.title}
          </h3>
          <div className="flex items-center gap-2">
            <Select value={bug.status} onValueChange={handleStatusChange}>
              <SelectTrigger className={`text-xs px-2 py-1 h-auto border ${statusColors[bug.status]}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isEditing ? (
              <Select value={bug.assignee} onValueChange={handleAssigneeChange}>
                <SelectTrigger className="w-32 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white font-medium">
                          {member.avatar}
                        </div>
                        {member.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900 transition-colors"
              >
                {assignedMember ? (
                  <>
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white font-medium">
                      {assignedMember.avatar}
                    </div>
                    {assignedMember.name}
                  </>
                ) : (
                  <>
                    <User size={16} />
                    Unassigned
                  </>
                )}
              </button>
            )}
          </div>
          
          <span className="text-xs text-gray-500">
            {formatDate(bug.createdAt)}
          </span>
        </div>

        {bug.description && (
          <div className="mt-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs text-gray-600 hover:text-gray-900 p-0 h-auto font-normal"
            >
              <ChevronDown 
                size={14} 
                className={`mr-1 transition-transform ${showDetails ? 'rotate-180' : ''}`} 
              />
              {showDetails ? 'Hide details' : 'Show details'}
            </Button>
            
            {showDetails && (
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                {bug.description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BugCard;
