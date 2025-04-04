
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using the Wheels Employee Hub, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">2. User Accounts</h2>
              <p className="text-muted-foreground">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">3. Acceptable Use</h2>
              <p className="text-muted-foreground">
                You agree not to misuse our services or help anyone else to do so. You may not attempt to gain unauthorized access to our services or systems.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">4. Intellectual Property</h2>
              <p className="text-muted-foreground">
                The service and all materials therein or transferred thereby, including software, images, text, graphics, logos, patents, trademarks, service marks, copyrights, and other intellectual property rights are our property.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">5. Termination</h2>
              <p className="text-muted-foreground">
                We reserve the right to suspend or terminate your access to our services at any time, including for violations of these Terms of Service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">6. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground">
                Our services are provided "as is" and "as available" without warranties of any kind, either express or implied.
              </p>
            </section>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">Last updated: April 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
