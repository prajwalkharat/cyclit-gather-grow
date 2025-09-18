import { useState } from "react";
import { ChevronRight, MapPin, Package, Clock, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const BookPickup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    address: {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      pincode: "",
      city: "",
    },
    materials: [],
    timeSlot: "",
    instructions: "",
  });

  const steps = [
    { number: 1, title: "Address Details", icon: MapPin },
    { number: 2, title: "Material Selection", icon: Package },
    { number: 3, title: "Time Slot", icon: Clock },
    { number: 4, title: "Contact Info", icon: Phone },
    { number: 5, title: "Confirmation", icon: CheckCircle },
  ];

  const materialCategories = [
    {
      category: "Paper",
      items: [
        { name: "Newspaper", rate: 8, selected: false, estimatedKg: 0 },
        { name: "Cardboard", rate: 6, selected: false, estimatedKg: 0 },
        { name: "Office Paper", rate: 10, selected: false, estimatedKg: 0 },
        { name: "Books", rate: 7, selected: false, estimatedKg: 0 },
      ]
    },
    {
      category: "Metals",
      items: [
        { name: "Aluminum", rate: 120, selected: false, estimatedKg: 0 },
        { name: "Steel", rate: 25, selected: false, estimatedKg: 0 },
        { name: "Copper", rate: 450, selected: false, estimatedKg: 0 },
      ]
    },
    {
      category: "Plastics",
      items: [
        { name: "PET Bottles", rate: 15, selected: false, estimatedKg: 0 },
        { name: "HDPE Containers", rate: 18, selected: false, estimatedKg: 0 },
        { name: "PP Containers", rate: 12, selected: false, estimatedKg: 0 },
      ]
    },
    {
      category: "E-waste",
      items: [
        { name: "Mobile Phones", rate: 150, selected: false, estimatedKg: 0, unit: "piece" },
        { name: "Laptops", rate: 500, selected: false, estimatedKg: 0, unit: "piece" },
      ]
    }
  ];

  const timeSlots = [
    "9:00 AM - 11:00 AM",
    "11:00 AM - 1:00 PM", 
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
    "6:00 PM - 8:00 PM"
  ];

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
            currentStep >= step.number 
              ? 'bg-primary text-primary-foreground border-primary' 
              : 'bg-background text-muted-foreground border-border'
          }`}>
            <step.icon className="h-5 w-5" />
          </div>
          <div className="ml-3 hidden sm:block">
            <p className={`text-sm font-medium ${
              currentStep >= step.number ? 'text-primary' : 'text-muted-foreground'
            }`}>
              Step {step.number}
            </p>
            <p className={`text-xs ${
              currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {step.title}
            </p>
          </div>
          {index < steps.length - 1 && (
            <ChevronRight className="h-5 w-5 text-muted-foreground mx-4 hidden sm:block" />
          )}
        </div>
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Pickup Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="Enter your full name" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+91 98765 43210" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div>
                <Label htmlFor="address">Complete Address</Label>
                <Textarea id="address" placeholder="House/Flat no, Building name, Street, Area" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input id="pincode" placeholder="400001" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Mumbai" />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Select Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {materialCategories.map((category) => (
                  <div key={category.category}>
                    <h3 className="text-lg font-semibold mb-3">{category.category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Checkbox />
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">₹{item.rate} per {item.unit || 'kg'}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Input 
                              type="number" 
                              placeholder="0" 
                              className="w-16 text-center"
                              min="0"
                            />
                            <span className="text-sm text-muted-foreground">{item.unit || 'kg'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Select Time Slot</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Date Selection */}
                <div>
                  <Label>Preferred Date</Label>
                  <div className="grid grid-cols-7 gap-2 mt-2">
                    {Array.from({ length: 7 }, (_, i) => {
                      const date = new Date();
                      date.setDate(date.getDate() + i);
                      return (
                        <Button
                          key={i}
                          variant="outline"
                          className="p-3 h-auto flex flex-col"
                        >
                          <span className="text-xs">{date.toLocaleDateString('en-IN', { weekday: 'short' })}</span>
                          <span className="text-sm font-semibold">{date.getDate()}</span>
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slot Selection */}
                <div>
                  <Label>Available Time Slots</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    {timeSlots.map((slot, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start p-4 h-auto"
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Contact Preferences & Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                <Textarea 
                  id="instructions" 
                  placeholder="Any specific instructions for the collector? e.g., Call before arrival, Building entry requirements, etc."
                  rows={4}
                />
              </div>

              <div className="space-y-3">
                <Label>Preferred Contact Method</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sms" />
                    <Label htmlFor="sms">SMS Updates</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="call" />
                    <Label htmlFor="call">Phone Call Updates</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="whatsapp" />
                    <Label htmlFor="whatsapp">WhatsApp Updates</Label>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Pickup Guidelines</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Clean and segregated materials get better rates</li>
                  <li>• Our collector will weigh materials in front of you</li>
                  <li>• Payment will be made immediately after weighing</li>
                  <li>• Minimum pickup value: ₹50</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl text-primary">Booking Confirmed!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="bg-success/10 p-6 rounded-lg">
                <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Order ID: #CYC001234</h3>
                <p className="text-muted-foreground">Your pickup has been scheduled successfully</p>
              </div>

              <div className="text-left space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Pickup Date</p>
                    <p className="font-medium">Tomorrow, Jan 16</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time Slot</p>
                    <p className="font-medium">10:00 AM - 12:00 PM</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Value</p>
                    <p className="font-medium text-primary">₹245</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Collector</p>
                    <p className="font-medium">Will be assigned soon</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" className="flex-1">Track Order</Button>
                <Button className="flex-1 btn-gradient">Book Another Pickup</Button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Book Your Pickup</h1>
          <p className="text-xl text-muted-foreground">
            Schedule a convenient time for our verified collectors to pick up your scrap
          </p>
        </div>

        <StepIndicator />

        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep < 5 ? (
            <Button 
              onClick={nextStep}
              className="btn-gradient"
            >
              Next Step
            </Button>
          ) : (
            <Button className="btn-gradient">
              Book Another Pickup
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookPickup;