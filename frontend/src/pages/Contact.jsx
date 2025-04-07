import { Phone, Mail, MapPin, Shield, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
  const emergencyContacts = [
    {
      name: "24/7 Women's Safety Helpline",
      phone: "+1 (123) 456-7890",
      description: "Immediate assistance for medical and safety concerns"
    },
    {
      name: "National Domestic Violence Hotline",
      phone: "1-800-799-7233",
      description: "Confidential support for domestic violence"
    },
    {
      name: "RAINN Sexual Assault Hotline",
      phone: "1-800-656-4673",
      description: "24/7 sexual assault support"
    },
    {
      name: "Mental Health Crisis Line",
      phone: "988",
      description: "24/7 suicide prevention and mental health support"
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url('/bg/bg3.jpg')` }}
      ></div>

      <Navbar/>

      {/* Content */}
      <div className="mt-8 relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-black mb-3">Women's Safety Support</h1>
            <div className="w-20 h-1 bg-pink-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Immediate contact information for medical and safety assistance
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Primary Contact Card */}
            <div className="bg-pink/90 backdrop-blur-sm p-6 rounded-lg shadow-lg border-t-4 border-indigo-600">
              <h2 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center">
                <Shield className="mr-2" /> Direct Support Channels
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-full mr-4">
                    <Phone className="text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Emergency Helpline</h3>
                    <p className="text-gray-600 mb-1">Available 24 hours, 7 days a week</p>
                    <p className="text-2xl font-bold text-indigo-600">+1 (123) 456-7890</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-full mr-4">
                    <Mail className="text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Email Support</h3>
                    <p className="text-gray-600 mb-1">Response within 24 hours</p>
                    <p className="text-lg text-indigo-600">support@womenssafety.org</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-full mr-4">
                    <MapPin className="text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Local Centers</h3>
                    <p className="text-gray-600">123 Safety Avenue, New York</p>
                    <p className="text-gray-600">456 Wellness Blvd, Los Angeles</p>
                    <p className="text-gray-600">789 Care Street, Chicago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contacts Card */}
            <div className="bg-pink/90 backdrop-blur-sm p-6 rounded-lg shadow-lg border-t-4 border-red-600">
              <h2 className="text-xl font-semibold text-red-700 mb-4 flex items-center">
                <AlertCircle className="mr-2" /> Emergency Contacts
              </h2>
              
              <ul className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <li key={index} className="p-3 bg-red-100 rounded-lg">
                    <h3 className="font-medium text-red-800">{contact.name}</h3>
                    <p className="text-xl font-bold text-red-600 my-1">{contact.phone}</p>
                    <p className="text-sm text-gray-600">{contact.description}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <span className="font-bold">Safety Note:</span> If you're in immediate danger, 
                      please call your local emergency number first.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-12 bg-pink/90 backdrop-blur-sm p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">Additional Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg bg-pink-300">
                <h3 className="font-medium text-gray-900 mb-2">Mobile Apps</h3>
                <p className="text-sm text-gray-600">Safety alert applications with emergency features</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg bg-pink-300">
                <h3 className="font-medium text-gray-900 mb-2">Local Shelters</h3>
                <p className="text-sm text-gray-600">Safe housing options in your area</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg bg-pink-300">
                <h3 className="font-medium text-gray-900 mb-2">Legal Aid</h3>
                <p className="text-sm text-gray-600">Confidential legal assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div className='absolute z-10 w-full'>

    <Footer/>                
    </div>

    </div>
  );
};

export default ContactPage;