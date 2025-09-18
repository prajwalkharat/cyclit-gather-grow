import { useState, useEffect } from "react";
import { Recycle, TreePine, Zap, Users, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Sample impact data
const impactMetrics = [
  {
    icon: Recycle,
    title: "Total Scrap Recycled",
    value: 2345,
    unit: "Tonnes",
    increase: "+23%",
    description: "Materials diverted from landfills"
  },
  {
    icon: TreePine,
    title: "Trees Saved",
    value: 12890,
    unit: "Trees",
    increase: "+18%",
    description: "Equivalent paper and cardboard recycling"
  },
  {
    icon: Zap,
    title: "CO₂ Emissions Saved",
    value: 4567,
    unit: "Tonnes",
    increase: "+31%",
    description: "Reduced carbon footprint"
  },
  {
    icon: Users,
    title: "Active Users",
    value: 45678,
    unit: "Users",
    increase: "+45%",
    description: "Households and businesses"
  }
];

const cityData = [
  { city: "Mumbai", recycled: 578, co2Saved: 1234 },
  { city: "Delhi", recycled: 432, co2Saved: 987 },
  { city: "Bangalore", recycled: 345, co2Saved: 789 },
  { city: "Chennai", recycled: 289, co2Saved: 654 },
  { city: "Hyderabad", recycled: 234, co2Saved: 567 },
  { city: "Pune", recycled: 198, co2Saved: 456 },
  { city: "Kolkata", recycled: 156, co2Saved: 345 },
  { city: "Ahmedabad", recycled: 113, co2Saved: 289 },
];

const CountUp = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [end, duration]);

  return <span>{count.toLocaleString('en-IN')}</span>;
};

const Impact = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">Our Environmental Impact</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Together, we're creating a sustainable future. See how our collective efforts are making a real difference 
            in reducing waste and protecting our environment.
          </p>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {impactMetrics.map((metric, index) => (
            <Card key={index} className="card-elegant text-center">
              <CardHeader className="pb-3">
                <div className="mx-auto mb-3 p-3 bg-primary/10 rounded-full w-fit">
                  <metric.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">{metric.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">
                    <CountUp end={metric.value} />
                    <span className="text-lg ml-1">{metric.unit}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-success text-sm font-medium">{metric.increase}</span>
                    <TrendingUp className="h-4 w-4 text-success" />
                  </div>
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* City-wise Impact */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">City-wise Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cityData.map((city, index) => (
                <div key={index} className="bg-muted p-6 rounded-lg text-center">
                  <h3 className="text-lg font-semibold mb-3">{city.city}</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-2xl font-bold text-primary">{city.recycled}</p>
                      <p className="text-sm text-muted-foreground">Tonnes Recycled</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-success">{city.co2Saved}</p>
                      <p className="text-sm text-muted-foreground">Tonnes CO₂ Saved</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Environmental Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Recycle className="h-6 w-6 text-primary" />
                <span>Circular Economy Benefits</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Waste Diverted from Landfills</span>
                  <strong className="text-primary">94%</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span>Materials Returned to Production</span>
                  <strong className="text-primary">87%</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span>Resource Conservation</span>
                  <strong className="text-primary">92%</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span>Energy Savings</span>
                  <strong className="text-primary">78%</strong>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-primary" />
                <span>Recognition & Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Award className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium">Best Waste Management Platform 2024</p>
                    <p className="text-sm text-muted-foreground">Government of India Recognition</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium">Green Innovation Award</p>
                    <p className="text-sm text-muted-foreground">CII Environmental Excellence</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium">Sustainable Business Leader</p>
                    <p className="text-sm text-muted-foreground">FICCI Sustainability Awards</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How You Can Help */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Join Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Every piece of scrap you recycle through Cyclit contributes to a cleaner, more sustainable India. 
              Together, we can build a circular economy that benefits everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-gradient" size="lg">
                Book Your First Pickup
              </Button>
              <Button variant="outline" size="lg">
                Learn More About Recycling
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Impact;