
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: April 4, 2025</p>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-bold mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Wheels Employee Hub platform ("Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">2. Use License</h2>
          <p>
            Permission is granted to temporarily use the Service for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software contained on the Service</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">3. User Accounts</h2>
          <p>
            When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>
          <p className="mt-2">
            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">4. Intellectual Property</h2>
          <p>
            The Service and its original content, features and functionality are and will remain the exclusive property of Wheels Employee Hub and its licensors. The Service is protected by copyright, trademark, and other laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">5. Termination</h2>
          <p>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
          <p className="mt-2">
            Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">6. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws, without regard to its conflict of law provisions.
          </p>
          <p className="mt-2">
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
          </p>
        </section>
      </div>
    </div>
  );
}
