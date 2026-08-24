import { supabase, isSupabaseConfigured } from '../config/supabase.js';

// Simple email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Handle Contact Form Submission
 * POST /api/contact
 */
export const handleContactSubmission = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // 1. Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid name (at least 2 characters).',
      });
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a message of at least 5 characters.',
      });
    }

    const sanitizedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: (subject && typeof subject === 'string' && subject.trim()) || 'General Portfolio Inquiry',
      message: message.trim(),
      created_at: new Date().toISOString(),
    };

    // 2. Supabase Integration
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('contacts')
        .insert([sanitizedData])
        .select();

      if (error) {
        console.error('❌ Supabase insert error:', error);
        return res.status(500).json({
          success: false,
          error: 'Failed to record message in the database. Please try again or email directly.',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
      }

      console.log('✅ New contact saved to Supabase:', sanitizedData.email);
      return res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been sent and stored successfully.',
        data: data ? data[0] : sanitizedData,
      });
    } else {
      // Demo / Local development mode (Supabase credentials not yet configured)
      console.log('ℹ️ [Demo Mode] Contact Submission Received:', sanitizedData);
      return res.status(200).json({
        success: true,
        message: 'Thank you! Your message was received in local preview mode. (Configure Supabase credentials in backend/.env for persistent cloud storage).',
        data: sanitizedData,
        demoMode: true,
      });
    }
  } catch (err) {
    console.error('❌ Unexpected error in contactController:', err);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your message.',
    });
  }
};

/**
 * Health check endpoint
 * GET /api/health
 */
export const checkHealth = async (req, res) => {
  const dbConnected = isSupabaseConfigured();

  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    database: {
      provider: 'Supabase PostgreSQL',
      configured: dbConnected,
      mode: dbConnected ? 'Live' : 'Local / Demo Fallback',
    },
    version: '1.0.0',
    owner: 'Prarthana Reddy',
  });
};
