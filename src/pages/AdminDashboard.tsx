
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockApi } from '@/services/mockApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Check, X, Eye, LogOut, Users, Calendar, MapPin, Phone, Mail } from 'lucide-react';

interface Application {
  id: number;
  name: string;
  email: string;
  phone: string;
  farmName: string;
  farmLocation: string;
  farmSize: string;
  experience: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
}

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const queryClient = useQueryClient();

  // Fetch applications
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['partnerApplications'],
    queryFn: mockApi.getPartnerApplications,
    enabled: isLoggedIn
  });

  // Approve application mutation
  const approveMutation = useMutation({
    mutationFn: mockApi.approvePartnerApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partnerApplications'] });
      toast.success('Application approved successfully!');
    },
    onError: () => {
      toast.error('Failed to approve application');
    }
  });

  // Reject application mutation
  const rejectMutation = useMutation({
    mutationFn: mockApi.rejectPartnerApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partnerApplications'] });
      toast.success('Application rejected');
    },
    onError: () => {
      toast.error('Failed to reject application');
    }
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await mockApi.adminLogin(loginData.email, loginData.password);
      if (response.success) {
        setIsLoggedIn(true);
        toast.success('Welcome to Admin Dashboard!');
      } else {
        toast.error(response.error || 'Login failed');
      }
    } catch (error) {
      toast.error('Login failed');
    }
  };

  const handleLogout = async () => {
    await mockApi.adminLogout();
    setIsLoggedIn(false);
    toast.success('Logged out successfully');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Login form
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-green-800">Admin Login</CardTitle>
            <CardDescription>Access the partner management dashboard</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="admin@farmfresh.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="admin123"
                  required
                />
              </div>
              <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                <strong>Demo Credentials:</strong><br />
                Email: admin@farmfresh.com<br />
                Password: admin123
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Login to Dashboard
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  // Dashboard content
  const pendingCount = applications.filter(app => app.status === 'pending').length;
  const approvedCount = applications.filter(app => app.status === 'approved').length;
  const rejectedCount = applications.filter(app => app.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Calendar className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <Check className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <X className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>Partner Applications</CardTitle>
            <CardDescription>Manage farmer partnership applications</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-center py-4">Loading applications...</p>
            ) : applications.length === 0 ? (
              <p className="text-center py-4">No applications found</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Farm</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{application.name}</div>
                          <div className="text-sm text-gray-500">{application.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{application.farmName}</div>
                          <div className="text-sm text-gray-500">{application.farmSize}</div>
                        </div>
                      </TableCell>
                      <TableCell>{application.farmLocation}</TableCell>
                      <TableCell>{formatDate(application.appliedAt)}</TableCell>
                      <TableCell>{getStatusBadge(application.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Application Details</DialogTitle>
                                <DialogDescription>
                                  Review the farmer's application information
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Farmer Name</Label>
                                    <p className="text-sm">{application.name}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Farm Name</Label>
                                    <p className="text-sm">{application.farmName}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium flex items-center gap-1">
                                      <Mail className="h-3 w-3" />
                                      Email
                                    </Label>
                                    <p className="text-sm">{application.email}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium flex items-center gap-1">
                                      <Phone className="h-3 w-3" />
                                      Phone
                                    </Label>
                                    <p className="text-sm">{application.phone}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      Location
                                    </Label>
                                    <p className="text-sm">{application.farmLocation}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Farm Size</Label>
                                    <p className="text-sm">{application.farmSize}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Experience</Label>
                                    <p className="text-sm">{application.experience}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Status</Label>
                                    <div className="mt-1">{getStatusBadge(application.status)}</div>
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Description</Label>
                                  <p className="text-sm mt-1">{application.description}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          {application.status === 'pending' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-600 hover:text-green-700"
                                onClick={() => approveMutation.mutate(application.id)}
                                disabled={approveMutation.isPending}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => rejectMutation.mutate(application.id)}
                                disabled={rejectMutation.isPending}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
