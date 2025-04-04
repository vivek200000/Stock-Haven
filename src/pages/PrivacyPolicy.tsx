
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: April 4, 2025</p>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-bold mb-3">1. Introduction</h2>
          <p>
            At Wheels Employee Hub, we respect your privacy and are committed to protecting your personal data. This Privacy Policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">2. The Data We Collect</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Identity Data: includes first name, last name, username or similar identifier.</li>
            <li>Contact Data: includes email address and telephone numbers.</li>
            <li>Technical Data: includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
            <li>Usage Data: includes information about how you use our website and services.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">3. How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>To register you as a new customer or employee.</li>
            <li>To process and deliver services to you.</li>
            <li>To manage our relationship with you.</li>
            <li>To improve our website, products/services, marketing or customer relationships.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">5. Your Legal Rights</h2>
          <p>
            Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and the right to withdraw consent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">6. Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@wheelshub.com or by using our Contact form on the website.
          </p>
        </section>
      </div>
    </div>
  );
}
