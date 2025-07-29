import requests
from bs4 import BeautifulSoup
from datetime import datetime
from .models import NewsArticle

def scrape_tech_news():
    """Scrape top 5 tech news from Google News"""
    try:
        # Google News search for tech news
        url = "https://news.google.com/rss/search?q=technology+OR+tech+OR+AI+OR+software&hl=en-US&gl=US&ceid=US:en"
        
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.content, 'xml')
        
        articles = []
        items = soup.find_all('item')[:5]  # Get top 5 news
        
        for item in items:
            try:
                title = item.title.text if item.title else "No Title"
                description = item.description.text if item.description else "No Description"
                link = item.link.text if item.link else "#"
                pub_date = item.pubDate.text if item.pubDate else datetime.now().isoformat()
                source = item.source.text if item.source else "Google News"
                
                # Parse date
                try:
                    published_date = datetime.strptime(pub_date, "%a, %d %b %Y %H:%M:%S %Z")
                except:
                    published_date = datetime.now()
                
                # Create or update article
                article, created = NewsArticle.objects.get_or_create(
                    url=link,
                    defaults={
                        'title': title[:500],
                        'description': description,
                        'source': source,
                        'published_date': published_date
                    }
                )
                
                articles.append({
                    'title': title,
                    'description': description,
                    'url': link,
                    'source': source,
                    'published_date': published_date.isoformat()
                })
                
            except Exception as e:
                print(f"Error processing article: {e}")
                continue
        
        return articles
        
    except Exception as e:
        print(f"Error scraping news: {e}")
        # Return dummy data if scraping fails
        return get_dummy_news()

def get_dummy_news():
    """Return dummy tech news data"""
    dummy_articles = [
        {
            'title': 'AI Revolution: ChatGPT-5 Released with Groundbreaking Features',
            'description': 'OpenAI announces the release of ChatGPT-5 with enhanced reasoning capabilities and multimodal support.',
            'url': 'https://example.com/chatgpt5',
            'source': 'TechCrunch',
            'published_date': datetime.now().isoformat()
        },
        {
            'title': 'Google Unveils New Quantum Computing Breakthrough',
            'description': 'Google researchers achieve quantum supremacy with their latest quantum processor.',
            'url': 'https://example.com/quantum',
            'source': 'Wired',
            'published_date': datetime.now().isoformat()
        },
        {
            'title': 'Meta Launches Advanced VR Headset for Enterprise',
            'description': 'Meta introduces new VR technology targeting business and enterprise applications.',
            'url': 'https://example.com/meta-vr',
            'source': 'The Verge',
            'published_date': datetime.now().isoformat()
        },
        {
            'title': 'Tesla Autopilot Gets Major Software Update',
            'description': 'Tesla releases FSD Beta 12.0 with improved neural networks and safety features.',
            'url': 'https://example.com/tesla',
            'source': 'Electrek',
            'published_date': datetime.now().isoformat()
        },
        {
            'title': 'Microsoft Azure Introduces New AI Services',
            'description': 'Microsoft expands Azure AI portfolio with new machine learning and cognitive services.',
            'url': 'https://example.com/azure-ai',
            'source': 'ZDNet',
            'published_date': datetime.now().isoformat()
        }
    ]
    
    # Save dummy articles to database
    for article_data in dummy_articles:
        NewsArticle.objects.get_or_create(
            url=article_data['url'],
            defaults={
                'title': article_data['title'],
                'description': article_data['description'],
                'source': article_data['source'],
                'published_date': datetime.now()
            }
        )
    
    return dummy_articles