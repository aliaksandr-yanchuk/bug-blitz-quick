
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bug, TeamMember } from '@/pages/Index';

interface BugFormProps {
  onSubmit: (bug: Omit<Bug, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  teamMembers: TeamMember[];
}

const BugForm = ({ onSubmit, onCancel, teamMembers }: BugFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !assignee) return;
    
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      status: 'open',
      assignee
    });
    
    setTitle('');
    setDescription('');
    setAssignee('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report New Bug</CardTitle>
        <CardDescription>Fill out the details below to log a new bug</CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-foreground">
              Bug Title *
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief description of the bug..."
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-foreground">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide more details about the bug, steps to reproduce, expected vs actual behavior..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Assign to *
            </label>
            <Select value={assignee} onValueChange={setAssignee}>
              <SelectTrigger>
                <SelectValue placeholder="Select team member..." />
              </SelectTrigger>
              <SelectContent>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
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
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit"
              disabled={!title.trim() || !assignee}
              variant="destructive"
            >
              Create Bug
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BugForm;
