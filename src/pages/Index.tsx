import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle, CheckCircle, Star, Phone, Package, DollarSign, Users, TrendingUp, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-banner.jpg";

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
        {/* Premium Background with Multiple Layers */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          {/* Gradient Overlays for Premium Look */}
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-primary/10" />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary-glow/10" />
          
          {/* Animated Floating Elements */}
          <div className="absolute top-20 left-10 w-8 h-8 bg-primary-glow/20 rounded-full animate-float" style={{ animationDelay: '0s' }} />
          <div className="absolute top-40 right-20 w-6 h-6 bg-primary-accent/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-40 left-20 w-4 h-4 bg-success/40 rounded-full animate-float" style={{ animationDelay: '4s' }} />
          <div className="absolute top-60 right-40 w-5 h-5 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        </div>
        
        {/* Hero Content with Premium Styling */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="hero-fade-in">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight">
              Turning <span className="text-gradient-premium animate-shimmer">Waste</span> into{" "}
              <span className="text-metallic">Worth</span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 max-w-4xl mx-auto hero-slide-up leading-relaxed">
              India's most trusted premium scrap collection marketplace. Experience doorstep pickup with{" "}
              <span className="text-primary-glow font-semibold">fair rates</span> and contribute to a{" "}
              <span className="text-gradient">sustainable circular economy</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center hero-slide-up">
              <Link to="/book-pickup">
                <Button size="lg" className="btn-premium text-lg px-10 py-5 h-auto animate-premium-glow shadow-2xl">
                  Book Premium Pickup
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link to="/rates">
                <Button size="lg" className="glass-card text-lg px-10 py-5 h-auto hover-lift">
                  <PlayCircle className="mr-3 h-6 w-6" />
                  Explore Premium Rates
                </Button>
              </Link>
            </div>
            
            {/* Premium Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 hero-slide-up opacity-80">
              <div className="flex items-center gap-3 glass-card px-6 py-3 rounded-full">
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="text-sm font-medium">Verified Collectors</span>
              </div>
              <div className="flex items-center gap-3 glass-card px-6 py-3 rounded-full">
                <Star className="h-5 w-5 text-primary-accent fill-current" />
                <span className="text-sm font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-3 glass-card px-6 py-3 rounded-full">
                <Users className="h-5 w-5 text-primary-glow" />
                <span className="text-sm font-medium">50K+ Customers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="glass-card p-4 rounded-full">
            <div className="w-6 h-10 border-2 border-primary-glow rounded-full flex justify-center relative overflow-hidden">
              <div className="w-1 h-3 bg-gradient-to-b from-primary-glow to-primary rounded-full mt-2 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-glow/20 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-br from-muted/20 via-background to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-foreground mb-6 text-gradient-premium">How Cyclit Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience our premium, transparent, and rewarding process. Get started in just 3 elegant steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, index) => (
              <Card key={index} className="card-premium text-center relative group overflow-hidden">
                <CardContent className="p-10">
                  {/* Premium Icon Container */}
                  <div className="mx-auto mb-8 p-6 bg-gradient-to-br from-primary/10 to-primary-glow/10 rounded-full w-fit relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
                    <step.icon className="h-10 w-10 text-primary-glow relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-glow/20 to-primary/20 rounded-full animate-pulse" />
                  </div>
                  
                  {/* Premium Step Number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-primary-accent to-primary-glow text-white rounded-full flex items-center justify-center font-bold text-lg shadow-metallic">
                    {step.step}
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-4 text-gradient">{step.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{step.description}</p>
                  
                  {/* Decorative Elements */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary-glow to-primary-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Material Categories Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-20 h-20 border border-primary rounded-full animate-morph-transform" />
          <div className="absolute bottom-32 right-20 w-16 h-16 border border-primary-glow rounded-full animate-morph-transform" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-foreground mb-6">
              Premium <span className="text-metallic">Material Collection</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We accept a premium range of materials with competitive rates across all categories. 
              Experience the difference with our professional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {materialCategories.map((category, index) => (
              <Card key={index} className="glass-card group cursor-pointer hover-lift relative overflow-hidden">
                <CardContent className="p-8">
                  {/* Premium Category Header */}
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="text-4xl p-4 bg-gradient-to-br from-primary/10 to-primary-glow/10 rounded-2xl group-hover:scale-110 transition-transform duration-500 animate-material-float">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gradient mb-2">{category.name}</h3>
                      <p className="text-primary-accent font-bold text-lg">{category.rate}</p>
                    </div>
                  </div>
                  
                  {/* Premium Item List */}
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-3 group/item">
                        <CheckCircle className="h-5 w-5 text-success group-hover/item:scale-110 transition-transform" />
                        <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Premium Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-premium transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/rates">
              <Button className="btn-premium" size="lg">
                View All Premium Rates
                <ArrowRight className="ml-3 h-5 w-5" />
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