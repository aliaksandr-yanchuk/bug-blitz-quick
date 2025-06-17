
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Bug, TeamMember } from '@/pages/Index';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface BugCardProps {
  bug: Bug;
  teamMembers: TeamMember[];
  onUpdateBug: (bug: Bug) => void;
}

const BugCard = ({ bug, teamMembers, onUpdateBug }: BugCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const assignedMember = teamMembers.find(member => member.id === bug.assignee);
  
  const statusConfig = {
    open: { variant: 'destructive' as const, label: 'Open' },
    'in-progress': { variant: 'default' as const, label: 'In Progress' },
    done: { variant: 'secondary' as const, label: 'Done' }
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
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-medium text-card-foreground line-clamp-2 flex-1 mr-2">
            {bug.title}
          </h3>
          <Select value={bug.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-auto h-auto p-0 border-0 bg-transparent">
              <Badge variant={statusConfig[bug.status].variant} className="text-xs">
                {statusConfig[bug.status].label}
              </Badge>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between mb-3">
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
                        <Avatar className="w-4 h-4">
                          <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {member.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {assignedMember ? (
                  <>
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                        {assignedMember.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {assignedMember.name}
                  </>
                ) : (
                  <>
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-muted text-muted-foreground">
                        ?
                      </AvatarFallback>
                    </Avatar>
                    Unassigned
                  </>
                )}
              </button>
            )}
          </div>
          
          <span className="text-xs text-muted-foreground">
            {formatDate(bug.createdAt)}
          </span>
        </div>

        {bug.description && (
          <div className="pt-2 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs text-muted-foreground hover:text-foreground p-0 h-auto font-normal"
            >
              <ChevronDown 
                size={14} 
                className={`mr-1 transition-transform ${showDetails ? 'rotate-180' : ''}`} 
              />
              {showDetails ? 'Hide details' : 'Show details'}
            </Button>
            
            {showDetails && (
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {bug.description}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BugCard;
