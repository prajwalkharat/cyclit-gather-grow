import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle, CheckCircle, Star, Phone, Package, DollarSign, Users, TrendingUp, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Hero3D from "@/components/Hero3D";

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const howItWorksSteps = [
    {
      step: 1,
      title: "Book Pickup",
      description: "Schedule a convenient time for collection through our app or website",
      icon: Phone,
    },
    {
      step: 2,
      title: "We Collect",
      description: "Our verified collectors arrive at your doorstep to pick up your scrap",
      icon: Package,
    },
    {
      step: 3,
      title: "Get Paid",
      description: "Receive instant payment after materials are weighed and verified",
      icon: DollarSign,
    },
  ];

  const materialCategories = [
    { name: "Paper & Cardboard", rate: "₹6-10/kg", icon: "📄", items: ["Newspaper", "Books", "Cardboard"] },
    { name: "Metals", rate: "₹25-450/kg", icon: "🔧", items: ["Aluminum", "Steel", "Copper"] },
    { name: "Plastics", rate: "₹12-18/kg", icon: "♻️", items: ["PET Bottles", "Containers", "Bags"] },
    { name: "E-waste", rate: "₹50-500/piece", icon: "📱", items: ["Phones", "Laptops", "Components"] },
    { name: "Glass", rate: "₹3-4/kg", icon: "🫙", items: ["Bottles", "Containers", "Windows"] },
    { name: "Textiles", rate: "₹8-15/kg", icon: "👕", items: ["Clothes", "Shoes", "Fabric"] },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "Cyclit made recycling so easy! Their collectors are punctual and the rates are fair. I've earned over ₹2000 in just 3 months.",
      avatar: "PS"
    },
    {
      name: "Raj Patel",
      location: "Delhi",
      rating: 5,
      text: "As a small business owner, Cyclit helps us dispose of packaging waste responsibly while earning money. Excellent service!",
      avatar: "RP"
    },
    {
      name: "Anita Reddy",
      location: "Bangalore",
      rating: 5,
      text: "The app is user-friendly and tracking is transparent. Love how they're contributing to environmental sustainability.",
      avatar: "AR"
    },
  ];

  const impactStats = [
    { label: "Tonnes Recycled", value: 2345, suffix: "T" },
    { label: "CO₂ Saved", value: 4567, suffix: "T" },
    { label: "Trees Saved", value: 12890, suffix: "" },
    { label: "Happy Customers", value: 45678, suffix: "+" },
  ];

  // Counter animation hook
  const useCountUp = (end: number, duration: number = 2000) => {
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

    return count;
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const AnimatedCounter = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
    const count = useCountUp(end);
    return <span>{count.toLocaleString('en-IN')}{suffix}</span>;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5">
          <Hero3D />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="hero-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
              Turning <span className="text-gradient">Waste</span> into <span className="text-gradient">Worth</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto hero-slide-up">
              India's most trusted scrap collection marketplace. Book doorstep pickup, 
              get fair rates, and contribute to a sustainable circular economy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center hero-slide-up">
              <Link to="/book-pickup">
                <Button size="lg" className="btn-gradient text-lg px-8 py-4 h-auto">
                  Book Pickup Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/rates">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 h-auto">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Check Rates
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">How Cyclit Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, transparent, and rewarding. Get started in just 3 easy steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, index) => (
              <Card key={index} className="card-elegant text-center relative">
                <CardContent className="p-8">
                  <div className="mx-auto mb-6 p-4 bg-primary/10 rounded-full w-fit">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Material Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">What We Collect</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We accept a wide range of materials and offer competitive rates across all categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materialCategories.map((category, index) => (
              <Card key={index} className="material-card group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-3xl">{category.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                      <p className="text-primary font-bold">{category.rate}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/rates">
              <Button variant="outline" size="lg">
                View All Rates
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-success/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Environmental Impact</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Together, we're making a real difference in building a sustainable future for India.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 counter-animate">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/impact">
              <Button className="btn-gradient" size="lg">
                View Detailed Impact
                <TrendingUp className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Cyclit for their scrap collection needs.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="card-elegant">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="inline h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl text-foreground mb-6 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonials[currentTestimonial].name}</p>
                    <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-primary' : 'bg-border'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <Recycle className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join the circular economy revolution. Turn your waste into worth today and contribute 
              to a cleaner, more sustainable India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book-pickup">
                <Button size="lg" className="btn-gradient text-lg px-8 py-4 h-auto">
                  Book Your First Pickup
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/rates">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 h-auto">
                  Check Material Rates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;