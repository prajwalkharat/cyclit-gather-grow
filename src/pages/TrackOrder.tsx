import { useState } from "react";
import { Search, Package, Truck, CheckCircle, DollarSign, Phone, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample order data
const sampleOrder = {
  id: "CYC001234",
  status: "en-route",
  createdAt: "2024-01-15T10:30:00Z",
  scheduledDate: "2024-01-16",
  timeSlot: "10:00 AM - 12:00 PM",
  estimatedValue: 245,
  actualValue: null,
  materials: [
    { name: "Newspaper", quantity: 15, unit: "kg", rate: 8 },
    { name: "Cardboard", quantity: 8, unit: "kg", rate: 6 },
    { name: "PET Bottles", quantity: 5, unit: "kg", rate: 15 },
  ],
  collector: {
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    rating: 4.8,
  },
  address: "A-123, Green Valley Apartments, Sector 12, Mumbai - 400001",
  timeline: [
    {
      status: "booked",
      title: "Pickup Booked",
      description: "Your pickup request has been confirmed",
      timestamp: "2024-01-15T10:30:00Z",
      completed: true,
    },
    {
      status: "confirmed",
      title: "Collector Assigned",
      description: "Rajesh Kumar has been assigned to your pickup",
      timestamp: "2024-01-15T14:15:00Z",
      completed: true,
    },
    {
      status: "en-route",
      title: "Collector En Route",
      description: "Your collector is on the way to your location",
      timestamp: "2024-01-16T09:45:00Z",
      completed: true,
    },
    {
      status: "collected",
      title: "Materials Collected",
      description: "Materials have been picked up and weighed",
      timestamp: null,
      completed: false,
    },
    {
      status: "paid",
      title: "Payment Completed",
      description: "Payment has been processed",
      timestamp: null,
      completed: false,
    },
  ],
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "booked": return "text-blue-600";
    case "confirmed": return "text-yellow-600";
    case "en-route": return "text-orange-600";
    case "collected": return "text-purple-600";
    case "paid": return "text-green-600";
    default: return "text-gray-600";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "booked": return Package;
    case "confirmed": return CheckCircle;
    case "en-route": return Truck;
    case "collected": return Package;
    case "paid": return DollarSign;
    default: return Package;
  }
};

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrackOrder = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (orderId === "CYC001234") {
        setOrderData(sampleOrder);
      } else {
        setOrderData(null);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Track Your Order</h1>
          <p className="text-xl text-muted-foreground">
            Enter your order ID to get real-time updates on your pickup status
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter Order ID (e.g., CYC001234)"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button 
                onClick={handleTrackOrder}
                disabled={!orderId || loading}
                className="btn-gradient"
              >
                {loading ? "Tracking..." : "Track Order"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        {orderData && (
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Order #{orderData.id}</span>
                  <span className={`text-sm px-3 py-1 rounded-full bg-orange-100 ${getStatusColor(orderData.status)}`}>
                    {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1).replace('-', ' ')}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Scheduled Date</p>
                    <p className="font-medium">{new Date(orderData.scheduledDate).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time Slot</p>
                    <p className="font-medium">{orderData.timeSlot}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Value</p>
                    <p className="font-medium text-primary">₹{orderData.estimatedValue}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">Pickup Address</p>
                  <p className="font-medium">{orderData.address}</p>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {orderData.timeline.map((step, index) => {
                    const Icon = getStatusIcon(step.status);
                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                          step.completed 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {step.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                          {step.timestamp && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(step.timestamp).toLocaleString('en-IN')}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Collector Details */}
            {orderData.collector && (
              <Card>
                <CardHeader>
                  <CardTitle>Collector Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{orderData.collector.name}</h3>
                      <p className="text-sm text-muted-foreground">Rating: ⭐ {orderData.collector.rating}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Materials */}
            <Card>
              <CardHeader>
                <CardTitle>Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {orderData.materials.map((material, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{material.name}</p>
                        <p className="text-sm text-muted-foreground">{material.quantity} {material.unit}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{material.rate} per {material.unit}</p>
                        <p className="text-sm text-primary">₹{material.quantity * material.rate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* No Results */}
        {orderId && !orderData && !loading && (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Order not found</h3>
              <p className="text-muted-foreground mb-6">
                Please check your order ID and try again. Order IDs are case-sensitive.
              </p>
              <Button variant="outline">Contact Support</Button>
            </CardContent>
          </Card>
        )}

        {/* Sample Order ID */}
        {!orderData && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Don't have an order yet?</p>
            <Button variant="outline" className="mr-4">Book a Pickup</Button>
            <p className="text-xs text-muted-foreground mt-4">
              For demo purposes, try order ID: <code className="bg-muted px-2 py-1 rounded">CYC001234</code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;