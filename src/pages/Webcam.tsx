
import { useState, useRef, useEffect, useCallback } from "react";
import { Camera, CameraOff, Settings, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout/Layout";

const Webcam = () => {
  const [isActive, setIsActive] = useState(false);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const [showSettings, setShowSettings] = useState(false);
  const [mirror, setMirror] = useState(true);
  const [results, setResults] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Get available camera devices
  useEffect(() => {
    const getDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setDevices(videoDevices);
        
        if (videoDevices.length > 0 && !selectedDeviceId) {
          setSelectedDeviceId(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error("Error getting media devices:", error);
        toast.error("Could not access camera devices");
      }
    };

    getDevices();
  }, []);

  // Start/stop webcam
  const toggleCamera = useCallback(async () => {
    try {
      if (isActive) {
        // Stop the camera
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
        setIsActive(false);
        setResults([]);
      } else {
        // Start the camera
        const constraints = {
          video: selectedDeviceId ? { deviceId: { exact: selectedDeviceId } } : true
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;
        setIsActive(true);
        toast.success("Camera started successfully");
        
        // Start mock analysis
        simulateAnalysis();
      }
    } catch (error) {
      console.error("Error toggling camera:", error);
      toast.error("Could not access camera");
    }
  }, [isActive, selectedDeviceId]);

  // Change camera device
  const changeDevice = async (deviceId: string) => {
    setSelectedDeviceId(deviceId);
    
    // If camera is already active, restart it with the new device
    if (isActive) {
      // Stop current stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      try {
        // Start new stream
        const constraints = {
          video: { deviceId: { exact: deviceId } }
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;
        toast.success("Camera changed successfully");
      } catch (error) {
        console.error("Error changing camera device:", error);
        toast.error("Could not switch camera");
        setIsActive(false);
      }
    }
  };

  // Mock analysis
  const simulateAnalysis = () => {
    setResults([]);
    
    const mockResults = [
      "Hello",
      "Welcome",
      "How are you?",
      "Thank you",
      "Good to see you"
    ];
    
    mockResults.forEach((result, index) => {
      setTimeout(() => {
        setResults(prev => [...prev, result]);
        
        // Scroll to newest result
        const resultContainer = document.getElementById("result-container");
        if (resultContainer) {
          resultContainer.scrollTop = resultContainer.scrollHeight;
        }
      }, (index + 1) * 3000);
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl font-bold mb-3">Live Webcam Capture</h1>
            <p className="text-muted-foreground">
              Use your camera for real-time sign language interpretation
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            <Card className="shadow-soft md:col-span-3 animate-slide-up">
              <CardContent className="p-6">
                <div className="relative rounded-lg overflow-hidden bg-black aspect-video flex items-center justify-center">
                  {!isActive && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/80 z-10">
                      <Camera className="h-12 w-12 mb-4 opacity-70" />
                      <p className="mb-4 font-medium">Camera is currently inactive</p>
                      <Button
                        onClick={toggleCamera}
                        className="rounded-full"
                      >
                        Start Camera
                      </Button>
                    </div>
                  )}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${mirror ? 'scale-x-[-1]' : ''}`}
                  />
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={toggleCamera}
                      variant={isActive ? "destructive" : "default"}
                      className="rounded-full"
                      size="sm"
                    >
                      {isActive ? (
                        <>
                          <CameraOff className="mr-2 h-4 w-4" />
                          Stop Camera
                        </>
                      ) : (
                        <>
                          <Camera className="mr-2 h-4 w-4" />
                          Start Camera
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={() => setShowSettings(!showSettings)}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                  {isActive && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={simulateAnalysis}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Restart Analysis
                    </Button>
                  )}
                </div>

                {showSettings && (
                  <div className="mt-4 p-4 border border-border rounded-lg animate-fade-in">
                    <h3 className="font-medium mb-3">Camera Settings</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="camera-select">Camera</Label>
                          <Select
                            value={selectedDeviceId}
                            onValueChange={changeDevice}
                          >
                            <SelectTrigger id="camera-select">
                              <SelectValue placeholder="Select camera" />
                            </SelectTrigger>
                            <SelectContent>
                              {devices.map((device) => (
                                <SelectItem key={device.deviceId} value={device.deviceId}>
                                  {device.label || `Camera ${devices.indexOf(device) + 1}`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center space-x-2 pt-8">
                          <Switch
                            id="mirror-mode"
                            checked={mirror}
                            onCheckedChange={setMirror}
                          />
                          <Label htmlFor="mirror-mode">Mirror View</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-soft md:col-span-2 animate-slide-up" style={{ animationDelay: "150ms" }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">
                    <span className="mr-2">Interpretation Results</span>
                    {results.length > 0 && isActive && (
                      <span className="relative inline-flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                      </span>
                    )}
                  </h3>
                </div>
                
                <div 
                  id="result-container"
                  className="h-[400px] overflow-y-auto pr-2 space-y-3"
                >
                  {results.length > 0 ? (
                    results.map((result, index) => (
                      <div 
                        key={index} 
                        className="p-3 bg-muted rounded-lg animate-slide-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <p className="text-foreground">{result}</p>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center h-full">
                      {isActive ? (
                        <p className="text-muted-foreground">
                          Waiting for sign language gestures...
                        </p>
                      ) : (
                        <p className="text-muted-foreground">
                          Start the camera to begin real-time interpretation
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 shadow-soft animate-slide-up" style={{ animationDelay: "300ms" }}>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Live Capture Tips</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Lighting</h4>
                  <p className="text-sm text-muted-foreground">
                    Ensure your space is well-lit from the front to clearly show your hand gestures.
                    Avoid backlighting which can create shadows.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Positioning</h4>
                  <p className="text-sm text-muted-foreground">
                    Position yourself so your hands are clearly visible in the frame. Keep approximately
                    2-3 feet from the camera for optimal recognition.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Movement</h4>
                  <p className="text-sm text-muted-foreground">
                    Make deliberate, clear gestures at a moderate pace. Avoid very rapid movements
                    which can be difficult for the system to interpret accurately.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Webcam;
