import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

const DAILY_FREE_CREDITS = 5;

export const useCredits = () => {
  // Initialize from localStorage immediately
  const [credits, setCredits] = useState<number>(() => {
    const stored = localStorage.getItem('contentcraft_credits');
    return stored ? parseInt(stored) : DAILY_FREE_CREDITS;
  });
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>('');
  const hasInitialized = useRef(false);

  // Listen for credit changes across components
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('contentcraft_credits');
      if (stored) {
        const newCredits = parseInt(stored);
        console.log('🔄 Credits updated from storage:', newCredits);
        setCredits(newCredits);
      }
    };

    // Listen for custom event (for same-window updates)
    window.addEventListener('creditsUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('creditsUpdated', handleStorageChange);
    };
  }, []);

  // Get or create user ID (browser fingerprint)
  useEffect(() => {
    // Prevent multiple initializations (React 18 Strict Mode runs effects twice)
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const getUserId = () => {
      let id = localStorage.getItem('contentcraft_user_id');
      if (!id) {
        id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('contentcraft_user_id', id);
        console.log('🆔 New user ID created:', id);
      } else {
        console.log('🆔 Existing user ID:', id);
      }
      return id;
    };

    const id = getUserId();
    setUserId(id);
    
    // Only call loadCredits if we need to check for reset
    // Otherwise, useState already loaded the correct value
    const lastReset = localStorage.getItem('contentcraft_last_reset');
    if (!lastReset) {
      // First time - set lastReset
      localStorage.setItem('contentcraft_last_reset', new Date().toISOString());
      console.log('📅 Set initial lastReset');
      setLoading(false);
    } else {
      // Check if 7 days passed
      const daysDiff = Math.floor((Date.now() - new Date(lastReset).getTime()) / (1000 * 60 * 60 * 24));
      console.log('📅 Days since last reset:', daysDiff);
      
      if (daysDiff >= 7) {
        console.log('🔄 Resetting credits (7 days passed)');
        setCredits(DAILY_FREE_CREDITS);
        localStorage.setItem('contentcraft_credits', DAILY_FREE_CREDITS.toString());
        localStorage.setItem('contentcraft_last_reset', new Date().toISOString());
      } else {
        console.log('✅ Using credits from useState initialization:', credits);
      }
      setLoading(false);
    }
  }, []); // Empty dependency array - run once on mount

  const loadCredits = async (uid: string) => {
    try {
      setLoading(true);
      console.log('🔄 Loading credits for user:', uid);

      // Check if Supabase is configured
      if (!import.meta.env.VITE_SUPABASE_URL) {
        console.log('⚠️ Supabase not configured, using localStorage');
        // Fallback to localStorage if Supabase not configured
        const stored = localStorage.getItem('contentcraft_credits');
        const lastReset = localStorage.getItem('contentcraft_last_reset');
        const now = new Date();

        console.log('📊 Credit info:', { stored, lastReset });

        // First time user - initialize both if missing
        if (!stored || !lastReset) {
          console.log('🆕 First time user - initializing');
          const initialCredits = stored ? parseInt(stored) : DAILY_FREE_CREDITS;
          setCredits(initialCredits);
          localStorage.setItem('contentcraft_credits', initialCredits.toString());
          localStorage.setItem('contentcraft_last_reset', now.toISOString());
          console.log('✅ Initialized with credits:', initialCredits);
          setLoading(false);
          return;
        }

        // Check if need to reset (7 days passed)
        const lastResetDate = new Date(lastReset);
        const daysDiff = Math.floor((now.getTime() - lastResetDate.getTime()) / (1000 * 60 * 60 * 24));

        console.log('📅 Days since last reset:', daysDiff);

        if (daysDiff >= 7) {
          // Reset weekly credits (every 7 days)
          console.log('🔄 Resetting credits (7 days passed)');
          setCredits(DAILY_FREE_CREDITS);
          localStorage.setItem('contentcraft_credits', DAILY_FREE_CREDITS.toString());
          localStorage.setItem('contentcraft_last_reset', now.toISOString());
        } else {
          // Load existing credits
          const creditCount = parseInt(stored);
          console.log('✅ Loaded existing credits:', creditCount);
          setCredits(creditCount);
        }
        setLoading(false);
        return;
      }

      // Try to get from Supabase
      const { data, error } = await supabase
        .from('user_credits')
        .select('*')
        .eq('user_id', uid)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading credits:', error);
        // Fallback to localStorage
        const stored = localStorage.getItem('contentcraft_credits');
        setCredits(stored ? parseInt(stored) : DAILY_FREE_CREDITS);
        setLoading(false);
        return;
      }

      if (!data) {
        // Create new user record
        const { data: newData, error: insertError } = await supabase
          .from('user_credits')
          .insert({
            user_id: uid,
            credits_remaining: DAILY_FREE_CREDITS,
            credits_used: 0,
            last_reset: new Date().toISOString(),
          })
          .select()
          .single();

        if (insertError) {
          console.error('Error creating user:', insertError);
          setCredits(DAILY_FREE_CREDITS);
        } else {
          setCredits(newData.credits_remaining);
        }
      } else {
        // Check if need to reset daily
        const lastReset = new Date(data.last_reset);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24));

        if (daysDiff >= 7) {
          // Reset credits
          const { data: updatedData, error: updateError } = await supabase
            .from('user_credits')
            .update({
              credits_remaining: DAILY_FREE_CREDITS,
              last_reset: now.toISOString(),
            })
            .eq('user_id', uid)
            .select()
            .single();

          if (updateError) {
            console.error('Error resetting credits:', updateError);
          } else {
            setCredits(updatedData.credits_remaining);
          }
        } else {
          setCredits(data.credits_remaining);
        }
      }
    } catch (error) {
      console.error('Error in loadCredits:', error);
      // Fallback to localStorage
      const stored = localStorage.getItem('contentcraft_credits');
      setCredits(stored ? parseInt(stored) : DAILY_FREE_CREDITS);
    } finally {
      setLoading(false);
    }
  };

  const useCredit = async (actionType: string, toolName: string, metadata?: any) => {
    console.log('🔵 useCredit called:', { actionType, toolName, currentCredits: credits });
    
    if (credits <= 0) {
      console.log('🔴 No credits available!');
      return false;
    }

    const newCredits = credits - 1;
    console.log('🟢 Using credit. New balance:', newCredits);
    setCredits(newCredits);

    // Update localStorage
    localStorage.setItem('contentcraft_credits', newCredits.toString());
    
    // Ensure lastReset is set (if not already)
    if (!localStorage.getItem('contentcraft_last_reset')) {
      localStorage.setItem('contentcraft_last_reset', new Date().toISOString());
      console.log('📅 Set initial lastReset');
    }
    
    console.log('💾 Saved to localStorage:', newCredits);

    // Dispatch custom event to update all components
    window.dispatchEvent(new Event('creditsUpdated'));

    // Try to update Supabase
    if (import.meta.env.VITE_SUPABASE_URL) {
      try {
        // Update credits
        await supabase
          .from('user_credits')
          .update({
            credits_remaining: newCredits,
            credits_used: supabase.rpc('increment', { x: 1 }),
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', userId);

        // Log usage
        await supabase.from('usage_logs').insert({
          user_id: userId,
          action_type: actionType,
          tool_name: toolName,
          metadata: metadata || {},
        });
      } catch (error) {
        console.error('Error updating Supabase:', error);
      }
    }

    return true;
  };

  const hasCredits = () => credits > 0;

  return {
    credits,
    loading,
    useCredit,
    hasCredits,
    refreshCredits: () => loadCredits(userId),
  };
};
