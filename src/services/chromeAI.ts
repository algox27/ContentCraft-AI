// Chrome Built-in AI APIs Service
// Supports: Writer, Rewriter, Summarizer, Translator, Prompt API

interface AICapabilities {
  writer: boolean;
  rewriter: boolean;
  summarizer: boolean;
  translator: boolean;
  promptAPI: boolean;
}

// Check AI availability
export async function checkAICapabilities(): Promise<AICapabilities> {
  const capabilities: AICapabilities = {
    writer: false,
    rewriter: false,
    summarizer: false,
    translator: false,
    promptAPI: false,
  };

  try {
    // @ts-ignore - Chrome AI APIs
    if (window.ai) {
      // @ts-ignore
      capabilities.writer = !!(await window.ai.writer?.capabilities?.());
      // @ts-ignore
      capabilities.rewriter = !!(await window.ai.rewriter?.capabilities?.());
      // @ts-ignore
      capabilities.summarizer = !!(await window.ai.summarizer?.capabilities?.());
      // @ts-ignore
      capabilities.translator = !!(await window.ai.translator?.capabilities?.());
      // @ts-ignore
      capabilities.promptAPI = !!(await window.ai.languageModel?.capabilities?.());
    }
  } catch (error) {
    console.warn('Chrome AI APIs not available:', error);
  }

  return capabilities;
}

// 1️⃣ AI Title & Description Generator (Writer API)
export async function generateTitleAndDescription(topic: string): Promise<{ title: string; description: string }> {
  try {
    // @ts-ignore
    const writer = await window.ai.writer.create({
      tone: 'formal',
      format: 'plain-text',
      length: 'medium',
    });

    const prompt = `Generate a YouTube video title and description for: ${topic}

Requirements:
- Title: 60-70 characters, SEO-optimized, engaging
- Description: 150+ characters, keyword-rich, includes call-to-action

Format:
TITLE: [your title here]
DESCRIPTION: [your description here]`;

    const result = await writer.write(prompt);
    writer.destroy();

    // Parse result
    const titleMatch = result.match(/TITLE:\s*(.+)/);
    const descMatch = result.match(/DESCRIPTION:\s*(.+)/s);

    return {
      title: titleMatch?.[1]?.trim() || 'Generated Title',
      description: descMatch?.[1]?.trim() || 'Generated Description',
    };
  } catch (error) {
    console.error('Writer API error:', error);
    throw new Error('AI Title Generation failed. Please enable Chrome AI APIs.');
  }
}

// 2️⃣ Grammar & Clarity Enhancer (Proofreader API)
export async function proofreadText(text: string): Promise<string> {
  try {
    // @ts-ignore
    const writer = await window.ai.writer.create({
      tone: 'formal',
      format: 'plain-text',
      length: 'as-is',
    });

    const prompt = `Proofread and improve this text for grammar, clarity, and readability. Keep the same length and meaning:

${text}`;

    const result = await writer.write(prompt);
    writer.destroy();

    return result.trim();
  } catch (error) {
    console.error('Proofreader error:', error);
    throw new Error('Proofreading failed. Please enable Chrome AI APIs.');
  }
}

// 3️⃣ Tone Rewriter (Rewriter API)
export async function rewriteWithTone(
  text: string,
  tone: 'formal' | 'casual' | 'funny' | 'clickbait'
): Promise<string> {
  try {
    // @ts-ignore
    const rewriter = await window.ai.rewriter.create({
      tone: tone === 'clickbait' ? 'casual' : tone,
      format: 'plain-text',
      length: 'as-is',
    });

    let prompt = text;
    if (tone === 'clickbait') {
      prompt = `Rewrite this in an exciting, clickbait style with urgency: ${text}`;
    }

    const result = await rewriter.rewrite(prompt);
    rewriter.destroy();

    return result.trim();
  } catch (error) {
    console.error('Rewriter API error:', error);
    throw new Error('Rewriting failed. Please enable Chrome AI APIs.');
  }
}

// 4️⃣ AI Summary (Summarizer API)
export async function summarizeText(text: string, length: 'short' | 'medium' = 'short'): Promise<string> {
  try {
    // @ts-ignore
    const summarizer = await window.ai.summarizer.create({
      type: 'key-points',
      format: 'plain-text',
      length: length,
    });

    const result = await summarizer.summarize(text);
    summarizer.destroy();

    return result.trim();
  } catch (error) {
    console.error('Summarizer API error:', error);
    throw new Error('Summarization failed. Please enable Chrome AI APIs.');
  }
}

// 5️⃣ Multilingual Translation (Translator API)
export async function translateText(
  text: string,
  targetLanguage: 'hi' | 'es' | 'fr' | 'de' | 'ja' | 'ko'
): Promise<string> {
  try {
    // @ts-ignore
    const translator = await window.ai.translator.create({
      sourceLanguage: 'en',
      targetLanguage: targetLanguage,
    });

    const result = await translator.translate(text);
    translator.destroy();

    return result.trim();
  } catch (error) {
    console.error('Translator API error:', error);
    throw new Error('Translation failed. Please enable Chrome AI APIs.');
  }
}

// 6️⃣ Prompt API (Multimodal - for voice/advanced features)
export async function generateWithPromptAPI(prompt: string): Promise<string> {
  try {
    // @ts-ignore
    const session = await window.ai.languageModel.create({
      temperature: 0.7,
      topK: 3,
    });

    const result = await session.prompt(prompt);
    session.destroy();

    return result.trim();
  } catch (error) {
    console.error('Prompt API error:', error);
    throw new Error('AI generation failed. Please enable Chrome AI APIs.');
  }
}

// Language options
export const SUPPORTED_LANGUAGES = [
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
] as const;

// Tone options
export const TONE_OPTIONS = [
  { value: 'formal', label: 'Formal', icon: '👔' },
  { value: 'casual', label: 'Casual', icon: '😊' },
  { value: 'funny', label: 'Funny', icon: '😂' },
  { value: 'clickbait', label: 'Clickbait', icon: '🔥' },
] as const;
