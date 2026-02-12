import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {/* <Shield className="h-8 w-8 text-primary" /> */}
              <span className="text-xl font-bold text-foreground">StrayShield</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Protecting India's 30 million street dogs through AI-powered welfare solutions. 
              Building a more compassionate world, one dog at a time.
            </p>
            <div className="flex space-x-3">
              <button className="p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                {/* <Twitter className="h-4 w-4 text-muted-foreground" /> */}
              </button>
              <button className="p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                {/* <Github className="h-4 w-4 text-muted-foreground" /> */}
              </button>
              <button className="p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                {/* <Linkedin className="h-4 w-4 text-muted-foreground" /> */}
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Report a Dog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">View Map</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">For NGOs</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Volunteer</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Success Stories</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">API Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Dog Care Guide</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Emergency Contacts</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Training Materials</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                {/* <Mail className="h-4 w-4 text-primary" /> */}
                <span className="text-muted-foreground">help@strayshield.org</span>
              </div>
              <div className="flex items-center space-x-2">
                {/* <Phone className="h-4 w-4 text-primary" /> */}
                <span className="text-muted-foreground">+91 1234 567 890</span>
              </div>
              <div className="flex items-center space-x-2">
                {/* <MapPin className="h-4 w-4 text-primary" /> */}
                <span className="text-muted-foreground">New Delhi, India</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-accent rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                {/* <Heart className="h-4 w-4 text-primary" /> */}
                <span className="text-sm font-semibold text-foreground">Emergency Helpline</span>
              </div>
              <p className="text-xs text-muted-foreground">
                For immediate animal emergency: <br />
                <span className="font-semibold text-foreground">1800-XXX-XXXX</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 StrayShield. All rights reserved. Made with ❤️ for India's street dogs.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer