
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import * as OTPAuth from 'otpauth';

export const useTwoFactor = () => {
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const [twoFactorMethod, setTwoFactorMethod] = useState<'email' | 'google' | null>(null);

  const checkTwoFactorRequirement = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_mfa')
      .select('email_2fa_enabled, google_auth_enabled')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error checking 2FA:', error);
      return;
    }

    if (data.email_2fa_enabled) {
      setTwoFactorRequired(true);
      setTwoFactorMethod('email');
    } else if (data.google_auth_enabled) {
      setTwoFactorRequired(true);
      setTwoFactorMethod('google');
    }
  };

  const verifyGoogleAuthenticatorCode = (secret: string, token: string) => {
    try {
      // Create a new TOTP object with the secret
      const totp = new OTPAuth.TOTP({
        issuer: 'Wheels',
        label: 'Auth',
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(secret)
      });
      
      // Verify the token
      const delta = totp.validate({ token, window: 1 });
      
      // If delta is null, validation failed
      return delta !== null;
    } catch (error) {
      console.error('Error verifying Google Auth code:', error);
      return false;
    }
  };

  return {
    twoFactorRequired,
    twoFactorMethod,
    checkTwoFactorRequirement,
    verifyGoogleAuthenticatorCode
  };
};
