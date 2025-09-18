import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      details: "+91 98765 43210",
      subtext: "Available 24/7 for urgent queries",
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email Support",
      details: "support@cyclit.in",
      subtext: "We'll respond within 2 hours",
      action: "Send Email"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Support",
      details: "+91 98765 43210",
      subtext: "Quick support via WhatsApp",
      action: "Chat Now"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "24/7 Service",
      subtext: "Customer support available round the clock",
      action: null
    }
  ];

  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", 
    "Hyderabad", "Pune", "Kolkata", "Ahmedabad"
  ];

  const subjects = [
    "Pickup Request",
    "Rate Inquiry", 
    "Order Issue",
    "Technical Support",
    "Partnership",
    "Feedback",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our scrap collection service? We're here to help! 
            Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{info.title}</h3>
                      <p className="text-primary font-medium">{info.details}</p>
                      <p className="text-sm text-muted-foreground">{info.subtext}</p>
                      {info.action && (
                        <Button variant="outline" size="sm" className="mt-2">
                          {info.action}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Service Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Service Areas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {cities.map((city, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      • {city}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Don't see your city? Contact us to know when we'll be available in your area.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Select value={formData.city} onValueChange={(value) => setFormData({...formData, city: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your city" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map(city => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map(subject => (
                          <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <Button type="submit" className="btn-gradient w-full" size="lg">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="mt-16">
          <CardHeader>
            <CardTitle className="text-center">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">How quickly can you pick up my scrap?</h3>
                <p className="text-sm text-muted-foreground">
                  We typically schedule pickups within 24-48 hours of booking, depending on your location and our collector availability.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What materials do you accept?</h3>
                <p className="text-sm text-muted-foreground">
                  We accept paper, cardboard, metals, plastics, e-waste, glass, and textiles. Check our rates page for the complete list.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is there a minimum quantity required?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, we have a minimum pickup value of ₹50 to ensure economical collection for both parties.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How do you ensure fair pricing?</h3>
                <p className="text-sm text-muted-foreground">
                  All materials are weighed in front of you using calibrated scales, and you receive payment immediately after weighing.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;