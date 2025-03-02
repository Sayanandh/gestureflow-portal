
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Upload, Camera, Image, FileVideo } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { usePlatform } from "@/utils/platform";
import { MobileButton, MobileCard } from "@/components/ui/mobile-ui";

const Index = () => {
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { isMobile } = usePlatform();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(isMobile ? "slide-up-mobile" : "animate-slide-up");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      featureRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [isMobile]);

  // Mobile version of the home page
  if (isMobile) {
    return (
      <Layout>
        {/* Hero Section - Mobile Version */}
        <section className="py-8">
          <div className="container px-4">
            <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto slide-up-mobile">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                Sign Language Interpreter
              </div>
              <h1 className="text-2xl font-bold tracking-tight">
                Breaking Barriers with 
                <span className="text-primary ml-1">Sign Language Recognition</span>
              </h1>
              <p className="text-sm text-muted-foreground">
                Upload images, videos, or use your camera for real-time sign language interpretation.
              </p>
              <div className="flex flex-col gap-3 pt-2 w-full">
                <MobileButton asChild size="lg">
                  <Link to="/webcam">
                    Start Live Capture
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </MobileButton>
                <MobileButton asChild variant="outline" size="lg">
                  <Link to="/image-upload">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Media
                  </Link>
                </MobileButton>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Mobile Version */}
        <section className="py-8">
          <div className="container px-4">
            <div className="grid grid-cols-1 gap-4">
              {/* Mobile Feature Cards */}
              <FeatureMobileCard
                to="/image-upload"
                icon={<Image className="h-6 w-6" />}
                title="Image Upload"
                description="Upload images for interpretation"
                delay={0}
              />
              
              <FeatureMobileCard
                to="/video-upload"
                icon={<FileVideo className="h-6 w-6" />}
                title="Video Upload"
                description="Upload videos for analysis"
                delay={100}
              />
              
              <FeatureMobileCard
                to="/webcam"
                icon={<Camera className="h-6 w-6" />}
                title="Live Capture"
                description="Use camera for real-time recognition"
                delay={200}
              />
            </div>
          </div>
        </section>

        {/* How It Works Section - Mobile Version */}
        <section className="py-8 bg-muted/30">
          <div className="container px-4">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold">How It Works</h2>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="flex items-start p-4 bg-card rounded-xl shadow-sm border border-border/10 slide-up-mobile"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="h-8 w-8 bg-primary/10 text-primary flex items-center justify-center rounded-full mr-4 flex-shrink-0">
                    <span className="font-medium text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-1">{step.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // Web version (original UI)
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto animate-fade-in">
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Sign Language Interpretation
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Breaking Barriers with 
              <span className="text-primary ml-2">Sign Language Recognition</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Upload images, videos, or use your camera for real-time sign language interpretation and bridge communication gaps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link to="/webcam">
                  Start Live Capture
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                <Link to="/image-upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Media
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Multiple Input Methods</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the method that works best for you to interpret sign language.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Image Upload Feature */}
            <div 
              ref={(el) => (featureRefs.current[0] = el)}
              className="bg-card rounded-xl shadow-soft p-6 opacity-0 translate-y-10 transition-all duration-500 ease-out"
            >
              <div className="h-12 w-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg mb-5">
                <Image className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Image Upload</h3>
              <p className="text-muted-foreground mb-5">
                Upload images containing sign language gestures for instant interpretation.
              </p>
              <Button asChild variant="ghost" className="group">
                <Link to="/image-upload" className="flex items-center">
                  Try Image Upload
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Video Upload Feature */}
            <div 
              ref={(el) => (featureRefs.current[1] = el)}
              className="bg-card rounded-xl shadow-soft p-6 opacity-0 translate-y-10 transition-all duration-500 ease-out"
              style={{ transitionDelay: "150ms" }}
            >
              <div className="h-12 w-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg mb-5">
                <FileVideo className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Video Upload</h3>
              <p className="text-muted-foreground mb-5">
                Upload videos for continuous sign language interpretation and analysis.
              </p>
              <Button asChild variant="ghost" className="group">
                <Link to="/video-upload" className="flex items-center">
                  Try Video Upload
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Live Webcam Feature */}
            <div 
              ref={(el) => (featureRefs.current[2] = el)}
              className="bg-card rounded-xl shadow-soft p-6 opacity-0 translate-y-10 transition-all duration-500 ease-out"
              style={{ transitionDelay: "300ms" }}
            >
              <div className="h-12 w-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg mb-5">
                <Camera className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Live Capture</h3>
              <p className="text-muted-foreground mb-5">
                Use your camera for real-time sign language recognition and interpretation.
              </p>
              <Button asChild variant="ghost" className="group">
                <Link to="/webcam" className="flex items-center">
                  Try Live Capture
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple steps to interpret sign language using our technology.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                ref={(el) => (featureRefs.current[index + 3] = el)}
                className="text-center opacity-0 translate-y-10 transition-all duration-500 ease-out"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="h-12 w-12 bg-primary/10 text-primary flex items-center justify-center rounded-full mx-auto mb-5">
                  <span className="font-medium">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold">Start Interpreting Sign Language Today</h2>
            <p className="text-muted-foreground max-w-2xl">
              Choose from our range of interpretation methods and bridge communication gaps with sign language users.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link to="/webcam">
                  Start Live Capture
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                <Link to="/image-upload">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

// Mobile feature card component
interface FeatureMobileCardProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureMobileCard = ({ to, icon, title, description, delay }: FeatureMobileCardProps) => {
  return (
    <Link to={to} className="block">
      <MobileCard 
        className="slide-up-mobile touch-scale flex items-center p-4"
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className="h-10 w-10 bg-primary/10 text-primary flex items-center justify-center rounded-lg mr-4">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
      </MobileCard>
    </Link>
  );
};

const steps = [
  {
    title: "Choose Input Method",
    description: "Select whether to upload an image, video, or use your camera for live capture.",
  },
  {
    title: "Process Media",
    description: "Our system processes the input and identifies sign language gestures.",
  },
  {
    title: "Analyze Gestures",
    description: "Advanced AI recognizes and interprets the sign language gestures.",
  },
  {
    title: "Get Results",
    description: "View the interpreted text translation of the sign language in real-time.",
  },
];

export default Index;
