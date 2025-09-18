import { Link } from "react-router-dom";
import { Recycle, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Recycle className="h-8 w-8 text-primary" />
              <div>
                <h3 className="text-xl font-bold">Cyclit</h3>
                <p className="text-sm text-muted-foreground">Turning Waste into Worth</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              India's most trusted scrap collection marketplace. We connect households and businesses 
              with verified collectors for seamless waste management and sustainable recycling.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/rates" className="text-sm text-muted-foreground hover:text-primary transition-colors">Current Rates</Link></li>
              <li><Link to="/book-pickup" className="text-sm text-muted-foreground hover:text-primary transition-colors">Book Pickup</Link></li>
              <li><Link to="/track-order" className="text-sm text-muted-foreground hover:text-primary transition-colors">Track Order</Link></li>
              <li><Link to="/impact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Environmental Impact</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Paper & Cardboard</li>
              <li className="text-sm text-muted-foreground">Metals & Aluminum</li>
              <li className="text-sm text-muted-foreground">Plastics & Bottles</li>
              <li className="text-sm text-muted-foreground">E-waste Disposal</li>
              <li className="text-sm text-muted-foreground">Glass Collection</li>
              <li className="text-sm text-muted-foreground">Textile Recycling</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">support@cyclit.in</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  Available in Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, Kolkata, Ahmedabad
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Cyclit. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;