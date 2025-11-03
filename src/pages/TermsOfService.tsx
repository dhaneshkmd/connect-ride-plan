import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - RideShare</title>
        <meta name="description" content="Read the terms and conditions for using RideShare services." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using RideShare, you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. User Responsibilities</h2>
                <p>As a user of RideShare, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and truthful information</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Treat other users with respect and courtesy</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Not engage in fraudulent or illegal activities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Service Description</h2>
                <p>
                  RideShare is a platform that connects riders with drivers. We facilitate ride-sharing 
                  arrangements but are not a transportation provider. The actual transportation service 
                  is provided by independent drivers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Payment Terms</h2>
                <p>
                  Riders agree to pay the agreed-upon fare for rides. Drivers agree to charge fair prices 
                  based on our pricing guidelines. All payments are processed securely through our platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Cancellation Policy</h2>
                <p>
                  Users may cancel rides according to our cancellation policy. Late cancellations may 
                  incur fees. Repeated cancellations may result in account restrictions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Liability</h2>
                <p>
                  RideShare is not liable for any damages, injuries, or losses incurred during rides. 
                  Users assume all risks associated with ride-sharing. We recommend all users maintain 
                  appropriate insurance coverage.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Account Termination</h2>
                <p>
                  We reserve the right to suspend or terminate accounts that violate these terms or 
                  engage in inappropriate behavior. Users may also delete their accounts at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Changes to Terms</h2>
                <p>
                  We may update these Terms of Service from time to time. Continued use of our services 
                  after changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">9. Contact Information</h2>
                <p>
                  For questions about these Terms of Service, please contact us at legal@rideshare.com
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

export default TermsOfService;
