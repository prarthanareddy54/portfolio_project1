import { generateChatReply } from '../services/aiService.js';

/**
 * Handle AI Chat Message
 * POST /api/chat
 */
export const handleChatMessage = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a non-empty message string.',
      });
    }

    if (message.trim().length > 1000) {
      return res.status(400).json({
        success: false,
        error: 'Message length exceeds the 1,000 character limit.',
      });
    }

    const conversationHistory = Array.isArray(history) ? history : [];

    const result = await generateChatReply({
      message: message.trim(),
      conversationHistory,
    });

    return res.status(200).json({
      success: true,
      reply: result.reply,
      model: result.model,
      demoMode: result.demoMode,
    });
  } catch (err) {
    console.error('❌ Chat Controller Error:', err);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while generating the AI response. Please try again.',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
};
