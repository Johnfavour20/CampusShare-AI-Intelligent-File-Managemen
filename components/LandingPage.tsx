import React, { useState } from 'react';
import { BookOpen, Shield, ChevronRight, Menu, X, Users, Briefcase, Heart, Atom, Palette, Code, School } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const LandingPage: React.FC = () => {
  const { setPage } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const departments = [
    { name: 'Computer Science', icon: Code },
    { name: 'Engineering', icon: Briefcase },
    { name: 'Arts & Humanities', icon: Palette },
    { name: 'Medicine', icon: Heart },
    { name: 'Physics', icon: Atom },
    { name: 'Business School', icon: School },
  ];

  const features = [
      { icon: BookOpen, title: 'Secure Course Materials', desc: 'Keep your syllabi, lecture notes, and research papers safe and accessible in one place.' },
      { icon: Users, title: 'Collaborative Workspaces', desc: 'Create shared folders for group projects with granular permissions for students and faculty.' },
      { icon: Shield, title: 'Assignment Tracking', desc: 'See when students submit work and easily manage different versions of assignments.' },
  ];

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMobileScrollTo = (id: string) => {
    handleScrollTo(id);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg z-50 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold text-slate-900 dark:text-white">CampusShare</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => handleScrollTo('departments')} className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition">Departments</button>
              <button onClick={() => handleScrollTo('features')} className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition">Features</button>
              <button onClick={() => handleScrollTo('about')} className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition">About</button>
              <button onClick={() => setPage('auth')} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-semibold">Login / Register</button>
            </div>
            <button className="md:hidden text-slate-800 dark:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => handleMobileScrollTo('departments')} className="block text-left w-full text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white">Departments</button>
              <button onClick={() => handleMobileScrollTo('features')} className="block text-left w-full text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white">Features</button>
              <button onClick={() => handleMobileScrollTo('about')} className="block text-left w-full text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white">About</button>
              <button onClick={() => setPage('auth')} className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg">Login / Register</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
            <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">Empowering Learning, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Together</span></h1>
          <p className="text-lg sm:text-xl text-slate-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">Seamlessly share course materials, assignments, and research in a secure, unified platform built for your university.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setPage('auth')} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition flex items-center justify-center space-x-2"><span>Get Started</span><ChevronRight className="w-5 h-5" /></button>
            <button onClick={() => handleScrollTo('features')} className="px-8 py-4 bg-slate-900/10 dark:bg-white/10 backdrop-blur text-slate-800 dark:text-white rounded-lg font-semibold hover:bg-slate-900/20 dark:hover:bg-white/20 transition border border-slate-900/20 dark:border-white/20">Explore Features</button>
          </div>
        </div>
      </main>
      
      {/* Stats Bar */}
      <div className="bg-white/50 dark:bg-slate-800/50 py-8">
        <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div><div className="text-3xl font-bold text-slate-900 dark:text-white">30+</div><div className="text-slate-600 dark:text-gray-400 mt-1">Departments</div></div>
                <div><div className="text-3xl font-bold text-slate-900 dark:text-white">10,000+</div><div className="text-slate-600 dark:text-gray-400 mt-1">Students</div></div>
                <div><div className="text-3xl font-bold text-slate-900 dark:text-white">500+</div><div className="text-slate-600 dark:text-gray-400 mt-1">Courses</div></div>
                <div><div className="text-3xl font-bold text-slate-900 dark:text-white">24/7</div><div className="text-slate-600 dark:text-gray-400 mt-1">Collaboration</div></div>
            </div>
        </div>
      </div>

      {/* Browse by Department */}
      <section id="departments" className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Browse by Department</h2>
                <p className="text-slate-600 dark:text-gray-400 text-lg">Find resources and collaborate with your peers.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {departments.map((dept, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-blue-500/10 rounded-xl p-6 text-center hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-blue-500/30 transition cursor-pointer">
                        <dept.icon className="w-12 h-12 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{dept.name}</h3>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">A Hub for Academic Success</h2>
                <p className="text-slate-600 dark:text-gray-400 text-lg">Everything you need for secure file sharing and collaboration.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-900/50 backdrop-blur border border-slate-200 dark:border-blue-500/20 rounded-xl p-6 hover:border-slate-300 dark:hover:border-blue-500/40 transition">
                        <feature.icon className="w-12 h-12 text-blue-500 dark:text-blue-400 mb-4" />
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                        <p className="text-slate-600 dark:text-gray-400">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
              <BookOpen className="w-6 h-6 text-blue-500 dark:text-blue-400" />
              <span className="text-lg font-bold text-slate-900 dark:text-white">CampusShare</span>
          </div>
          <p className="text-slate-600 dark:text-gray-400 mb-4">Secure File Sharing for the Modern University</p>
          <div className="flex justify-center space-x-6 mb-6">
              <a href="#" className="text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white">About Us</a>
              <a href="#" className="text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white">Contact</a>
              <a href="#" className="text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white">Privacy Policy</a>
          </div>
          <p className="text-slate-500 dark:text-gray-500 text-sm">© 2025 CampusShare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;