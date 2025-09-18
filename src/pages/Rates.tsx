import { useState } from "react";
import { Search, Filter, MapPin, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample rates data for Indian cities
const sampleRates = [
  // Paper Category
  { id: 1, material: "Newspaper", category: "Paper", rate: 8, unit: "kg", city: "Mumbai", lastUpdated: "2024-01-15" },
  { id: 2, material: "Cardboard", category: "Paper", rate: 6, unit: "kg", city: "Mumbai", lastUpdated: "2024-01-15" },
  { id: 3, material: "Office Paper", category: "Paper", rate: 10, unit: "kg", city: "Delhi", lastUpdated: "2024-01-14" },
  { id: 4, material: "Books", category: "Paper", rate: 7, unit: "kg", city: "Bangalore", lastUpdated: "2024-01-14" },
  
  // Metals Category  
  { id: 5, material: "Aluminum", category: "Metals", rate: 120, unit: "kg", city: "Mumbai", lastUpdated: "2024-01-15" },
  { id: 6, material: "Steel", category: "Metals", rate: 25, unit: "kg", city: "Chennai", lastUpdated: "2024-01-13" },
  { id: 7, material: "Copper", category: "Metals", rate: 450, unit: "kg", city: "Hyderabad", lastUpdated: "2024-01-15" },
  { id: 8, material: "Brass", category: "Metals", rate: 280, unit: "kg", city: "Pune", lastUpdated: "2024-01-14" },
  
  // Plastics Category
  { id: 9, material: "PET Bottles", category: "Plastics", rate: 15, unit: "kg", city: "Mumbai", lastUpdated: "2024-01-15" },
  { id: 10, material: "HDPE Containers", category: "Plastics", rate: 18, unit: "kg", city: "Delhi", lastUpdated: "2024-01-14" },
  { id: 11, material: "PP Containers", category: "Plastics", rate: 12, unit: "kg", city: "Kolkata", lastUpdated: "2024-01-13" },
  
  // E-waste Category
  { id: 12, material: "Mobile Phones", category: "E-waste", rate: 150, unit: "piece", city: "Bangalore", lastUpdated: "2024-01-14" },
  { id: 13, material: "Laptops", category: "E-waste", rate: 500, unit: "piece", city: "Mumbai", lastUpdated: "2024-01-15" },
  { id: 14, material: "CRT Monitors", category: "E-waste", rate: 50, unit: "piece", city: "Ahmedabad", lastUpdated: "2024-01-12" },
  
  // Glass Category
  { id: 15, material: "Glass Bottles", category: "Glass", rate: 3, unit: "kg", city: "Chennai", lastUpdated: "2024-01-13" },
  { id: 16, material: "Glass Containers", category: "Glass", rate: 4, unit: "kg", city: "Hyderabad", lastUpdated: "2024-01-14" },
  
  // Textiles Category
  { id: 17, material: "Cotton Clothes", category: "Textiles", rate: 8, unit: "kg", city: "Mumbai", lastUpdated: "2024-01-15" },
  { id: 18, material: "Shoes", category: "Textiles", rate: 15, unit: "kg", city: "Delhi", lastUpdated: "2024-01-14" },
];

const Rates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [sortBy, setSortBy] = useState("material");

  const categories = ["All", "Paper", "Metals", "Plastics", "E-waste", "Glass", "Textiles"];
  const cities = ["All", "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Ahmedabad"];

  const filteredRates = sampleRates
    .filter(rate => {
      const matchesSearch = rate.material.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || selectedCategory === "All" || rate.category === selectedCategory;
      const matchesCity = !selectedCity || selectedCity === "All" || rate.city === selectedCity;
      return matchesSearch && matchesCategory && matchesCity;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rate-high":
          return b.rate - a.rate;
        case "rate-low":
          return a.rate - b.rate;
        case "city":
          return a.city.localeCompare(b.city);
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return a.material.localeCompare(b.material);
      }
    });

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Current Scrap Rates</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Live rates across major Indian cities. Rates are updated daily and vary by location and quantity.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search materials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* City Filter */}
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="material">Material Name</SelectItem>
                <SelectItem value="rate-high">Price (High to Low)</SelectItem>
                <SelectItem value="rate-low">Price (Low to High)</SelectItem>
                <SelectItem value="city">City</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRates.map((rate) => (
            <Card key={rate.id} className="card-elegant hover:border-primary/20 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{rate.material}</CardTitle>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-medium">
                    {rate.category}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">₹{rate.rate}</span>
                    <span className="text-sm text-muted-foreground">per {rate.unit}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{rate.city}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Updated: {new Date(rate.lastUpdated).toLocaleDateString('en-IN')}</span>
                  </div>

                  <Button className="w-full mt-4" variant="outline">
                    Book Pickup
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRates.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria.</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-success/5 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to sell your scrap?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Book a pickup now and get the best rates for your materials. 
            Our verified collectors will come to your doorstep.
          </p>
          <Button className="btn-gradient" size="lg">
            Book Pickup Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Rates;