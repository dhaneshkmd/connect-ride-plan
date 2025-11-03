import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - RideShare</title>
        <meta name="description" content="Learn how RideShare protects your personal information and privacy." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
                <p>
                  We collect information you provide directly to us when you create an account, book rides, 
                  or communicate with other users. This includes your name, email address, phone number, 
                  and location data necessary for ride matching.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
                <p>
                  Your information is used to provide and improve our ride-sharing services, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Matching riders with drivers based on routes and preferences</li>
                  <li>Facilitating communication between users</li>
                  <li>Processing payments and calculating fair pricing</li>
                  <li>Ensuring safety through verification and emergency services</li>
                  <li>Improving our AI matching algorithms</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Data Security</h2>
                <p>
                  We implement industry-standard security measures to protect your personal information. 
                  All data is encrypted in transit and at rest. We regularly audit our systems and conduct 
                  security assessments to ensure your data remains safe.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Sharing</h2>
                <p>
                  We do not sell your personal information. We only share data with:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Other users as necessary for ride coordination</li>
                  <li>Service providers who assist in our operations</li>
                  <li>Law enforcement when required by law</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Your Rights</h2>
                <p>
                  You have the right to access, correct, or delete your personal information at any time. 
                  You can also opt out of marketing communications and request a copy of your data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy, please contact us at privacy@rideshare.com
                </p>
              </section>

              <p className="text-sm italic">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
