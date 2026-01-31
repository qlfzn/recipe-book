export async function fetchTikTokMetadata(url) {
  try {
    const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`
    const data = await fetchWithProxy(oembedUrl)
    return {
      title: data.title || '',
      author: data.author_name || '',
      thumbnail: data.thumbnail_url || ''
    }
  } catch (error) {
    console.error('Error fetching TikTok metadata:', error)
    return null
  }
}

async function fetchWithProxy(targetUrl) {
  const proxies = [
    (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
    (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    (url) => `https://proxy.cors.sh/${url}`
  ]

  for (const proxyFn of proxies) {
    try {
      const proxyUrl = proxyFn(targetUrl)
      const response = await fetchWithTimeout(proxyUrl, {}, 8000)

      if (response.ok) {
        const text = await response.text()
        return JSON.parse(text)
      }
    } catch (error) {
      console.log('Proxy failed, trying next...', error.message)
      continue
    }
  }

  throw new Error('All proxies failed')
}

async function fetchWithTimeout(url, options = {}, timeout = 10000) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

export async function processWithAI(apiKey, metadata) {
  if (!apiKey) {
    return null
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: `You are a helpful assistant that organizes TikTok recipe video metadata. Given raw metadata from a TikTok video, extract and organize the information into a clean, structured format.

Your task:
1. Create a clear, concise recipe TITLE (remove hashtags, emojis, and unnecessary text - just the recipe name)
2. Extract the DESCRIPTION which should include any recipe steps, ingredients, or cooking notes mentioned (clean up the text, make it readable)
3. Suggest relevant TAGS for categorization (cuisine type, main ingredients - lowercase, single words or short phrases)

Respond ONLY with valid JSON in this exact format:
{
  "title": "Clean recipe title here",
  "description": "Organized recipe notes, ingredients, or steps here",
  "suggestedTags": ["tag1", "tag2", "tag3"]
}`
          },
          {
            role: 'user',
            content: `Please organize this TikTok recipe metadata:\n\nTitle/Caption: ${metadata.title}\nCreator: ${metadata.author || 'Unknown'}`
          }
        ],
        temperature: 0.3,
        max_tokens: 500
      })
    })

    if (!response.ok) {
      throw new Error('AI request failed')
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content

    if (content) {
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
    }

    return null
  } catch (error) {
    console.error('AI processing error:', error)
    return null
  }
}

export function autoSuggestTags(title) {
  const titleLower = title.toLowerCase()
  const suggestedTags = []

  const tagKeywords = {
    japanese: ['japanese', 'japan', 'sushi', 'ramen', 'miso', 'teriyaki', 'tempura'],
    korean: ['korean', 'korea', 'kimchi', 'bibimbap', 'gochujang'],
    chinese: ['chinese', 'china', 'wok', 'stir fry', 'dim sum'],
    asian: ['asian', 'rice', 'noodle', 'soy sauce'],
    italian: ['italian', 'italy', 'pasta', 'pizza', 'risotto'],
    mexican: ['mexican', 'mexico', 'taco', 'burrito', 'salsa'],
    breakfast: ['breakfast', 'morning', 'eggs', 'pancake', 'waffle'],
    lunch: ['lunch', 'sandwich', 'salad'],
    dinner: ['dinner', 'supper'],
    dessert: ['dessert', 'sweet', 'cake', 'cookie', 'chocolate'],
    healthy: ['healthy', 'salad', 'vegetable', 'low cal'],
    quick: ['quick', 'easy', 'minute', 'fast', 'simple'],
    noodles: ['noodle', 'pasta', 'ramen', 'udon', 'spaghetti'],
    vegetarian: ['vegetarian', 'vegan', 'veggie', 'plant based'],
    chicken: ['chicken'],
    beef: ['beef', 'steak'],
    seafood: ['fish', 'shrimp', 'salmon', 'seafood']
  }

  for (const [tag, keywords] of Object.entries(tagKeywords)) {
    if (keywords.some(keyword => titleLower.includes(keyword))) {
      if (!suggestedTags.includes(tag)) {
        suggestedTags.push(tag)
      }
    }
  }

  return suggestedTags
}
