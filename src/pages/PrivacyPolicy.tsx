
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
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
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
              <p className="text-muted-foreground">
                We collect information you provide directly to us when you create an account, update your profile, or use our services. This may include your name, email address, phone number, and other contact information.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
              <p className="text-muted-foreground">
                We use the information we collect to provide, maintain, and improve our services, to process your transactions, to send you technical notices and support messages, and to communicate with you about products, services, offers, and events.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">3. Data Security</h2>
              <p className="text-muted-foreground">
                We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. All data is encrypted in transit and at rest.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">4. Cookies and Similar Technologies</h2>
              <p className="text-muted-foreground">
                We use cookies and similar technologies to improve user experience, analyze usage patterns, and customize content. You can control cookies through your browser settings.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">5. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at privacy@wheelshub.com.
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
