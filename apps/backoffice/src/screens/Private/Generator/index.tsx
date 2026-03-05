import React, { useState } from 'react';
import { Sparkles, Twitter, Instagram, Linkedin, Loader2 } from 'lucide-react';
import styles from './Generator.module.css';
import { generateContent, generateImage } from './openai';

type Platform = 'twitter' | 'instagram' | 'linkedin';
type ContentType = 'post' | 'thread' | 'caption';

interface GeneratorForm {
  topic: string;
  tone: string;
  contentType: ContentType;
  keywords: string;
  generateImage: boolean;
  imageStyle: string;
}

const Generator = () => {
  const [platform, setPlatform] = useState<Platform>('twitter');
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState<GeneratorForm>({
    topic: '',
    tone: 'professional',
    contentType: 'post',
    keywords: '',
    generateImage: false,
    imageStyle: 'modern',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Generate content
      const content = await generateContent(
        form.topic,
        platform,
        form.tone,
        form.contentType,
        form.keywords
      );
      setGeneratedContent(content);

      // Generate image if requested
      if (form.generateImage) {
        const imageUrl = await generateImage(form.topic, form.imageStyle);
        setGeneratedImage(imageUrl);
      } else {
        setGeneratedImage('');
      }
    } catch (err) {
      setError('Failed to generate content. Please check your OpenAI API key and try again.');
      console.error('Generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setForm(prev => ({ ...prev, [name]: finalValue }));
  };

  const platformIcons = {
    twitter: <Twitter className="w-5 h-5" />,
    instagram: <Instagram className="w-5 h-5" />,
    linkedin: <Linkedin className="w-5 h-5" />
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Generador de contenido</h1>
      
      <div className={styles.card}>
        <div className={styles.platformTabs}>
          {Object.entries(platformIcons).map(([key, icon]) => (
            <button
              key={key}
              className={styles.platformTab}
              data-active={platform === key}
              onClick={() => setPlatform(key as Platform)}
            >
              {icon}
              <span className="ml-2 capitalize">{key}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="topic" className={styles.label}>Tema</label>
            <textarea
            cols={5}
              id="topic"
              name="topic"
              value={form.topic}
              onChange={handleInputChange}
              className={styles.textarea}
              placeholder="¿Sobre qué te gustaría escribir?"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="tone" className={styles.label}>Tono</label>
            <select
              id="tone"
              name="tone"
              value={form.tone}
              onChange={handleInputChange}
              className={styles.select}
            >
              <option value="professional">Profesional</option>
              <option value="casual">Casual</option>
              <option value="humorous">Humoristico</option>
              <option value="formal">Formal</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="contentType" className={styles.label}>Tipo de Contenido</label>
            <select
              id="contentType"
              name="contentType"
              value={form.contentType}
              onChange={handleInputChange}
              className={styles.select}
            >
              <option value="post">Post</option>
              <option value="thread">Thread</option>
              <option value="caption">Caption</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="keywords" className={styles.label}>Palabras claves (optional)</label>
            <input
              type="text"
              id="keywords"
              name="keywords"
              value={form.keywords}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Introduzca palabras clave separadas por comas"
            />
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="generateImage"
                checked={form.generateImage}
                onChange={handleInputChange}
                className={styles.checkbox}
              />
              <span className="ml-2">Generar imagen coincidente</span>
            </label>
          </div>

          {form.generateImage && (
            <div className={styles.inputGroup}>
              <label htmlFor="imageStyle" className={styles.label}>Estilo de imagen</label>
              <select
                id="imageStyle"
                name="imageStyle"
                value={form.imageStyle}
                onChange={handleInputChange}
                className={styles.select}
              >
                <option value="modern">Moderno</option>
                <option value="minimalist">Minimalista</option>
                <option value="artistic">Artistico</option>
                <option value="professional">Profesional</option>
                <option value="vintage">Vintage</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className={styles.button}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
            {loading ? 'Generando...' : 'Generar Contenido'}
          </button>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}
        </form>
      </div>

      {(generatedContent || generatedImage) && (
        <div className={styles.preview}>
          <h2 className={styles.previewHeader}>Contenido Generado</h2>
          {generatedImage && (
            <div className={styles.generatedImage}>
              <img src={generatedImage} alt="Contenido Generado" className={styles.image} />
            </div>
          )}
          <div className={styles.generatedContent}>
            <pre>{generatedContent}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default Generator;