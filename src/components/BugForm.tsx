
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Report New Bug</h2>
        <p className="text-sm text-gray-500">Fill out the details below to log a new bug</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Bug Title *
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Brief description of the bug..."
            className="w-full"
            autoFocus
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide more details about the bug, steps to reproduce, expected vs actual behavior..."
            className="w-full min-h-[100px]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assign to *
          </label>
          <Select value={assignee} onValueChange={setAssignee}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select team member..." />
            </SelectTrigger>
            <SelectContent>
              {teamMembers.map((member) => (
                <SelectItem key={member.id} value={member.id}>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white font-medium">
                      {member.avatar}
                    </div>
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
            className="bg-red-600 hover:bg-red-700 text-white px-8"
          >
            Create Bug
          </Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={onCancel}
            className="px-8"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BugForm;
