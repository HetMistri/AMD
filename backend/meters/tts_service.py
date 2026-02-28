"""
Text-to-Speech Service using gTTS (Google Text-to-Speech)
Supports all Indian languages without requiring system voice packages
"""

import io
import logging
from typing import Optional
from gtts import gTTS
from django.core.cache import cache
from django.core.files.base import ContentFile

logger = logging.getLogger(__name__)

# Language code mapping for gTTS
LANGUAGE_MAP = {
    'en': 'en',      # English
    'hi': 'hi',      # Hindi
    'gu': 'gu',      # Gujarati
    'ta': 'ta',      # Tamil
    'te': 'te',      # Telugu 
    'kn': 'kn',      # Kannada
    'ml': 'ml',      # Malayalam
    'mr': 'mr',      # Marathi
    'pa': 'pa',      # Punjabi
    'bn': 'bn',      # Bengali
    'or': 'or',      # Odia
    'as': 'as',      # Assamese
    'ur': 'ur',      # Urdu
    'sa': 'sa',      # Sanskrit
}

def generate_speech(text: str, language: str = 'en') -> Optional[bytes]:
    """
    Generate speech audio from text using gTTS
    
    Args:
        text: Text to convert to speech
        language: Language code (e.g., 'hi', 'gu', 'en')
        
    Returns:
        Audio data as bytes, or None if generation fails
    """
    if not text or not isinstance(text, str):
        logger.warning(f"Invalid text for TTS: {text}")
        return None
    
    # Validate language
    lang_code = LANGUAGE_MAP.get(language.lower(), 'en')
    if language.lower() not in LANGUAGE_MAP:
        logger.warning(f"Unsupported language {language}, falling back to English")
        lang_code = 'en'
    
    # Create cache key
    cache_key = f"tts_audio_{language}_{hash(text)}"
    
    # Check if audio is already cached
    cached_audio = cache.get(cache_key)
    if cached_audio:
        logger.debug(f"TTS cache hit for text: {text[:50]}...")
        return cached_audio
    
    try:
        # Generate speech
        logger.info(f"Generating TTS for language: {lang_code}, text: {text[:50]}...")
        tts = gTTS(text=text, lang=lang_code, slow=False)
        
        # Write to bytes buffer
        audio_buffer = io.BytesIO()
        tts.write_to_fp(audio_buffer)
        audio_data = audio_buffer.getvalue()
        
        # Cache for 7 days
        cache.set(cache_key, audio_data, 7 * 24 * 60 * 60)
        
        logger.info(f"TTS generated successfully: {len(audio_data)} bytes")
        return audio_data
        
    except Exception as e:
        logger.error(f"Error generating TTS: {str(e)}", exc_info=True)
        return None


def get_supported_languages():
    """Get list of supported languages and their codes"""
    return list(LANGUAGE_MAP.keys())
