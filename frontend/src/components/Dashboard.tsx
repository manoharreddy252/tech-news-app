import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Navbar, Nav, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { newsAPI } from '../services/api';

interface NewsArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  source: string;
  published_date: string;
}

const Dashboard: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const { user, logout } = useAuth();

  const fetchNews = async () => {
    try {
      setError('');
      const response = await newsAPI.getNews();
      setNews(response.data.articles || []);
    } catch (err: any) {
      setError('Failed to fetch news. Using demo data.');
      // Set demo data if API fails
      setNews([
        {
          id: 1,
          title: 'AI Revolution: ChatGPT-5 Released with Groundbreaking Features',
          description: 'OpenAI announces the release of ChatGPT-5 with enhanced reasoning capabilities and multimodal support.',
          url: 'https://example.com/chatgpt5',
          source: 'TechCrunch',
          published_date: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Google Unveils New Quantum Computing Breakthrough',
          description: 'Google researchers achieve quantum supremacy with their latest quantum processor.',
          url: 'https://example.com/quantum',
          source: 'Wired',
          published_date: new Date().toISOString()
        },
        {
          id: 3,
          title: 'Meta Launches Advanced VR Headset for Enterprise',
          description: 'Meta introduces new VR technology targeting business and enterprise applications.',
          url: 'https://example.com/meta-vr',
          source: 'The Verge',
          published_date: new Date().toISOString()
        },
        {
          id: 4,
          title: 'Tesla Autopilot Gets Major Software Update',
          description: 'Tesla releases FSD Beta 12.0 with improved neural networks and safety features.',
          url: 'https://example.com/tesla',
          source: 'Electrek',
          published_date: new Date().toISOString()
        },
        {
          id: 5,
          title: 'Microsoft Azure Introduces New AI Services',
          description: 'Microsoft expands Azure AI portfolio with new machine learning and cognitive services.',
          url: 'https://example.com/azure-ai',
          source: 'ZDNet',
          published_date: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await newsAPI.refreshNews();
      await fetchNews();
    } catch (err) {
      setError('Failed to refresh news');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="dashboard">
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Tech News Portal</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link className="text-white">Welcome, {user?.username}</Nav.Link>
              <Button variant="outline-light" size="sm" onClick={logout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4">
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <h2>Daily Top 5 Tech News</h2>
              <Button 
                variant="success" 
                onClick={handleRefresh}
                disabled={refreshing}
              >
                {refreshing ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    Refreshing...
                  </>
                ) : (
                  'Refresh News'
                )}
              </Button>
            </div>
          </Col>
        </Row>

        {error && (
          <Alert variant="warning" className="mb-4">
            {error}
          </Alert>
        )}

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading latest tech news...</p>
          </div>
        ) : (
          <Row>
            {news.map((article, index) => (
              <Col lg={12} className="mb-4" key={article.id || index}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <Badge bg="primary">{article.source}</Badge>
                      <small className="text-muted">
                        {formatDate(article.published_date)}
                      </small>
                    </div>
                    <Card.Title className="h5">{article.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {article.description}
                    </Card.Text>
                    <Button 
                      variant="outline-primary" 
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read Full Article
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {news.length === 0 && !loading && (
          <div className="text-center py-5">
            <h4>No news articles found</h4>
            <p className="text-muted">Try refreshing to get the latest news</p>
          </div>
        )}
      </Container>
    </div>
  );
};

// Badge component for source
const Badge: React.FC<{ bg: string; children: React.ReactNode }> = ({ bg, children }) => (
  <span className={`badge bg-${bg}`}>{children}</span>
);

export default Dashboard;