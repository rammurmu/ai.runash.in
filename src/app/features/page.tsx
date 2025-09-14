"use client";
import {
  Video,
  Zap,
  Palette,
  Cloud,
  Shield,
  Users,
  Sparkles,
  Globe,
  Mic,
  Edit,
  Share2,
  BarChart3,
  Monitor,
  Camera,
  Wifi,
  Database,
  Cpu,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastViewport,
} from "@/components/ui/toast";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const featuresData = {
  core: [
    {
      icon: Video,
      title: "AI Video Generation",
      description:
        "Create professional videos from text prompts using advanced AI models trained on millions of video samples",
      features: [
        "Text-to-video generation",
        "Multiple aspect ratios",
        "HD quality output",
        "Custom duration control",
      ],
    },
    {
      icon: Zap,
      title: "Lightning Fast Processing",
      description:
        "Generate videos in seconds with our optimized cloud infrastructure and cutting-edge AI acceleration",
      features: [
        "Sub-30 second generation",
        "Parallel processing",
        "GPU acceleration",
        "Real-time preview",
      ],
    },
    {
      icon: Palette,
      title: "Advanced Customization",
      description:
        "Fine-tune every aspect of your videos with comprehensive styling and branding options",
      features: [
        "Custom color schemes",
        "Brand templates",
        "Font selection",
        "Logo integration",
      ],
    },
    {
      icon: Edit,
      title: "Professional Editing",
      description:
        "Built-in video editor with timeline, transitions, effects, and professional-grade tools",
      features: [
        "Timeline editing",
        "Transition effects",
        "Audio mixing",
        "Color grading",
      ],
    },
  ],
  streaming: [
    {
      icon: Wifi,
      title: "Live Streaming",
      description:
        "Stream directly to popular platforms with optimized encoding and adaptive bitrate",
      features: [
        "Multi-platform streaming",
        "Adaptive bitrate",
        "Low latency",
        "Stream scheduling",
      ],
    },
    {
      icon: Camera,
      title: "Multi-Camera Support",
      description:
        "Connect multiple cameras and switch between angles seamlessly during live streams",
      features: [
        "Up to 8 camera inputs",
        "Scene switching",
        "Picture-in-picture",
        "Green screen support",
      ],
    },
    {
      icon: Mic,
      title: "Audio Enhancement",
      description:
        "Professional audio processing with noise reduction, echo cancellation, and voice enhancement",
      features: [
        "Noise reduction",
        "Echo cancellation",
        "Voice enhancement",
        "Multi-track audio",
      ],
    },
    {
      icon: Monitor,
      title: "Screen Recording",
      description:
        "Capture your screen, applications, or specific windows with high-quality recording",
      features: [
        "Full screen capture",
        "Window selection",
        "Cursor highlighting",
        "System audio",
      ],
    },
  ],
  collaboration: [
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Work together with your team in real-time on video projects with role-based permissions",
      features: [
        "Real-time collaboration",
        "Role management",
        "Comment system",
        "Version control",
      ],
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description:
        "Share your videos instantly with customizable privacy settings and embed options",
      features: [
        "One-click sharing",
        "Privacy controls",
        "Embed codes",
        "Social media integration",
      ],
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description:
        "Track video performance with detailed analytics and audience engagement metrics",
      features: [
        "View analytics",
        "Engagement metrics",
        "Audience insights",
        "Performance reports",
      ],
    },
    {
      icon: Database,
      title: "Asset Management",
      description:
        "Organize and manage your video assets, templates, and media files efficiently",
      features: [
        "Media library",
        "Asset tagging",
        "Search & filter",
        "Bulk operations",
      ],
    },
  ],
  technical: [
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description:
        "Scalable cloud processing with global CDN for fast delivery and reliable performance",
      features: [
        "Global CDN",
        "Auto-scaling",
        "99.9% uptime",
        "Edge computing",
      ],
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Bank-level security with end-to-end encryption, SOC2 compliance, and data protection",
      features: [
        "End-to-end encryption",
        "SOC2 compliance",
        "GDPR compliant",
        "Regular security audits",
      ],
    },
    {
      icon: Cpu,
      title: "AI Optimization",
      description:
        "Continuously improving AI models with machine learning optimization and performance tuning",
      features: [
        "Model optimization",
        "Performance tuning",
        "Quality enhancement",
        "Speed improvements",
      ],
    },
    {
      icon: Globe,
      title: "Global Availability",
      description:
        "Available worldwide with multi-language support and localized content delivery",
      features: [
        "Multi-language UI",
        "Global servers",
        "Local compliance",
        "Regional optimization",
      ],
    },
  ],
};

export default function FeaturesPage() {
  // Carousel items: highlight top features
  const carouselItems = [
    <div className="flex flex-col items-center justify-center h-full" key="c1">
      <Video className="w-12 h-12 text-purple-500 mb-2" />
      <div className="font-bold text-lg mb-1">AI Video Generation</div>
      <div className="text-gray-500 text-sm text-center">
        Create videos from text prompts in seconds.
      </div>
    </div>,
    <div className="flex flex-col items-center justify-center h-full" key="c2">
      <Wifi className="w-12 h-12 text-blue-500 mb-2" />
      <div className="font-bold text-lg mb-1">Live Streaming</div>
      <div className="text-gray-500 text-sm text-center">
        Stream to any platform with low latency.
      </div>
    </div>,
    <div className="flex flex-col items-center justify-center h-full" key="c3">
      <Users className="w-12 h-12 text-green-500 mb-2" />
      <div className="font-bold text-lg mb-1">Team Collaboration</div>
      <div className="text-gray-500 text-sm text-center">
        Work together in real time on projects.
      </div>
    </div>,
    <div className="flex flex-col items-center justify-center h-full" key="c4">
      <Shield className="w-12 h-12 text-orange-500 mb-2" />
      <div className="font-bold text-lg mb-1">Enterprise Security</div>
      <div className="text-gray-500 text-sm text-center">
        Bank-level security and compliance.
      </div>
    </div>,
  ];

  // Toast state
  const [showToast, setShowToast] = useState(false);

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="text-xl font-bold">RunAsh AI</span>
              </Link>
              <Link href="/app">
                <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                  Try Now
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section with Carousel */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-4 py-2 text-sm mb-8">
              <Sparkles className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-gray-600 dark:text-gray-400">
                All Features
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Everything you need for
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                video creation
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover all the powerful features that make RunAsh AI the
              ultimate platform for creating, editing, and streaming videos with
              artificial intelligence
            </p>
            <div className="mb-8">
              <Carousel items={carouselItems} />
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">What makes us unique?</Button>
                </PopoverTrigger>
                <PopoverContent className="text-sm max-w-xs">
                  <div className="font-bold mb-2 text-purple-600">
                    Tech Innovations
                  </div>
                  <ul className="list-disc pl-4 text-left text-gray-700 dark:text-gray-300">
                    <li>Real-time AI video streaming</li>
                    <li>Multi-modal content generation</li>
                    <li>Open-source, privacy-first</li>
                    <li>Enterprise-grade security</li>
                  </ul>
                </PopoverContent>
              </Popover>
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setOpenDialog(true)}
                    variant="secondary"
                  >
                    See a Demo
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Live Demo Preview</DialogTitle>
                  <DialogDescription>
                    Watch a short demo of RunAsh AI's real-time video generation
                    and streaming capabilities.
                  </DialogDescription>
                  <div className="aspect-video w-full bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center mt-4">
                    <span className="text-gray-500">
                      [Demo Video Placeholder]
                    </span>
                  </div>
                </DialogContent>
              </Dialog>
              <Button onClick={() => setShowToast(true)} variant="default">
                Copy Feature List
              </Button>
            </div>
            <Toast open={showToast} onOpenChange={setShowToast}>
              <ToastTitle>Copied!</ToastTitle>
              <ToastDescription>
                Feature list copied to clipboard.
              </ToastDescription>
            </Toast>
            <ToastViewport />
          </div>
        </section>

        <Separator className="my-12" />

        {/* Core Features */}
        <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Core Features
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
              Essential tools for creating professional videos with AI
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuresData.core.map((feature, index) => (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                      >
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Streaming Features */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Live Streaming
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
              Professional live streaming capabilities for content creators
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuresData.streaming.map((feature, index) => (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Collaboration Features */}
        <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Collaboration & Sharing
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
              Work together and share your creations with the world
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuresData.collaboration.map((feature, index) => (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                      >
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Features */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Technical Excellence
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
              Enterprise-grade infrastructure and security for reliable
              performance
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuresData.technical.map((feature, index) => (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                      >
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to create amazing videos?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already using RunAsh AI to
              bring their ideas to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/app">
                <Button
                  size="lg"
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-8 py-4 text-lg min-w-[200px]"
                >
                  Start Creating
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-4 text-lg min-w-[200px] bg-transparent"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </ToastProvider>
  );
}
