import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Link,
} from '@react-email/components';

export default function WelcomeEmail() {
  return (
    <Html lang="en">
      <Head />
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={headerText}>Welcome to Go2Japan</Text>
          </Section>

          {/* Welcome Message */}
          <Section style={content}>
            <Text style={heading}>Thanks for subscribing! 🇯🇵</Text>
            <Text style={paragraph}>
              You&apos;re now part of the Go2Japan travel community. We&apos;ll send you the best
              travel tips, hidden gems, and practical guides to help you explore Japan like a local.
            </Text>
          </Section>

          {/* CTA Cards */}
          <Section style={content}>
            <Text style={subheading}>Start Exploring</Text>

            <Section style={card}>
              <Text style={cardTitle}>🏙️ Explore Cities</Text>
              <Text style={cardText}>
                Discover Tokyo, Kyoto, Osaka, Hiroshima, and more with our in-depth city guides.
              </Text>
              <Button style={button} href="https://go2-japan.com/city/">
                Explore Cities
              </Button>
            </Section>

            <Section style={card}>
              <Text style={cardTitle}>🍣 Discover Food</Text>
              <Text style={cardText}>
                From ramen to sushi — explore Japan&apos;s incredible cuisine and culinary traditions.
              </Text>
              <Button style={button} href="https://go2-japan.com/food/">
                Discover Food
              </Button>
            </Section>

            <Section style={card}>
              <Text style={cardTitle}>📋 Visa Guide</Text>
              <Text style={cardText}>
                Everything you need to know about Japanese visa requirements, e-visas, and exemptions.
              </Text>
              <Button style={button} href="https://go2-japan.com/visa/">
                Visa Guide
              </Button>
            </Section>
          </Section>

          {/* Travel Tips */}
          <Section style={content}>
            <Hr style={divider} />
            <Text style={subheading}>Quick Travel Tips</Text>
            <Text style={paragraph}>
              • Get a Suica or Pasmo IC card for seamless public transport{'\n'}
              • Carry cash — many restaurants and shops are still cash-only{'\n'}
              • Learn basic Japanese phrases — locals appreciate the effort!{'\n'}
              • Consider a Japan Rail Pass for long-distance travel
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Hr style={divider} />
            <Text style={footerText}>
              You received this email because you subscribed to Go2Japan.
            </Text>
            <Link href="https://go2-japan.com" style={footerLink}>
              go2-japan.com
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: '#f6f6f6',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  margin: '0',
  padding: '0',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  maxWidth: '600px',
};

const header = {
  backgroundColor: '#E91E8C',
  padding: '32px 24px',
  textAlign: 'center' as const,
};

const headerText = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0',
};

const content = {
  padding: '24px 32px',
};

const heading = {
  fontSize: '22px',
  fontWeight: '700',
  color: '#1a1a1a',
  margin: '0 0 16px 0',
};

const subheading = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#1a1a1a',
  margin: '0 0 16px 0',
};

const paragraph = {
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#444444',
  margin: '0 0 16px 0',
};

const card = {
  backgroundColor: '#fafafa',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '12px',
  border: '1px solid #eee',
};

const cardTitle = {
  fontSize: '16px',
  fontWeight: '700',
  color: '#1a1a1a',
  margin: '0 0 8px 0',
};

const cardText = {
  fontSize: '14px',
  color: '#666666',
  lineHeight: '1.5',
  margin: '0 0 12px 0',
};

const button = {
  backgroundColor: '#E91E8C',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '600',
  padding: '10px 20px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
};

const divider = {
  borderColor: '#eeeeee',
  margin: '24px 0',
};

const footer = {
  padding: '0 32px 32px',
};

const footerText = {
  fontSize: '12px',
  color: '#999999',
  margin: '0 0 8px 0',
};

const footerLink = {
  fontSize: '12px',
  color: '#E91E8C',
};
