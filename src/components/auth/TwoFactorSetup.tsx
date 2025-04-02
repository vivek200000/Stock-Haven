import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { QRCodeCanvas } from 'qrcode.react';
import speakeasy from 'speakeasy';

export const TwoFactorSetup = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState<'email' | 'google' | null>(null);
  const [googleAuthSecret, setGoogleAuthSecret] = useState<string | null>(null);

  const generateGoogleAuthSecret = () => {
    const secret = speakeasy.generateSecret({ name: `Wheels: ${user?.email}` });
    setGoogleAuthSecret(secret.base32);
    return secret;
  };

  const enableEmailTwoFactor = async () => {
    try {
      const { error } = await supabase
        .from('user_mfa')
        .update({ email_2fa_enabled: true })
        .eq('user_id', user?.id);

      if (error) throw error;

      toast({
        title: 'Email 2FA Enabled',
        description: 'Two-factor authentication via email has been enabled.'
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to enable email 2FA'
      });
    }
  };

  const enableGoogleAuthenticator = async () => {
    if (!googleAuthSecret) return;

    try {
      const { error } = await supabase
        .from('user_mfa')
        .update({ 
          google_auth_enabled: true, 
          google_auth_secret: googleAuthSecret 
        })
        .eq('user_id', user?.id);

      if (error) throw error;

      toast({
        title: 'Google Authenticator Enabled',
        description: 'Two-factor authentication via Google Authenticator has been enabled.'
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to enable Google Authenticator'
      });
    }
  };

  const renderSetupContent = () => {
    switch (selectedMethod) {
      case 'email':
        return (
          <div>
            <h3>Email Two-Factor Authentication</h3>
            <p>An OTP will be sent to your registered email during login.</p>
            <Button onClick={enableEmailTwoFactor}>Enable Email 2FA</Button>
          </div>
        );
      case 'google':
        const secret = generateGoogleAuthSecret();
        return (
          <div className="space-y-4">
            <h3>Google Authenticator Setup</h3>
            <QRCodeCanvas value={secret.otpauth_url || ''} />
            <p>Scan this QR code with Google Authenticator</p>
            <div>
              <Label>Or enter this secret key manually:</Label>
              <Input 
                value={secret.base32} 
                readOnly 
                className="mt-2" 
              />
            </div>
            <Button onClick={enableGoogleAuthenticator}>Confirm Google Authenticator</Button>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <Button 
              variant="outline" 
              onClick={() => setSelectedMethod('email')}
            >
              Enable Email 2FA
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setSelectedMethod('google')}
            >
              Setup Google Authenticator
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="p-6 bg-background rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Two-Factor Authentication</h2>
      {renderSetupContent()}
    </div>
  );
};
