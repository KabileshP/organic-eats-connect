import React, { useState } from 'react';
import { mockApi } from '@/services/mockApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const PartnerFarmer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    farmName: '',
    farmLocation: '',
    farmSize: '',
    experience: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await mockApi.submitPartnerApplication(formData);
      if (response.success) {
        toast.success('Application submitted successfully! We will review it and get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          farmName: '',
          farmLocation: '',
          farmSize: '',
          experience: '',
          description: ''
        });
      } else {
        toast.error('Failed to submit application. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex items-center justify-center">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Become a Partner Farmer</CardTitle>
          <CardDescription>
            Fill out the form below to apply for a partnership.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Your Phone Number"
                required
              />
            </div>
            <div>
              <Label htmlFor="farmName">Farm Name</Label>
              <Input
                type="text"
                id="farmName"
                name="farmName"
                value={formData.farmName}
                onChange={handleInputChange}
                placeholder="Your Farm Name"
                required
              />
            </div>
            <div>
              <Label htmlFor="farmLocation">Farm Location</Label>
              <Input
                type="text"
                id="farmLocation"
                name="farmLocation"
                value={formData.farmLocation}
                onChange={handleInputChange}
                placeholder="Your Farm Location"
                required
              />
            </div>
            <div>
              <Label htmlFor="farmSize">Farm Size</Label>
              <Input
                type="text"
                id="farmSize"
                name="farmSize"
                value={formData.farmSize}
                onChange={handleInputChange}
                placeholder="Acres or Hectares"
                required
              />
            </div>
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                type="text"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="Years of Farming Experience"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Farm Description</Label>
              <Input
                as="textarea"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Tell us about your farm and practices"
                rows={4}
                required
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerFarmer;
