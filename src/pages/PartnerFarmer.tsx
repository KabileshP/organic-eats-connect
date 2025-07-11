
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Leaf, Users, Award, MapPin, Phone, Mail } from 'lucide-react';
import { mockApi } from '@/services/mockApi';
import { toast } from '@/hooks/use-toast';

const PartnerFarmer = () => {
  const [formData, setFormData] = useState({
    name: '',
    farmName: '',
    location: '',
    specialty: '',
    years: '',
    email: '',
    phone: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await mockApi.sendContactMessage({
        type: 'partner_application',
        ...formData
      });
      
      if (result.success) {
        toast({
          title: "Application Submitted!",
          description: "Thank you for your interest! We'll contact you within 24 hours.",
        });
        setFormData({
          name: '',
          farmName: '',
          location: '',
          specialty: '',
          years: '',
          email: '',
          phone: '',
          description: ''
        });
      }
    } catch (error) {
      console.error('Partner application error:', error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Become a Partner Farmer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our community of organic farmers and connect directly with customers who value fresh, sustainable produce
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <Users className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Direct Customer Connection</h3>
              <p className="text-gray-600">
                Build relationships with customers who appreciate your dedication to organic farming. 
                No middlemen, better profits for you.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <Award className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Pricing</h3>
              <p className="text-gray-600">
                Get fair prices for your quality produce. Our customers understand and pay for 
                the value of organic, locally-grown food.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Partner Application Form</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmName">Farm Name *</Label>
                  <Input
                    id="farmName"
                    name="farmName"
                    value={formData.farmName}
                    onChange={handleInputChange}
                    required
                    placeholder="Your farm's name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      placeholder="City, State"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="years">Years of Experience *</Label>
                  <Input
                    id="years"
                    name="years"
                    type="number"
                    value={formData.years}
                    onChange={handleInputChange}
                    required
                    placeholder="Years farming"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty/Main Crops *</Label>
                <Input
                  id="specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Heirloom Vegetables, Leafy Greens"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="(555) 123-4567"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Tell us about your farm</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your farming practices, certifications, and what makes your farm special..."
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? 'Submitting Application...' : 'Submit Partnership Application'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerFarmer;
