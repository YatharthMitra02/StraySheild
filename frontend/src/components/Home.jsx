import React from 'react'

const Home = () => {
  return (
    <section className="pt-16 min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            
            
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Protecting India's{' '}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  30 Million
                </span>{' '}
                Street Dogs
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                StrayShield uses AI to identify, track, and coordinate rescue efforts for street dogs across India. 
                Report a dog, get instant health analysis, and connect with local NGOs and volunteers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button size="lg" className="bg-gradient-hero text-primary-foreground hover:opacity-90 transition-opacity shadow-warm">
                
                Report a Dog
              </button>
              <button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                
                View Map
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Dogs Helped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">NGO Partners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">AI Accuracy</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-warm">
              <img 
                
                alt="Veterinarian caring for a street dog" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-card border">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                <span className="text-sm font-medium">AI Analysis Complete</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Dog appears healthy, vaccination recommended</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home