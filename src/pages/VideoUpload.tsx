
import { useState, useRef } from "react";
import { Upload, X, PlayCircle, PauseCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/layout/Layout";

const VideoUpload = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processVideo(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("video/")) {
      processVideo(file);
    } else {
      toast.error("Please upload a valid video file");
    }
  };

  const processVideo = (file: File) => {
    // Create a URL for the video
    const videoUrl = URL.createObjectURL(file);
    setSelectedVideo(videoUrl);
    setResults([]);
    
    // Mock upload process
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast.success("Video uploaded successfully");
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        simulateAnalysis();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const simulateAnalysis = () => {
    // Only start analysis if we haven't already
    if (results.length > 0) return;
    
    // Mock analysis with timed results
    toast.info("Analyzing sign language in video...");
    
    const mockResults = [
      "Hello",
      "My name is John",
      "Nice to meet you",
      "How are you today?",
      "I am learning sign language"
    ];
    
    mockResults.forEach((result, index) => {
      setTimeout(() => {
        setResults(prev => [...prev, result]);
      }, (index + 1) * 2000);
    });
  };

  const clearVideo = () => {
    setSelectedVideo(null);
    setResults([]);
    setUploadProgress(0);
    setIsPlaying(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl font-bold mb-3">Video Upload</h1>
            <p className="text-muted-foreground">
              Upload a video with sign language for continuous interpretation
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            <Card className="shadow-soft overflow-hidden md:col-span-3 animate-slide-up">
              <CardContent className="p-6">
                {!selectedVideo ? (
                  <div
                    className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                      isDragging
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-secondary/50"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="hidden"
                      ref={fileInputRef}
                    />

                    <div className="flex flex-col items-center gap-4">
                      <div className="h-16 w-16 bg-primary/10 text-primary flex items-center justify-center rounded-full">
                        <Upload className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          Drag and drop your video here
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Supports MP4, WebM and MOV files
                        </p>
                        <Button 
                          onClick={() => fileInputRef.current?.click()}
                          className="rounded-full"
                        >
                          Browse Files
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-background/80 hover:bg-background z-10"
                        onClick={clearVideo}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <video
                        ref={videoRef}
                        src={selectedVideo}
                        className="w-full h-auto rounded-lg"
                        onEnded={() => setIsPlaying(false)}
                        controls={false}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 hover:bg-background rounded-full w-12 h-12"
                        onClick={togglePlayPause}
                      >
                        {isPlaying ? (
                          <PauseCircle className="h-8 w-8" />
                        ) : (
                          <PlayCircle className="h-8 w-8" />
                        )}
                      </Button>
                    </div>

                    {isUploading && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Uploading...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-2" />
                      </div>
                    )}

                    <div className="flex justify-center">
                      <Button
                        onClick={clearVideo}
                        variant="outline"
                        className="rounded-full"
                      >
                        Upload Another Video
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-soft h-full md:col-span-2 animate-slide-up" style={{ animationDelay: "150ms" }}>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <span className="mr-2">Interpretation Results</span>
                  {results.length > 0 && isPlaying && (
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </span>
                  )}
                </h3>
                
                {results.length > 0 ? (
                  <div className="space-y-3">
                    {results.map((result, index) => (
                      <div 
                        key={index} 
                        className="p-3 bg-muted rounded-lg animate-slide-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <p className="text-foreground">{result}</p>
                      </div>
                    ))}
                  </div>
                ) : selectedVideo ? (
                  <div className="flex flex-col items-center justify-center text-center h-full py-12">
                    <p className="text-muted-foreground mb-4">
                      Press play to begin analysis and see interpretation results
                    </p>
                    <Button
                      onClick={togglePlayPause}
                      className="rounded-full"
                    >
                      Start Analysis
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center h-full py-12">
                    <p className="text-muted-foreground">
                      Upload a video to see interpretation results
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 p-4 bg-secondary/50 rounded-lg border border-border/50 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm mb-1">Tips for Best Results</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-1">
                  <li>Ensure good lighting for clear visibility of hand gestures</li>
                  <li>Record at a steady pace without rapid movements</li>
                  <li>Make sure the entire hand and arm gestures are visible</li>
                  <li>Use a simple background for better recognition</li>
                  <li>For longer videos, keep the file size under 100MB for optimal performance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VideoUpload;
