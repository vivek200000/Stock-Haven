
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import * as speakeasy from 'speakeasy';

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
    return speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token
    });
  };

  return {
    twoFactorRequired,
    twoFactorMethod,
    checkTwoFactorRequirement,
    verifyGoogleAuthenticatorCode
  };
};
